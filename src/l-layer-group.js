import { mapAddTo } from "./events.js";

class LLayerGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const group = L.layerGroup();
    const event = new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: group,
        name,
      },
    });
    this.dispatchEvent(event);

    this.addEventListener(mapAddTo, (ev) => {
      ev.stopPropagation();
      group.addLayer(ev.detail.layer);
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          const leafletId = node.getAttribute("leaflet-id");
          const layer = group.getLayer(leafletId);
          group.removeLayer(layer);
        });
      });
    });
    observer.observe(this, { childList: true });
  }
}

export default LLayerGroup;
