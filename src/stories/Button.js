
export class Button extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = "Hello, Storybook!"
  }
  
}

customElements.define("l-btn", Button);
 
