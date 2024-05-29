// @ts-check
/// <reference path="./index.d.ts" />

class LPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const content = this.getAttribute("content");
    /** @type {BindPopupEvent} */
    const event = new CustomEvent("bindPopup", {
      cancelable: true,
      bubbles: true,
      detail: {
        content,
      },
    });
    this.dispatchEvent(event);
  }
}

export default LPopup;
