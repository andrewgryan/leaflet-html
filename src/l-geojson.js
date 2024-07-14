// @ts-check
import { geoJSON } from "leaflet";
import { layerConnected } from "./events.js";

class LGeoJSON extends HTMLElement {
  constructor() {
    super();
    this.layer = null;
  }

  connectedCallback() {
    const value = this.getAttribute("geojson");
    const options = {};

    // Pane
    const pane = this.closest("l-pane");
    if (pane !== null) {
      options["pane"] = pane.getAttribute("name");
    }

    if (value !== null) {
      this.layer = geoJSON(JSON.parse(value), options);
      this.dispatchEvent(
        new CustomEvent(layerConnected, {
          bubbles: true,
          cancelable: true,
          detail: {
            layer: this.layer,
          },
        })
      );
    }
  }
}

export default LGeoJSON;
