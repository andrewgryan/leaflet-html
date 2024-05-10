// @ts-check
import { geoJSON } from "leaflet";
import { mapAddTo } from "./events.js";

class LGeoJSON extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const value = this.getAttribute("geojson");
    if (value !== null) {
      const layer = geoJSON(JSON.parse(value));
      this.dispatchEvent(
        new CustomEvent(mapAddTo, {
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
