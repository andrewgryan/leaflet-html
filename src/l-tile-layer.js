import { mapAddTo } from "./events.js";

class LTileLayer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const urlTemplate = this.getAttribute("url-template");
    const attribution = this.getAttribute("attribution");
    const options = { attribution };
    const layer = L.tileLayer(urlTemplate, options);
    const event = new CustomEvent(mapAddTo, {
      detail: { name, layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
}

export default LTileLayer;
