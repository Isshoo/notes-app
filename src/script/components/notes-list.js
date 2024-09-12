import Utils from "../utility/utils.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _minWidth = 250;
  _gap = 1;

  static get observedAttributes() {
    return ["minWidth", "gap"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      .notes-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${this.minWidth}px, 1fr));
        grid-template-rows: auto;
        gap: ${this.gap}rem;
        padding: 1.5rem 2rem;
        background-color: #212631;
        border-radius: 16px;
      }
      @media screen and (max-width: 375px) {
        .notes-list {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          padding: 1.5rem;
        }
      }
    `;
  }

  set minWidth(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._minWidth = value;
  }

  get minWidth() {
    return this._minWidth;
  }

  set gap(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._gap = value;
  }

  get gap() {
    return this._gap;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="notes-list">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "minWidth":
        this.column = newValue;
        break;
      case "gap":
        this.gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("notes-list", NotesList);
