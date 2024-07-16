class LLayer extends HTMLElement {
  constructor() {
    super()
    this.layer = null
  }

  disconnectedCallback() {
    this.layer?.remove();
  }
}

export default LLayer
