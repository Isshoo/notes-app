class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    // Render ulang
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: flex;
          align-items: stretch;
        }
   
        .notes-item {
          border: 1px solid #212631;
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          background-color: #e0e4eb;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: 0.3s ease;
          justify-content: space-between;
          width: 100%;
        }
        .notes-item:hover {
          background-color: #ffffff;
          transition: 0.3s ease;
        }

        .notes-item h3 {
          color: #0a0e15;
          margin-block: 0;
        }

        .notes-item p {
          color: #212631;
          margin-block: 0;
        }

        .notes-item .buttons {
          align-self: flex-end;
        }

        .buttons {
          display: flex;
          gap: 0.25rem;
        }

        .btn-edit,
        .btn-archive,
        .btn-delete {
          background-color: transparent;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 100%;
          transition: 0.3s ease;
        }
        .btn-edit i,
        .btn-archive i,
        .btn-delete i {
          font-size: 1rem;
          color: #373f4e;
        }

        .btn-edit:hover,
        .btn-archive:hover,
        .btn-delete:hover {
          transform: scale(1.3);
          transition: 0.3s ease;

          i {
            color: #212631;
          }
        }
      `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div class="notes-item">
              <h3>${this._note.title}</h3>
              <p>
                ${this._note.body}
              </p>
              <div class="buttons">
                <button class="btn-edit">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="btn-archive">
                  <i class="fa-solid fa-archive"></i>
                </button>
                <button class="btn-delete">
                  <i class="fa-solid fa-trash-alt"></i>
                </button>
              </div>
            </div>
      `;
  }
}

customElements.define("notes-item", NotesItem);
