// @ts-check
import * as L from "leaflet";
import { layerRemove, mapAddTo } from "./events.js";
import LLayer from "./l-layer.js";

class LMap extends HTMLElement {
  constructor() {
    super();

    this.map = null;
    this.addEventListener("map:bounds", (ev) => {
      const { bounds, method } = ev.detail;
      if (this.map !== null) {
        this.map[method](bounds);
      }
    });

    // Observe removed l-tile-layers
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof LMap) {
          const el = mutation.target
          mutation.removedNodes.forEach((node) => {
            if (node instanceof LLayer) {
              if ((el.map !== null) && (node.layer !== null)) {
                el.map.removeLayer(node.layer)
              }
            }
          })
        }
      })
    })
    observer.observe(this, { childList: true })
  }

  connectedCallback() {
    this.map = L.map(this);
    const center = this.getAttribute("center");
    const zoom = this.getAttribute("zoom");
    if (center !== null && zoom !== null) {
      this.map.setView(JSON.parse(center), parseInt(zoom));
    }
    this.addEventListener(mapAddTo, (ev) => {
      const layer = ev.detail.layer;
      layer.addTo(this.map);
    });

    this.addEventListener(layerRemove, (ev) => {
      if (this.map !== null) {
        this.map.removeLayer(ev.detail.layer);
      }
    });
  }
}

export default LMap;
