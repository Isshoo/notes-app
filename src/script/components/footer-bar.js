class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        color: #f0f1f5;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-footer {
        text-align: center;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <p class="text-footer">&copy; Isshoo's Notes App. All rights reserved.</p>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
