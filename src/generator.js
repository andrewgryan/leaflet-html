import { LatLng } from "leaflet"

const ARGS = {
  circle: [["lat-lng", LatLng]],
  polyline: [["lat-lngs", LatLng]], // TODO: LatLng[] array
  polygon: [["lat-lng", LatLng]],
  rectangle: [["lat-lng", LatLng]],
}
const OPTIONS = {
  circle: {
    radius: [Number, null]
  },
  polyline: {
    smoothFactor: [Number, 1.0],
    noClip: [Boolean, false]
  },
  polygon: {},
  path: {
    stroke: [Boolean, true],
    color: [String, "#3388ff"],
    weight: [Number, 3],
    opacity: [Number, 1.0],
    lineCap: [String, "round"],
    lineJoin: [String, "round"],
  },
  layer: {},
  rectangle: {}
}

const INHERITS = {
  circle: ["path", "layer"],
  polyline: ["path", "layer"],
  polygon: ["polyline"],
  rectangle: ["path", "layer"],
}

// TODO: Generalise approach
const setter = (layer, name, newValue) => {
  switch(name) {
    case "lat-lngs":
        layer.setLatLngs(JSON.parse(newValue))
        break;
    case "weight":
        layer.setStyle({ weight: parseInt(newValue) })
        break;
    case "color":
        layer.setStyle({ color: newValue })
        break;
  }
}

const attributes = (methodName) => {
  let args = ARGS[methodName].map(x => x[0])
  let attrs = Object.keys(OPTIONS[methodName])
  INHERITS[methodName].forEach((parent) => {
    attrs.push(...Object.keys(OPTIONS[parent]))
  })
  attrs = attrs.map(camelToKebab)
  attrs.push(...args)
  return attrs
}

const camelToKebab = (s) => {
   return s.split('').map((letter, idx) => {
     return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
   }).join('');
}

const settings = (el, methodName) => {
  // Gather settings
  let result = {}  
  let process = (opts) => {
    Object.entries(opts).forEach(([key, value]) => {
      const [type, val] = value
      const attribute = camelToKebab(key)
      if (el.hasAttribute(attribute)) {
        result[key] = parse(el.getAttribute(attribute), type, val)
      }
    })
  }

  // Process inheritance chain
  process(OPTIONS[methodName])
  INHERITS[methodName].forEach(parent => {
    process(OPTIONS[parent])
  })
  return result
}

const positional = (el, methodName) => {
  return ARGS[methodName].map(([key, type]) => {
    return parse(el.getAttribute(key), type, null)
  })
}

const parse = (text, type, defaultValue) => {
  switch (type) {
    case Number:
      return parseFloat(text)
    case Boolean:
      return text.toLowerCase() === "true"
    case String:
      return text
    case LatLng:
      return JSON.parse(text)
    default:
      return defaultValue
  }
}

const generator = (method, methodName) => {
  console.log(attributes(methodName))
  class cls extends HTMLElement {
    static observedAttributes = attributes(methodName);

    constructor() {
      super()
      this.layer = null
      // TODO: event handlers
    }

    connectedCallback() {
      const args = positional(this, methodName)
      const options = settings(this, methodName)
      this.layer = method(...args, options)
      const event = new CustomEvent("map:addTo", {
        cancelable: true,
        bubbles: true,
        detail: {
          layer: this.layer
        },
      });
      this.dispatchEvent(event);
    }

    attributeChangedCallback(name, _, newValue) {
      if (this.layer !== null) {
        setter(this.layer, name, newValue)
      }
    }
  }
  return cls
}


export default generator
