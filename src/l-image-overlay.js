import { mapAddTo } from "./events.js"

class LImageOverlay extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log("l-image-overlay connected")
    const url = this.getAttribute("url")
    const bounds = JSON.parse(this.getAttribute("bounds"))
    const options = {
      opacity: parseFloat(this.getAttribute("opacity") || "1.0"),
      alt: this.getAttribute("alt") || ""
    }
    const layer = L.imageOverlay(url, bounds, options)
    this.dispatchEvent(new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer
      }
    }))
  }
}

export default LImageOverlay
