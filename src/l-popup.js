// @ts-check
import { popupAdd } from "./events.js";

class LPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const content = this.getAttribute("content");
    let openPopup = false;
    const openPopupAttribute = this.getAttribute("open-popup");
    if (openPopupAttribute !== null) {
      openPopup = openPopupAttribute !== "false";
    }
    const event = new CustomEvent(popupAdd, {
      cancelable: true,
      bubbles: true,
      detail: {
        content,
        openPopup,
      },
    });
    this.dispatchEvent(event);
  }
}

export default LPopup;
