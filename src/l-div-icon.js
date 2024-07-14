import { divIcon } from "leaflet";
import { iconConnected } from "./events";

export default class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.icon = null;
  }

  connectedCallback() {
    this.icon = divIcon({ html: this.innerHTML });
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
