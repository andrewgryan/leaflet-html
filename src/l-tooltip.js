// @ts-check

import { tooltip } from "leaflet";
import { tooltipConnected } from "./events";
import { json, option, parse } from "./parse.js";

class LTooltip extends HTMLElement {
  static observedAttributes = ["content", "permanent", "direction"];

  constructor() {
    super();
    this.tooltip = tooltip({
      permanent: this.hasAttribute("permanent"),
      direction: this.getAttribute("direction") ?? "auto"
    });
  }

  connectedCallback() {
    const event = new CustomEvent(tooltipConnected, {
      cancelable: true,
      bubbles: true,
      detail: {
        tooltip: this.tooltip
      }
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
