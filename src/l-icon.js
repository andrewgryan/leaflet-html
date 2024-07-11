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
  constructor() {
    super();
    this.icon = null;
  }

  connectedCallback() {
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
    const options = parse(schema, this);

    this.icon = icon(options);

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

export default LIcon;
