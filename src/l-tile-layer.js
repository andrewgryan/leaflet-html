// @ts-check
import { tileLayer } from "leaflet";
import { LeafletHTMLError, missingAttributeIssue } from "./error.js";
import { mapAddTo } from "./events.js";
import LLayer from "./l-layer.js";

class LTileLayer extends LLayer {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const urlTemplate = this.getAttribute("url-template");
    if (urlTemplate === null) {
      const issues = [
        missingAttributeIssue({
          tag: "l-tile-layer",
          attribute: "url-template",
        }),
      ];
      throw new LeafletHTMLError(issues);
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
