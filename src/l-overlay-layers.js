// @ts-check
import { layerConnected } from "./events.js";

class LOverlayLayers extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener(layerConnected, (ev) => {
      ev.detail["type"] = "overlay";
    });
  }
}

export default LOverlayLayers;
