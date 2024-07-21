import { icon } from "leaflet";
import { iconConnected } from "./events.js";
import {
  bool,
  chain,
  htmlAttribute,
  json,
  nullable,
  optional,
  parse,
  partial,
} from "./parse.js";
import { kebabToCamel } from "./util.js";

class LIcon extends HTMLElement {
  static observedAttributes = [
    "icon-size",
    "icon-anchor",
    "shadow-size",
    "shadow-anchor",
  ];

  constructor() {
    super();
    this.icon = null;
  }

  connectedCallback() {
    this.icon = icon(this._parseOptions());

    const event = new CustomEvent(iconConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        icon: this.icon,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * @param {string} name
   * @param {string} _
   * @param {string} newValue
   */
  attributeChangedCallback(name, _, newValue) {
    if (LIcon.observedAttributes.indexOf(name) !== -1) {
      if (this.icon !== null) {
        this.icon = icon({
          ...this.icon.options,
          [kebabToCamel(name)]: JSON.parse(newValue),
        });
        const event = new CustomEvent(iconConnected, {
          cancelable: true,
          bubbles: true,
          detail: {
            icon: this.icon,
          },
        });
        this.dispatchEvent(event);
      }
    }
  }

  /**
   * @returns {import("leaflet").IconOptions}
   */
  _parseOptions() {
    // Experimental parse/validate API
    const obj = {};
    const keys = [
      "icon-url",
      "icon-retina-url",
      "shadow-url",
      "shadow-retina-url",
      "class-name",
    ];
    keys.forEach((key) => {
      obj[kebabToCamel(key)] = optional(htmlAttribute(key));
    });
    let points = [
      "icon-anchor",
      "icon-size",
      "shadow-anchor",
      "shadow-size",
      "tooltip-anchor",
      "popup-anchor",
    ];
    points.forEach((key) => {
      obj[kebabToCamel(key)] = chain(
        optional(htmlAttribute(key)),
        nullable(json())
      );
    });
    obj["crossOrigin"] = chain(
      optional(htmlAttribute("cross-origin")),
      nullable(bool())
    );
    const schema = partial(obj);
    return parse(schema, this);
  }
}

export default LIcon;
