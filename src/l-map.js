// @ts-check
import { layerRemove, mapAddTo } from "./events.js";

class LMap extends HTMLElement {
  constructor() {
    super();

    this.map = null;
    this.addEventListener("map:bounds", (ev) => {
      const { bounds, method } = ev.detail;
      this.map[method](bounds);
    });
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
      this.map.remove(ev.detail.layer);
    });
  }
}

export default LMap;
