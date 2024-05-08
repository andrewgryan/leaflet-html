import { mapAddTo } from "./events.js"

class LGeoJSON extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const layer = L.geoJSON(JSON.parse(this.getAttribute("geojson")))
    this.dispatchEvent(new CustomEvent(mapAddTo, {
      bubbles: true,
      cancelable: true,
      detail: {
        layer
      }
    }))
  }
}

export default LGeoJSON
