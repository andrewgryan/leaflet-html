// @ts-check
/// <reference path="./index.d.ts" />
import { circle } from "leaflet";
const addTo = "addTo";

class Bar extends HTMLElement {
  constructor() {
    super();
    this.addEventListener(addTo, (ev) => {
      ev.detail.layer;
    });
  }

  documentConnected() {
    /** @type AddToEvent */
    const event = new CustomEvent(addTo, {
      detail: {
        layer: circle([1, 1], { radius: 5 }),
      },
    });
    this.dispatchEvent(event);
  }
}

export default Bar;
