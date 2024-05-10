// @ts-check
import { imageOverlay } from "leaflet";
import { mapAddTo } from "./events.js";

class LImageOverlay extends HTMLElement {
  static observedAttributes = ["url", "bounds", "opacity"];

  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const url = this.getAttribute("url");
    if (url === null) {
      console.warn("attribute 'url' not set");
      return;
    }
    let bounds = this.getAttribute("bounds");
    if (bounds === null) {
      console.warn("attribute 'bounds' not set");
      return;
    }
    const options = {
      opacity: parseFloat(this.getAttribute("opacity") || "1.0"),
      alt: this.getAttribute("alt") || "",
    };
    this.layer = imageOverlay(url, JSON.parse(bounds), options);
    this.dispatchEvent(
      new CustomEvent(mapAddTo, {
        cancelable: true,
        bubbles: true,
        detail: {
          layer: this.layer,
        },
      }),
    );
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.layer !== null) {
      if (name === "url") {
        this.layer.setUrl(newValue);
      } else if (name === "bounds") {
        this.layer.setBounds(JSON.parse(newValue));
      } else if (name === "opacity") {
        this.layer.setOpacity(parseFloat(newValue));
      }
    }
  }
}

export default LImageOverlay;
