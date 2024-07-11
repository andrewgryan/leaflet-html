// @ts-check
import { layerConnected } from "./events.js";

class LBaseLayers extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener(layerConnected, (ev) => {
      ev.detail["type"] = "base";
    });
  }
}

export default LBaseLayers;
