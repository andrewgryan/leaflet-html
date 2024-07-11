// @ts-check

import { tooltip } from "leaflet";
import { tooltipConnected } from "./events";

class LTooltip extends HTMLElement {
  static observedAttributes = ["content"];

  constructor() {
    super();
    this.tooltip = tooltip();
  }

  connectedCallback() {
    const event = new CustomEvent(tooltipConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        tooltip: this.tooltip,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * @param {string} attName
   * @param {string} newValue
   */
  attributeChangedCallback(attName, _, newValue) {
    if (attName === "content") {
      this.tooltip.setContent(newValue);
    }
  }
}

export default LTooltip;
