import { paneConnected } from "./events.js";

export default class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.dispatchEvent(
      new CustomEvent(paneConnected, {
        bubbles: true,
        cancelable: true,
        detail: {
          name: this.getAttribute("name"),
        },
      })
    );
  }
}
