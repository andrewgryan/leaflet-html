// @ts-check
import { videoOverlay } from "leaflet";
import { layerConnected } from "./events.js";
import LLayer from "./l-layer.js";

class LVideoOverlay extends LLayer {
  constructor() {
    super();
  }

  connectedCallback() {
    const url = JSON.parse(this.getAttribute("url"));
    const bounds = JSON.parse(this.getAttribute("bounds"));
    const options = {
      opacity: parseFloat(this.getAttribute("opacity") || "1.0"),
      alt: this.getAttribute("alt") || "",
      autoplay: true,
      muted: true,
      playsInline: true,
    };
    const layer = videoOverlay(url, bounds, options);
    this.dispatchEvent(
      new CustomEvent(layerConnected, {
        cancelable: true,
        bubbles: true,
        detail: {
          layer,
        },
      }),
    );
  }
}

export default LVideoOverlay;
