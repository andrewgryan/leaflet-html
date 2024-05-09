import { mapAddTo } from "./events.js";

class LVideoOverlay extends HTMLElement {
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
    const layer = L.videoOverlay(url, bounds, options);
    this.dispatchEvent(
      new CustomEvent(mapAddTo, {
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
