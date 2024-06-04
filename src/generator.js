// @ts-check
import { Circle, LatLng, Polygon, Polyline, Rectangle } from "leaflet";
import { camelToKebab } from "./util.js";
import { LeafletHTMLError, missingAttributeIssue } from "./error.js";

/**
 * @typedef {Object} TagOption
 * @property {string} camel
 * @property {string} kebab
 * @property {(s: string) => AttributeValue} parser
 * @property {AttributeValue | null} defaultValue
 */
/**
 * @typedef {("circle"|"rectangle"|"polygon"|"polyline")} MethodName
 * @typedef {("path"|"interactiveLayer")} LayerName
 * @typedef {("boolean"|"number"|"string"|"latlng"|"latlngbounds")} AttributeType
 * @typedef {(boolean|number|string|LatLng)} AttributeValue
 */

/**
 * @param {MethodName} methodName
 * @returns {TagOption[]}
 */
const positionalArguments = (methodName) => {
  switch (methodName) {
    case "circle":
      return [option("latLng", "latlng", null)];
    case "rectangle":
      return [option("latLngBounds", "latlngbounds", null)];
    case "polygon":
      return [option("latLngs", "latlng", null)];
    case "polyline":
      return [option("latLngs", "latlng", null)];
  }
};

/**
 * @param {string} name
 * @param {AttributeType} type
 * @param {AttributeValue | null} defaultValue
 * @returns {TagOption}
 */
const option = (name, type, defaultValue) => {
  return {
    camel: name,
    kebab: camelToKebab(name),
    parser: inferParser(type),
    defaultValue,
  };
};

/**
 * @param {AttributeType} type
 * @returns {(s: string) => AttributeValue}
 */
const inferParser = (type) => {
  switch (type.toLowerCase()) {
    case "boolean":
      return (s) => s === "true";
    case "number":
      return parseFloat;
    case "latlng":
    case "latlngbounds":
      return JSON.parse;
    case "string":
      return (s) => s;
    default:
      return (s) => s;
  }
};

/**
 * @param {MethodName} methodName
 * @returns {TagOption[]}
 */
const options = (methodName) => {
  const _OPTIONS = {
    circle: [option("radius", "number", null)],
    path: [
      option("stroke", "boolean", true),
      option("color", "string", "#3388ff"),
      option("weight", "number", 3),
      option("opacity", "number", 1.0),
      option("lineCap", "string", "round"),
      option("lineJoin", "string", "round"),
      option("dashArray", "string", null),
      option("dashOffset", "string", null),
      option("fill", "boolean", true),
      option("fillColor", "string", "#3388ff"),
      option("fillOpacity", "number", 0.2),
    ],
    polyline: [
      option("smoothFactor", "number", 1.0),
      option("noClip", "boolean", false),
    ],
    polygon: [],
    rectangle: [],
    interactiveLayer: [option("interactive", "boolean", true)],
  };
  return inheritance(methodName).flatMap((parent) => _OPTIONS[parent]);
};

/**
 * @type {Object.<string, (MethodName | LayerName)[]>}
 */
const INHERITS = {
  circle: ["path"],
  polyline: ["path"],
  polygon: ["polyline"],
  rectangle: ["polygon"],
  path: ["interactiveLayer"],
  interactiveLayer: [],
};

/**
 * @param {MethodName} methodName
 * @returns {(MethodName | LayerName)[]}
 */
const inheritance = (methodName) => {
  /** @type {(MethodName | LayerName)} */
  let name = methodName;
  let chain = [methodName];
  while (INHERITS[name].length > 0) {
    let parent = INHERITS[name][0];
    chain.push(parent);
    name = parent;
  }
  return chain;
};

/**
 * @param {MethodName} methodName
 * @param {string} newValue
 * @param {string} name
 * @param {(Circle | Rectangle | Polygon | Polyline)} layer
 */
const setter = (layer, methodName, name, newValue) => {
  // Parse
  const allOptions = [
    ...positionalArguments(methodName),
    ...options(methodName),
  ];
  let _opt = allOptions.find((o) => o.kebab === name);
  if (typeof _opt === "undefined") {
    return;
  }
  const parsedValue = _opt.parser(newValue);

  // Update
  if (layer instanceof Circle) {
    switch (name) {
      case "lat-lng":
        layer.setLatLng(JSON.parse(newValue));
        break;
      case "radius":
        layer.setRadius(parseFloat(newValue));
        break;
    }
  } else if (layer instanceof Rectangle) {
    switch (name) {
      case "lat-lngs":
        layer.setLatLngs(JSON.parse(newValue));
        break;
      case "lat-lng-bounds":
        layer.setBounds(JSON.parse(newValue));
        break;
    }
  } else if (layer instanceof Polygon) {
    switch (name) {
      case "lat-lngs":
        layer.setLatLngs(JSON.parse(newValue));
        break;
    }
  } else if (layer instanceof Polyline) {
    switch (name) {
      case "lat-lngs":
        layer.setLatLngs(JSON.parse(newValue));
        break;
    }
  }

  // setStyle options
  let opt = options("polyline").find((o) => o.kebab === name);
  if (typeof opt !== "undefined") {
    layer.setStyle({ [opt.camel]: parsedValue });
  }
};

/**
 * @param {MethodName} methodName
 */
const attributes = (methodName) => {
  let args = positionalArguments(methodName).map((o) => o.kebab);
  let opts = options(methodName).map((o) => o.kebab);
  return [...args, ...opts];
};

/**
 * @param {HTMLElement} el
 * @param {MethodName} methodName
 */
const settings = (el, methodName) => {
  // Gather settings
  let result = {};

  // Process inheritance chain
  options(methodName).forEach((o) => {
    if (el.hasAttribute(o.kebab)) {
      result[o.camel] = o.parser(el.getAttribute(o.kebab));
    }
  });
  return result;
};

/**
 * Read positional arguments from HTMLElement
 *
 * @param {HTMLElement} el
 * @param {MethodName} methodName
 */
const positional = (el, methodName) => {
  return positionalArguments(methodName).map((option) => {
    if (!el.hasAttribute(option.kebab)) {
      const issue = missingAttributeIssue(`l-${methodName}`, option.kebab);
      throw new LeafletHTMLError([issue]);
    }
    return option.parser(el.getAttribute(option.kebab));
  });
};

/**
 * @param {MethodName} methodName
 */
const generator = (method, methodName) => {
  class cls extends HTMLElement {
    static observedAttributes = attributes(methodName);

    constructor() {
      super();
      this.layer = null;
      this.addEventListener("bindTooltip", (ev) => {
        if (this.layer !== null) {
          this.layer.bindTooltip(ev.detail.tooltip);
        }
      });
    }

    connectedCallback() {
      const args = positional(this, methodName);
      const options = settings(this, methodName);
      this.layer = method(...args, options);
      const event = new CustomEvent("map:addTo", {
        cancelable: true,
        bubbles: true,
        detail: {
          layer: this.layer,
        },
      });
      this.dispatchEvent(event);
    }

    /**
     * @param {string} attName
     * @param {string} newValue
     */
    attributeChangedCallback(attName, _, newValue) {
      if (this.layer !== null) {
        setter(this.layer, methodName, attName, newValue);
      }
    }
  }
  return cls;
};

export default generator;
