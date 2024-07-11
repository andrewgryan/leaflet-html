// @ts-check
import { geoJSON } from "leaflet";
import { layerConnected } from "./events.js";

class LGeoJSON extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const value = this.getAttribute("geojson");
    if (value !== null) {
      const layer = geoJSON(JSON.parse(value));
      this.dispatchEvent(
        new CustomEvent(layerConnected, {
          bubbles: true,
          cancelable: true,
          detail: {
            layer,
          },
        }),
      );
    }
  }
}

export default LGeoJSON;
