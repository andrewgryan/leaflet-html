// @ts-check
import * as L from "leaflet";
import { layerRemoved, layerConnected, latLngBoundsConnected, latLngBoundsChanged, paneConnected, connectLeafletEvents } from "./events.js";
import LLayer from "./l-layer.js";
import { distribute, int, json, option, parse } from "./parse.js";

class LMap extends HTMLElement {
  static observedAttributes = ["zoom", "center", "zoom-control"];

  constructor() {
    super();

    this.map = null;

    // Handle <l-lat-lng-bounds> connection and modification(s)
    const boundsListener = (ev) => {
      const { bounds, method } = ev.detail;
      if (this.map !== null) {
        this.map[method](bounds);
      }
    };
    this.addEventListener(latLngBoundsConnected, boundsListener);
    this.addEventListener(latLngBoundsChanged, boundsListener);

    // Observe l-pane
    this.addEventListener(paneConnected, (ev) => {
      const { name } = ev.detail
      this.map.createPane(name)
    })

    // Observe removed l-tile-layers
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof LMap) {
          const el = mutation.target;
          mutation.removedNodes.forEach((node) => {
            if (node instanceof LLayer) {
              if (el.map !== null && node.layer !== null) {
                // Notify listeners of layer removal
                el.dispatchEvent(new CustomEvent(layerRemoved, {
                  bubbles: true,
                  detail: {
                    layer: node.layer
                  }
                }))
                el.map.removeLayer(node.layer);
              }
            }
          });
        }
      });
    });
    observer.observe(this, { childList: true });
  }

  connectedCallback() {
    let opts = {}
    if (this.hasAttribute("zoom-control")) {
        // TODO: decide the best ergonomics for this.
        opts.zoomControl = this.getAttribute("zoom-control") !== "off"
    }
    this.map = L.map(this, opts);

    // Allow listeners to know when the map is "ready"
    this.map.whenReady(() => {
      this.dispatchEvent(
        new CustomEvent("ready", {
          bubbles: true,
          cancelable: true,
          detail: this.map
        })
      )
    })

    // Connect Leaflet events
    connectLeafletEvents(this, this.map);

    if (this.hasAttribute("fit-world")) {
      this.map.fitWorld();
    } else {
      const schema = distribute({
        zoom: option("zoom", int()),
        center: option("center", json())
      })
      const { zoom, center } = parse(schema, this)
      this.map.setView(center, zoom);
    }

    if (this.hasAttribute("locate")) {
      const schema = option("locate", json())
      this.map.locate(parse(schema, this));
    }

    this.addEventListener(layerConnected, (ev) => {
      const layer = ev.detail.layer;
      this.map.addLayer(layer);
    });

    this.addEventListener(layerRemoved, (ev) => {
      if (this.map !== null) {
        this.map.removeLayer(ev.detail.layer);
      }
    });
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.map !== null) {
      if (name === "zoom") {
        this.map.setZoom(parseInt(newValue));
      } else if (name === "center") {
        this.map.setView(JSON.parse(newValue));
      }
    }
  }
}

export default LMap;
