// @ts-check
import { LatLngBounds } from "leaflet";

class LLatLngBounds extends HTMLElement {
  static observedAttributes = ["bounds"];

  constructor() {
    super();
  }

  connectedCallback() {
    let value = this.getAttribute("bounds")
    if (value !== null) {
      this.dispatchEvent(this.getEvent(JSON.parse(value)))
    }
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    this.dispatchEvent(this.getEvent(JSON.parse(newValue)));
  }

  /**
   * @param {LatLngBounds} bounds
   */
  getEvent(bounds) {
    return new CustomEvent("map:bounds", {
      bubbles: true,
      detail: {
        bounds,
        method: this.getAttribute("method") || "fitBounds",
      },
    });
  }
}

export default LLatLngBounds;
