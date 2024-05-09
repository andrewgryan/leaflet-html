class LLatLngBounds extends HTMLElement {
  static observedAttributes = ["bounds"];

  constructor() {
    super();
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    const event = new CustomEvent("map:bounds", {
      bubbles: true,
      detail: {
        bounds: JSON.parse(newValue),
        method: this.getAttribute("method") || "fitBounds",
      },
    });
    this.dispatchEvent(event);
  }
}

export default LLatLngBounds;
