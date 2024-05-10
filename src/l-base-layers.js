// @ts-check
import { mapAddTo } from "./events.js";

class LBaseLayers extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener(mapAddTo, (ev) => {
      ev.detail["type"] = "base";
    });
  }
}

export default LBaseLayers;
