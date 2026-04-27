// @ts-check
import { layerGroup } from "leaflet";
import { layerConnected } from "./events.js";
import LLayer from "./l-layer.js";

function _removeNode(group, node) {
  const leafletId = node.getAttribute("leaflet-id");
  const layer = group.getLayer(parseInt(leafletId));
  if (typeof layer !== "undefined") {
    group.removeLayer(layer);
  }
}

class LLayerGroup extends LLayer {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const group = layerGroup();
    this.layer = group;

    const event = new CustomEvent(layerConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: group,
        name,
      },
    });
    this.dispatchEvent(event);

    this.addEventListener(layerConnected, (ev) => {
      ev.stopPropagation();
      group.addLayer(ev.detail.layer);
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.querySelectorAll("[leaflet-id]").forEach((child) => {
              _removeNode(group, child);
            });
            _removeNode(group, node);
          }
        });
      });
    });
    observer.observe(this, { childList: true });
  }
}

export default LLayerGroup;
