import { LatLng, LatLngBounds, tooltip } from "leaflet";
import { camelToKebab, kebabToCamel } from "./util.js";

const ARGS = {
  circle: [["lat-lng", LatLng]],
  polyline: [["lat-lngs", LatLng]],
  polygon: [["lat-lngs", LatLng]],
  rectangle: [["lat-lng-bounds", LatLngBounds]],
};

// Is this the best data structure??
const OPTIONS = {
  circle: {
    radius: [Number, null],
  },
  polyline: {
    smoothFactor: [Number, 1.0],
    noClip: [Boolean, false],
  },
  polygon: {},
  path: {
    stroke: [Boolean, true],
    color: [String, "#3388ff"],
    weight: [Number, 3],
    opacity: [Number, 1.0],
    lineCap: [String, "round"],
    lineJoin: [String, "round"],
    dashArray: [String, null],
    dashOffset: [String, null],
    fill: [Boolean, true],
    fillColor: [String, "#3388ff"],
    fillOpacity: [Number, 0.2],
  },
  rectangle: {},
  interactiveLayer: {
    interactive: [Boolean, true],
  },
};

const INHERITS = {
  circle: ["path"],
  polyline: ["path"],
  polygon: ["polyline"],
  rectangle: ["polygon"],
  path: ["interactiveLayer"],
  interactiveLayer: [],
};

const inheritance = (methodName) => {
  let name = methodName;
  let chain = [methodName];
  while (INHERITS[name].length > 0) {
    let parent = INHERITS[name][0];
    chain.push(parent);
    name = parent;
  }
  return chain;
};

// TODO: Generalise approach
const setter = (layer, methodName, name, newValue) => {
  const allowedAttributes = schema(methodName);
  // Type (str) -> T
  let type = allowedAttributes.get(name);

  // Parse
  newValue = parse(newValue, type, newValue);

  // Update
  switch (name) {
    case "lat-lng":
      layer.setLatLng(newValue);
      break;
    case "lat-lngs":
      layer.setLatLngs(newValue);
      break;
    case "lat-lng-bounds":
      layer.setBounds(newValue);
      break;
    case "radius":
      layer.setRadius(newValue);
      break;
  }

  // setStyle options
  let styleOptions = ["path", "polyline", "interactiveLayer"].flatMap(
    (method) => {
      return Object.keys(OPTIONS[method]);
    }
  );
  let camelName = kebabToCamel(name);
  if (styleOptions.indexOf(camelName) !== -1) {
    layer.setStyle({ [camelName]: newValue });
  }
};

const schema = (methodName) => {
  const data = new Map();
  ARGS[methodName].forEach(([key, type]) => {
    data.set(key, type);
  });

  inheritance(methodName).forEach((parent) => {
    for (const key in OPTIONS[parent]) {
      const [type, _] = OPTIONS[parent][key];
      data.set(camelToKebab(key), type);
    }
  });
  return data;
};

const attributes = (methodName) => {
  let args = ARGS[methodName].map((x) => x[0]);
  let attrs = [];
  inheritance(methodName).forEach((parent) => {
    attrs.push(...Object.keys(OPTIONS[parent]));
  });
  attrs = attrs.map(camelToKebab);
  attrs.push(...args);
  return attrs;
};

const settings = (el, methodName) => {
  // Gather settings
  let result = {};
  let process = (opts) => {
    Object.entries(opts).forEach(([key, value]) => {
      const [type, val] = value;
      const attribute = camelToKebab(key);
      if (el.hasAttribute(attribute)) {
        result[key] = parse(el.getAttribute(attribute), type, val);
      }
    });
  };

  // Process inheritance chain
  inheritance(methodName).forEach((parent) => {
    process(OPTIONS[parent]);
  });
  return result;
};

const positional = (el, methodName) => {
  return ARGS[methodName].map(([key, type]) => {
    return parse(el.getAttribute(key), type, null);
  });
};

const parse = (text, type, defaultValue) => {
  switch (type) {
    case Number:
      return parseFloat(text);
    case Boolean:
      return text.toLowerCase() === "true";
    case String:
      return text;
    case LatLng:
    case LatLngBounds:
      return JSON.parse(text);
    default:
      return defaultValue;
  }
};

const generator = (method, methodName) => {
  if (methodName === "tooltip") {
    return generateTooltip();
  } else {
    return generateVector(method, methodName);
  }
};

const generateTooltip = () => {
  class cls extends HTMLElement {
    static observedAttributes = ["content"];

    constructor() {
      super();
      this.tooltip = tooltip();
    }

    connectedCallback() {
      const event = new CustomEvent("bindTooltip", {
        cancelable: true,
        bubbles: true,
        detail: {
          tooltip: this.tooltip,
        },
      });
      this.dispatchEvent(event);
    }

    attributeChangedCallback(attName, _, newValue) {
      if (attName === "content") {
        this.tooltip.setContent(newValue);
      }
    }
  }
  return cls;
};

const generateVector = (method, methodName) => {
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

    attributeChangedCallback(attName, _, newValue) {
      if (this.layer !== null) {
        setter(this.layer, methodName, attName, newValue);
      }
    }
  }
  return cls;
};

export default generator;
