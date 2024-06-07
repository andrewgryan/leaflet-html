// @vitest-environment happy-dom
import * as L from "leaflet";
import {
  bool,
  chain,
  htmlAttribute,
  json,
  nullable,
  option,
  optional,
  parse,
  partial,
  safeParse,
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
      obj[kebabToCamel(key)] = chain(optional(htmlAttribute(key)), nullable(json()));
    });
    obj["crossOrigin"] = chain(optional(htmlAttribute("cross-origin")), nullable(bool()));
    const schema = partial(obj);
    const options = parse(schema, this);

    this.icon = L.icon(options);

    const event = new CustomEvent("icon:add", {
      cancelable: true,
      bubbles: true,
      detail: {
        icon: this.icon,
      },
    });
    this.dispatchEvent(event);
  }
}

if (import.meta.vitest) {
  const { it, expect, beforeAll } = import.meta.vitest;

  beforeAll(() => {
    customElements.define("l-icon", LIcon);
  });

  it("default", () => {
    const el = document.createElement("l-icon");
    document.body.appendChild(el);

    let actual = el.icon;
    let expected = L.icon();
    expect(actual).toEqual(expected);
  });

  it("emits icon:add event", async () => {
    const el = document.createElement("l-icon");
    let promise = new Promise((resolve) => {
      el.addEventListener("icon:add", (ev) => {
        resolve(ev.detail.icon);
      });
    });
    document.body.appendChild(el);
    let actual = await promise;
    let expected = L.icon();
    expect(actual).toEqual(expected);
  });

  it("options", () => {
    const el = document.createElement("l-icon");
    el.setAttribute("icon-url", "url.png");
    el.setAttribute("icon-retina-url", "retina.png");
    el.setAttribute("icon-size", "[0, 0]");
    el.setAttribute("icon-anchor", "[0, 0]");
    el.setAttribute("popup-anchor", "[0, 0]");
    el.setAttribute("tooltip-anchor", "[0, 0]");
    el.setAttribute("shadow-url", "urlShadow.png");
    el.setAttribute("shadow-retina-url", "retinaShadow.png");
    el.setAttribute("shadow-size", "[0, 0]");
    el.setAttribute("shadow-anchor", "[0, 0]");
    el.setAttribute("class-name", "foo");
    el.setAttribute("cross-origin", "true");
    document.body.appendChild(el);

    let actual = el.icon;
    let expected = L.icon({
      iconUrl: "url.png",
      iconRetinaUrl: "retina.png",
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
      tooltipAnchor: [0, 0],
      shadowUrl: "urlShadow.png",
      shadowRetinaUrl: "retinaShadow.png",
      shadowSize: [0, 0],
      shadowAnchor: [0, 0],
      className: "foo",
      crossOrigin: true,
    });
    expect(actual).toEqual(expected);
  });
}

export default LIcon;
