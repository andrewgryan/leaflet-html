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
    
    // Template attributes
    const urlAttributes = LTileLayer.parseTemplateAttributes(urlTemplate)
    const templateOptions = {}
    for (const attribute of urlAttributes) {
      const value = this.getAttribute(attribute)
      if (value !== null) {
        templateOptions[attribute] = value
      }
    }
    
    // Options
    const name = this.getAttribute("name");
    const schema = partial({
      attribution: optional(htmlAttribute("attribution")),
      errorTileUrl: optional(htmlAttribute("error-tile-url"))
    })
    const options = parse(schema, this)
    this.layer = tileLayer(urlTemplate, { ...templateOptions, ...options });
    const event = new CustomEvent(mapAddTo, {
      detail: { name, layer: this.layer },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * @param {string} urlTemplate
   * @returns {string[]}
   */
  static parseTemplateAttributes(urlTemplate) {
    const regex = /{(.*?)}/g
    return [...urlTemplate.matchAll(regex)].map(match => match[1])
  }
}

export default LTileLayer;
