// @ts-check

import { tooltip } from "leaflet";
import { tooltipConnected } from "./events";

class LTooltip extends HTMLElement {
  static observedAttributes = ["content", "permanent", "interactive", "direction"];

  constructor() {
    super();
    this.tooltip = null;
  }

  connectedCallback() {
    this.tooltip = tooltip({
      permanent: this.hasAttribute("permanent"),
      interactive: this.hasAttribute("interactive"),
      direction: this.getAttribute("direction") ?? "auto"
    });
    this.tooltip.setContent(this.getAttribute("content"));

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
    if (this.tooltip) {
      if (attName === "content") {
        this.tooltip.setContent(newValue);
      } else if (attName === "permanent") {
        this.tooltip.options.permanent = this.hasAttribute("permanent");
      } else if (attName === "interactive") {
        this.tooltip.options.interactive = this.hasAttribute("interactive");
      } else if (attName === "direction") {
        this.tooltip.options.direction = newValue;
      }
    }
  }
}

export default LTooltip;
