import { mapAddTo } from "./events.js"

class LImageOverlay extends HTMLElement {
  static observedAttributes = ["url", "bounds", "opacity"]

  constructor() {
    super()
    this.layer = null
  }

  connectedCallback() {
    const url = this.getAttribute("url")
    const bounds = JSON.parse(this.getAttribute("bounds"))
    const options = {
      opacity: parseFloat(this.getAttribute("opacity") || "1.0"),
      alt: this.getAttribute("alt") || ""
    }
    this.layer = L.imageOverlay(url, bounds, options)
    this.dispatchEvent(new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: this.layer
      }
    }))
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.layer !== null) {
      if (name === "url") {
        this.layer.setUrl(newValue)
      } else if (name === "bounds") {
        this.layer.setBounds(JSON.parse(newValue))
      } else if (name === "opacity") {
        this.layer.setOpacity(parseFloat(newValue))
      }
    }
  }
}

export default LImageOverlay
