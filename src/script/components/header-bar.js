class HeaderBar extends HTMLElement {
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
          background-color: #212631;
          border-radius: 3rem;
          margin-inline: 8%;
          color: #f0f1f5;
          padding: 0.75rem;
          display: flex;
          justify-content: center;
          align-items: center;
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
        <h1 class="nav-title">Notes App</h1>
      `;
  }
}

customElements.define("header-bar", HeaderBar);
