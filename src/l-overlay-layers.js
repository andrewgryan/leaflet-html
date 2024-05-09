import { mapAddTo } from "./events.js";

class LOverlayLayers extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener(mapAddTo, (ev) => {
      ev.detail["type"] = "overlay";
    });
  }
}

export default LOverlayLayers;
