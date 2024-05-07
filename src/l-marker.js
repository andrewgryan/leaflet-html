import { mapAddTo, popupAdd } from "./events.js"; 

class LMarker extends HTMLElement {
  static observedAttributes = ["lat-lng", "opacity"]

  constructor() {
    super()
    this.layer = null
  }

  connectedCallback() {
    const latLng = JSON.parse(this.getAttribute("lat-lng"))
    const opacity = parseFloat(this.getAttribute("opacity") || "1.0")
    this.layer = L.marker(latLng, { opacity });
    this.setAttribute("leaflet-id", L.stamp(this.layer))

    this.addEventListener(popupAdd, (ev) => {
      const { content } = ev.detail
      this.layer.bindPopup(content)
    })
    
    const event = new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: this.layer
      }
    })
    this.dispatchEvent(event)
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.layer !== null) {
      if (name === "lat-lng") {
        this.layer.setLatLng(JSON.parse(newValue))
      }
      if (name === "opacity") {
        this.layer.setOpacity(parseFloat(newValue))
      }
    }
  }
}


export default LMarker
