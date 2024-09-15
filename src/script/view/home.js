import NotesData from "../data/notes-data.js";
import Utils from "../utility/utils.js";
import {
  customValidationTitleHandler,
  customValidationDescriptionHandler,
} from "../utility/customValidation.js";

const home = () => {
  const notes = NotesData.getAll();

  //RENDER NOTES LIST

  const notesContainer = document.querySelector("#notesContainer");
  const notesList = notesContainer.querySelector("notes-list");

  const render = (notes) => {
    const noteItems = notes.map((note) => {
      const noteItem = document.createElement("notes-item");
      noteItem.note = note;
      return noteItem;
    });

    Utils.emptyElement(notesList);
    notesList.append(...noteItems);
  };

  render(notes);

  // CREATE NEW NOTE

  const formNewNote = document.getElementById("noteForm");
  formNewNote.addEventListener("submit", function (event) {
    event.preventDefault();
    newNotes();
  });
  function newNotes() {
    const id = Utils.generateUniqueId();
    const title = document.getElementById("title").value;
    const body = document.getElementById("description").value;
    const createdAt = Utils.generateCreatedAt();

    const newNote = Utils.makeNewNote(id, title, body, createdAt, false);
    NotesData.add(newNote);

    render(notes);
    formNewNote.reset();
  }

  //  CUSTOM VALIDATION

  const form = document.querySelector("#noteForm");
  const titleInput = form.elements["title"];
  const descriptionInput = form.elements["description"];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  titleInput.addEventListener("change", customValidationTitleHandler);
  titleInput.addEventListener("invalid", customValidationTitleHandler);
  descriptionInput.addEventListener(
    "change",
    customValidationDescriptionHandler
  );
  descriptionInput.addEventListener(
    "invalid",
    customValidationDescriptionHandler
  );

  titleInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  descriptionInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  // ALL NOTES LIST & ARCHIVE LIST
  const allList = document.getElementById("allNotesBtn");
  const archivedList = document.getElementById("archivedListBtn");

  archivedList.addEventListener("click", () => {
    archivedList.classList.add("active");
    allList.classList.remove("active");

    const notesArchived = notes.filter((note) => note.archived);
    render(notesArchived);
  });

  allList.addEventListener("click", () => {
    allList.classList.add("active");
    archivedList.classList.remove("active");

    render(notes);
  });
};

export default home;
