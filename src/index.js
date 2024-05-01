const init = () => {
  // Render Leaflet API calls
  document.querySelectorAll("[data-leaflet-html]").forEach((el) => {
    const { center, zoom } = el.dataset
    const map = L.map(el).setView(JSON.parse(center), parseInt(zoom))

    // L.control.layers
    el.querySelectorAll("[data-control-layers]").forEach((el) => {
      const baseMaps = {}
    
      // L.tileLayers
      el.querySelectorAll("[data-tile-layer]").forEach((tileEl) => {
        const { show, urlTemplate, attribution, maxZoom, name } = tileEl.dataset
        baseMaps[name] = L.tileLayer(urlTemplate, { maxZoom, attribution });
        if (show != null) {
          baseMaps[name].addTo(map)
        }
      })

      const overlayMaps = {}
      // L.layerGroup
      el.querySelectorAll("[data-layer-group]").forEach((el) => {
        const { name } = el.dataset
        const layers = []

        // L.marker
        el.querySelectorAll("[data-marker]").forEach((el) => {
          const { latLng } = el.dataset
          const marker = L.marker(JSON.parse(latLng)).addTo(map)

          // marker.bindPopup
          el.querySelectorAll("[data-popup]").forEach((el) => {
            const { content } = el.dataset
            marker.bindPopup(content)
            const observer = new MutationObserver(function(mutations) {
              console.log(mutations, el.dataset)
              marker.getPopup().setContent(el.dataset.content)
            })
            observer.observe(el, { attributes: true })
          })

          layers.push(marker)
        })

        overlayMaps[name] = L.layerGroup(layers)
      })

      L.control.layers(baseMaps, overlayMaps).addTo(map)
    })

  })
}

export default init
