// Helpers
const selector = (noun) => `[data-${noun}]`;

/**
 * Parse L.tileLayer args from element attributes
 */
const parseTileLayer = (el) => {
  const { urlTemplate } = el.dataset;
  const {
    attribution = null,
    maxZoom = "18",
    minZoom = "0",
    subdomains = "abc",
  } = el.dataset;
  const options = { attribution, maxZoom, minZoom, subdomains };
  return [urlTemplate, options];
};

/**
 * Parse L.imageOverlay args from element attributes
 */
const parseImageOverlay = (el) => {
  let { url, bounds } = el.dataset;
  bounds = JSON.parse(bounds);
  const { opacity } = el.dataset;
  const options = { opacity: parseFloat(opacity) };
  return [url, bounds, options];
};

/**
 * Parse L.imageOverlay args from element attributes
 */
const parseVideoOverlay = (el) => {
  let { url, bounds } = el.dataset;
  url = JSON.parse(url);
  bounds = JSON.parse(bounds);
  const {
    opacity,
    errorOverlayUrl,
    autoplay = true,
    muted = true,
    playsInline = true,
  } = el.dataset;
  const options = {
    opacity: parseFloat(opacity),
    errorOverlayUrl,
    autoplay,
    muted,
    playsInline,
  };
  return [url, bounds, options];
};

const render = () => {
  // Render Leaflet API calls
  document.querySelectorAll(selector("leaflet-html")).forEach((el) => {
    const { center, zoom } = el.dataset;
    const map = L.map(el).setView(JSON.parse(center), parseInt(zoom));

    // L.tileLayers
    el.querySelectorAll(selector("tile-layer")).forEach((el) => {
      L.tileLayer(...parseTileLayer(el)).addTo(map);
    });

    el.querySelectorAll(selector("image-overlay")).forEach((el) => {
      L.imageOverlay(...parseImageOverlay(el)).addTo(map);
    });

    el.querySelectorAll(selector("video-overlay")).forEach((el) => {
      L.videoOverlay(...parseVideoOverlay(el)).addTo(map);
    });

    // L.control.layers
    el.querySelectorAll(selector("control-layers")).forEach((el) => {
      const baseMaps = {};

      // L.tileLayers
      el.querySelectorAll(selector("tile-layer")).forEach((el) => {
        const { name, show } = el.dataset;
        baseMaps[name] = L.tileLayer(...parseTileLayer(el));
        if (show != null) {
          baseMaps[name].addTo(map);
        }
      });

      const overlayMaps = {};
      // L.layerGroup
      el.querySelectorAll(selector("layer-group")).forEach((el) => {
        const { name } = el.dataset;
        const layers = [];

        const observer = new MutationObserver(function (mutations) {
          const group = overlayMaps[name];

          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              const { latLng } = node.dataset; // MutationObserver needed
              const layer = L.marker(JSON.parse(latLng));
              group.addLayer(layer);
              map.addLayer(layer);
            });

            mutation.removedNodes.forEach((node) => {
              const { _leafletId } = node.dataset;
              const layer = group.getLayer(_leafletId);
              group.removeLayer(layer);

              map.removeLayer(layer);
            });
          });
        });
        observer.observe(el, { childList: true });

        // L.marker
        el.querySelectorAll(selector("marker")).forEach((el) => {
          const { latLng } = el.dataset;
          const { opacity = "1.0" } = el.dataset;
          const options = { opacity: parseFloat(opacity) };
          const marker = L.marker(JSON.parse(latLng), options).addTo(map);
          el.dataset._leafletId = L.stamp(marker); // Save ID for later

          const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
              const { latLng } = mutation.target.dataset;
              marker.setLatLng(JSON.parse(latLng));
            });
          });
          observer.observe(el, {
            attributes: true,
            attributeFilter: ["data-lat-lng"],
          });

          // marker.bindPopup
          el.querySelectorAll(selector("popup")).forEach((el) => {
            const { content } = el.dataset;
            marker.bindPopup(content);
            const observer = new MutationObserver(function () {
              marker.getPopup().setContent(el.dataset.content);
            });
            observer.observe(el, {
              attributes: true,
              attributeFilter: ["data-content"],
            });
          });

          layers.push(marker);
        });

        overlayMaps[name] = L.layerGroup(layers);
      });

      L.control.layers(baseMaps, overlayMaps).addTo(map);
    });
  });
};

const init = (() => {
  document.addEventListener("DOMContentLoaded", render);
})();

export default init;
