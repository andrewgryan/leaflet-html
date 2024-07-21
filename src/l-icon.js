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

const STRING_ATTRIBUTES = [
  "icon-url",
  "icon-retina-url",
  "shadow-url",
  "shadow-retina-url",
  "class-name",
];

const JSON_ATTRIBUTES = [
  "icon-anchor",
  "icon-size",
  "shadow-anchor",
  "shadow-size",
  "tooltip-anchor",
  "popup-anchor",
];

const BOOL_ATTRIBUTES = ["cross-origin"];

class LIcon extends HTMLElement {
  static observedAttributes = [
    ...STRING_ATTRIBUTES,
    ...JSON_ATTRIBUTES,
    ...BOOL_ATTRIBUTES,
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
        let update = {};
        if (STRING_ATTRIBUTES.indexOf(name) !== -1) {
          update[kebabToCamel(name)] = newValue;
        } else if (BOOL_ATTRIBUTES.indexOf(name) !== -1) {
          update[kebabToCamel(name)] = newValue.toLowerCase() === "true";
        } else {
          update[kebabToCamel(name)] = JSON.parse(newValue);
        }
        this.icon = icon({
          ...this.icon.options,
          ...update,
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
    STRING_ATTRIBUTES.forEach((key) => {
      obj[kebabToCamel(key)] = optional(htmlAttribute(key));
    });
    JSON_ATTRIBUTES.forEach((key) => {
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
