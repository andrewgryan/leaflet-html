import { popupAdd } from "./events.js"

class LPopup extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const content = this.getAttribute("content")
    const event = new CustomEvent(popupAdd, {
      cancelable: true,
      bubbles: true,
      detail: {
        content
      }
    })
    this.dispatchEvent(event)
  }
}


export default LPopup

