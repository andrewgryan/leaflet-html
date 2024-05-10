// @ts-check
import { tileLayer } from "leaflet";
import { mapAddTo } from "./events.js";

class LTileLayer extends HTMLElement {
  constructor() {
    super();
    this.layer = null
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const urlTemplate = this.getAttribute("url-template");
    if (urlTemplate === null) {
      return;
    }
    const options = {};
    const key = "attribution";
    if (this.hasAttribute(key)) {
      options[key] = this.getAttribute(key);
    }
    this.layer = tileLayer(urlTemplate, options);
    const event = new CustomEvent(mapAddTo, {
      detail: { name, layer: this.layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
}

export default LTileLayer;
