import NotesData from "../data/notes-data.js";
import Utils from "../utility/utils.js";
import {
  customValidationTitleHandler,
  customValidationDescriptionHandler,
} from "../utility/customValidation.js";

const home = () => {
  // if (cekStorage()) {
  //   ambilDataDariStorage();
  // }

  const notes = NotesData.getAll();
  console.log(notes);
  // notes.forEach((note) => {
  //   console.log(note);
  // });

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

  // // STORAGE;
  // const STORAGE_KEY = "Daftar_Notes";
  // const DATA = "Data_Tersimpan";

  // function cekStorage() {
  //   const isStorageAvailable = typeof Storage !== "undefined";
  //   if (!isStorageAvailable) {
  //     alert("Browser anda tidak mendukung storage local");
  //     return false;
  //   }
  //   return true;
  // }

  // function simpanData() {
  //   if (cekStorage()) {
  //     const stringDaftarNote = JSON.stringify(notes);
  //     localStorage.setItem(STORAGE_KEY, stringDaftarNote);
  //     console.log(stringDaftarNote);
  //     document.dispatchEvent(new Event(DATA));
  //   }
  // }

  // const ambilDataDariStorage = () => {
  //   const stringDaftarNote = localStorage.getItem(STORAGE_KEY);
  //   const daftarNote = stringDaftarNote ? JSON.parse(stringDaftarNote) : [];
  //   notes.push(...daftarNote);
  //   render(notes);
  //   console.log(notes);
  // };

  // document.addEventListener(DATA, function () {
  //   console.log(localStorage.getItem(STORAGE_KEY));
  // });
};

export default home;
