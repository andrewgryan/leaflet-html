import * as L from "leaflet";
import { mapAddTo, popupAdd } from "./events.js";
import LLayer from "./l-layer.js";
import {
  chain,
  float,
  json,
  option,
  optional,
  htmlAttribute,
  parse,
  partial,
  nullable,
} from "./parse.js";

class LMarker extends LLayer {
  static observedAttributes = ["lat-lng", "opacity", "icon"];

  constructor() {
    super();
    this.layer = null;
    this.addEventListener("icon:add", (ev) => {
      ev.stopPropagation();
      this.layer.setIcon(ev.detail.icon);
    });
  }

  connectedCallback() {
    // Experimental parse/validate API
    const latLng = parse(option("lat-lng", json()), this);
    const options = parse(
      partial({
        opacity: chain(optional(htmlAttribute("opacity")), nullable(float())),
      }),
      this
    );
    this.layer = L.marker(latLng, options);

    if (this.hasAttribute("icon")) {
      const icon = L.icon(JSON.parse(this.getAttribute("icon")));
      this.layer.setIcon(icon);
    }

    this.setAttribute("leaflet-id", L.stamp(this.layer));

    this.addEventListener(popupAdd, (ev) => {
      const { content, openPopup } = ev.detail;
      const popup = this.layer.bindPopup(content);
      if (openPopup) {
        popup.openPopup();
      }
    });

    const event = new CustomEvent(mapAddTo, {
      cancelable: true,
      bubbles: true,
      detail: {
        layer: this.layer,
      },
    });
    this.dispatchEvent(event);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.layer !== null) {
      if (name === "lat-lng") {
        this.layer.setLatLng(JSON.parse(newValue));
      }
      if (name === "opacity") {
        this.layer.setOpacity(parseFloat(newValue));
      }
      if (name === "icon") {
        this.layer.setIcon(L.icon(JSON.parse(newValue)));
      }
    }
  }
}

export default LMarker;
