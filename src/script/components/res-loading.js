import gsap from "gsap";

class ResLoading extends HTMLElement {
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
          margin-block: 1rem;
          font-size: 1.5rem;
     
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  connectedCallback() {
    this.render();
  }

  _gsapJs() {
    const loading = this.shadowRoot.querySelector("*");

    gsap.from(loading, {
      duration: 1,
      x: 20,
      opacity: 0,
      ease: "power1.inOut",
    });
    gsap.to(loading, { duration: 1, x: 0, opacity: 1, ease: "power1.inOut" });
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        Loading...
      `;
    this._gsapJs();
  }
}

customElements.define("res-loading", ResLoading);
