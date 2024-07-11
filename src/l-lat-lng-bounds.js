// @ts-check
import { LatLngBounds } from "leaflet";
import { latLngBoundsChanged, latLngBoundsConnected } from "./events"; 

class LLatLngBounds extends HTMLElement {
  static observedAttributes = ["bounds"];

  constructor() {
    super();
  }

  connectedCallback() {
    let value = this.getAttribute("bounds")
    if (value !== null) {
      this.dispatchEvent(this.getEvent(latLngBoundsConnected, JSON.parse(value)))
    }
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    this.dispatchEvent(this.getEvent(latLngBoundsChanged, JSON.parse(newValue)));
  }

  /**
   * @param {LatLngBounds} bounds
   */
  getEvent(key, bounds) {
    return new CustomEvent(key, {
      bubbles: true,
      detail: {
        bounds,
        method: this.getAttribute("method") || "fitBounds",
      },
    });
  }
}

export default LLatLngBounds;
