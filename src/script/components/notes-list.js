import Utils from "../utility/utils.js";
import gsap from "gsap";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["minwidth", "gap"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._minwidth = this.getAttribute("minwidth");
    this._gap = this.getAttribute("gap");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      .notes-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${this.minwidth}px, 1fr));
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

  set minwidth(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._minwidth = value;
  }

  get minwidth() {
    return this._minwidth;
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

  _gsapJs() {
    const notesList = this.shadowRoot.querySelector(".notes-list");

    gsap.from(notesList, {
      duration: 2,
      y: 20,
      opacity: 0,
      ease: "power1.inOut",
    });
    gsap.to(notesList, { duration: 2, y: 0, opacity: 1, ease: "power1.inOut" });
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
    this._gsapJs();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "minwidth":
        this.minwidth = newValue;
        break;
      case "gap":
        this.gap = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("notes-list", NotesList);
