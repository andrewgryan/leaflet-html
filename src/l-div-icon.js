import { divIcon } from "leaflet";
import { iconConnected } from "./events";

export default class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.icon = null;
  }

  connectedCallback() {
    // Leaflet JS DivIcon options
    const options = {
      html: this.innerHTML,
    };
    const className = this.getAttribute("class-name");
    if (className !== null) {
      options["className"] = className;
    }
    const iconAnchor = this.getAttribute("icon-anchor");
    if (iconAnchor !== null) {
      options["iconAnchor"] = iconAnchor;
    }

    this.icon = divIcon(options);
    this.dispatchEvent(
      new CustomEvent(iconConnected, {
        bubbles: true,
        cancelable: true,
        detail: {
          icon: this.icon,
        },
      })
    );
  }
}
