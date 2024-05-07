import { mapAddTo } from "./events.js"

class LControlLayers extends HTMLElement {
  constructor() {
    super()
  }
  
  connectedCallback() {
    const base = {}
    const overlay = {}
    const control = L.control.layers(base, overlay)

    this.addEventListener(mapAddTo, (ev) => {
      const { type, name, layer } = ev.detail
      if (type === "overlay") {
        control.addOverlay(layer, name)
      } else if (type === "base") {
        control.addBaseLayer(layer, name)
      }
      ev.preventDefault()
    })
    
    const event = new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: control
      }
    })
    this.dispatchEvent(event)
  }
}

export default LControlLayers
