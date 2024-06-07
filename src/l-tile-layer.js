// @ts-check
import { tileLayer } from "leaflet";
import { mapAddTo } from "./events.js";
import LLayer from "./l-layer.js";
import { htmlAttribute, optional, parse, partial } from "./parse.js";

class LTileLayer extends LLayer {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const urlTemplate = parse(htmlAttribute("url-template"), this)
    const name = this.getAttribute("name");
    const schema = partial({
      attribution: optional(htmlAttribute("attribution"))
    })
    const options = parse(schema, this)
    this.layer = tileLayer(urlTemplate, options);
    const event = new CustomEvent(mapAddTo, {
      detail: { name, layer: this.layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
}

export default LTileLayer;
