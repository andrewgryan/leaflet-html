// @ts-check
import { tileLayer } from "leaflet";
import LLayer from "./l-layer.js";
import { layerConnected } from "./events.js";
import { htmlAttribute, optional, parse, partial } from "./parse.js";

class LTileLayerWMS extends LLayer {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const urlTemplate = parse(htmlAttribute("url-template"), this)
  
    const name = this.getAttribute("name");
    const schema = partial({
      // Leaflet.tileLayer default options: https://leafletjs.com/reference.html#tilelayer-wms-layers
      layers: htmlAttribute("layers"),
      styles: optional(htmlAttribute("styles")),
      format: optional(htmlAttribute("format")),
      transparent: optional(htmlAttribute("transparent")),
      version: optional(htmlAttribute("version")),
      crs: optional(htmlAttribute("crs")),
      uppercase: optional(htmlAttribute("uppercase")),

      // Inherited option from Layer: https://leafletjs.com/reference.html#tilelayer-wms-attribution
      attribution: optional(htmlAttribute("attribution")),

      // Optional options
      options: optional(htmlAttribute("options")),
    });

    const wmsOptions = parse(schema, this);    
    this.layer = tileLayer.wms(urlTemplate, { ...wmsOptions });
    const event = new CustomEvent(layerConnected, {
      detail: { name, layer: this.layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
  
}
export default LTileLayerWMS;
