import NotesApi from "../data/remote/notes-api";
import { renderUnarchived, renderArchived } from "../view/home";
import gsap from "gsap";

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
          overflow: auto;
        }
        .notes-item:hover {
          background-color: #ffffff;
          transition: 0.3s ease;
        }

        .note-title {
        overflow: auto;
        }

        .notes-item h3 {
          color: #0a0e15;
          margin-block: 0;
        }

        .note-des {
        overflow: auto;
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

     
        .btn-archive,
        .btn-delete {
          background-color: transparent;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 100%;
          transition: 0.3s ease;
          border: none;
        }
   
        .btn-archive i,
        .btn-delete i {
          font-size: 1rem;
          color: #373f4e;
        }

    
        .btn-archive:hover,
        .btn-delete:hover {
          transform: scale(1.3);
          transition: 0.3s ease;

          i {
            color: #212631;
          }
        }


        .btn-archive:active,
        .btn-delete:active {
          i {
            color: #0a0e15;
          }
        }
      `;
  }

  _handleClick() {
    const deleteBtn = this.shadowRoot.querySelector(".btn-delete");
    const archiveBtn = this.shadowRoot.querySelector(".btn-archive");

    if (this._onDelete) {
      deleteBtn.removeEventListener("click", this._onDelete);
    }

    if (this._onArchive) {
      archiveBtn.removeEventListener("click", this._onArchive);
    }

    this._onDelete = async (e) => {
      e.preventDefault();
      const noteId = this._note.id;

      await NotesApi.deleteNote(noteId);

      if (this._note.archived) {
        renderArchived();
      } else {
        renderUnarchived();
      }
    };

    this._onArchive = async (e) => {
      e.preventDefault();
      const noteId = this._note.id;

      if (this._note.archived) {
        await NotesApi.unarchive(noteId);
        renderArchived();
      } else {
        await NotesApi.archive(noteId);
        renderUnarchived();
      }
    };

    deleteBtn.addEventListener("click", this._onDelete);
    archiveBtn.addEventListener("click", this._onArchive);
  }

  _gsapJs() {
    const notesItem = this.shadowRoot.querySelector(".notes-item");

    gsap.from(notesItem, {
      duration: 1,
      y: 10,
      opacity: 0,
      ease: "power1.inOut",
    });
    gsap.to(notesItem, { duration: 1, y: 0, opacity: 1, ease: "power1.inOut" });
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
              integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
            <div class="notes-item" data-noteid="${this._note.id}">
            <div class="note-title">
              <h3>${this._note.title}</h3>
              </div>
              <div class="note-des">
              <p>
                ${this._note.body}
              </p>
              </div>
              <div class="buttons">
                <button class="btn-archive">
                  <i class="fa-solid fa-archive"></i>
                </button>
                <button class="btn-delete">
                  <i class="fa-solid fa-trash-alt"></i>
                </button>
              </div>
            </div>
      `;
    this._handleClick();
    this._gsapJs();
  }
}

customElements.define("notes-item", NotesItem);
