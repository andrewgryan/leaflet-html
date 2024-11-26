// @ts-check
import { tileLayer } from "leaflet";
import LLayer from "./l-layer.js";
import { layerConnected } from "./events.js";
import { htmlAttribute, optional, parse, partial } from "./parse.js";

class LTileLayerWMS extends LLayer {
  static get observedAttributes() {
    return ["options"];
  }

  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    this.initLayer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "options" && oldValue !== newValue) {
      if (this.isConnected) {
        this.reloadLayer();
      }
    }
  }

  initLayer() {
    const urlTemplate = parse(htmlAttribute("url-template"), this);

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
    });

    const standardOptions = parse(schema, this);
    const nonStandardOptionsElement = this.getAttribute("options");
    const nonStandardOptions = () => {
      if (nonStandardOptionsElement) {
        try {
          return JSON.parse(nonStandardOptionsElement);
        } catch (e) {
          console.error(
            "Error whilst parsing JSON for options attribute in l-tile-layer-wms",
            e,
          );
          return {};
        }
      } else {
        return {};
      }
    };

    // Pane options
    const paneOptions = {};
    // Support <l-pane> parent element
    if (this.parentElement.tagName.toLowerCase() === "l-pane") {
      paneOptions["pane"] = this.parentElement.getAttribute("name");
    }

    this.layer = tileLayer.wms(urlTemplate, {
      ...standardOptions,
      ...nonStandardOptions(),
      ...paneOptions,
    });
    const event = new CustomEvent(layerConnected, {
      detail: { name, layer: this.layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }

  reloadLayer() {
    if (this.layer) {
      this.layer.remove();
    }
    this.initLayer();
  }
}

export default LTileLayerWMS;
