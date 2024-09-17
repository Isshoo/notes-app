import NotesApi from "../data/remote/notes-api.js";
import Utils from "../utility/utils.js";
import {
  customValidationTitleHandler,
  customValidationDescriptionHandler,
} from "../utility/customValidation.js";

const home = () => {
  const renderUnarchived = async () => {
    try {
      const response = await NotesApi.getUnarchivedNotes();

      render(response);
    } catch (error) {
      console.error("Error fetching unarchived notes:", error);
    }
  };

  const renderArchived = async () => {
    try {
      const response = await NotesApi.getArchivedNotes();

      render(response);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

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

  // CREATE NEW NOTE

  const formNewNote = document.getElementById("noteForm");
  formNewNote.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = Utils.generateUniqueId();
    const title = document.getElementById("title").value;
    const body = document.getElementById("description").value;
    const createdAt = Utils.generateCreatedAt();

    newNotes();
    formNewNote.reset();

    function newNotes() {
      const newNote = Utils.makeNewNote(id, title, body, createdAt, false);

      NotesApi.createNote(newNote).then(() => {
        renderUnarchived();
      });

      allList.classList.add("active");
      archivedList.classList.remove("active");
    }
  });

  //  CUSTOM VALIDATION

  const titleInput = formNewNote.elements["title"];
  const descriptionInput = formNewNote.elements["description"];

  titleInput.addEventListener("change", customValidationTitleHandler);
  titleInput.addEventListener("invalid", customValidationTitleHandler);
  descriptionInput.addEventListener(
    "change",
    customValidationDescriptionHandler,
  );
  descriptionInput.addEventListener(
    "invalid",
    customValidationDescriptionHandler,
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

  archivedList.addEventListener("click", async (e) => {
    e.preventDefault();
    archivedList.classList.add("active");
    allList.classList.remove("active");

    await loading();

    renderArchived();
  });

  allList.addEventListener("click", async (e) => {
    e.preventDefault();
    allList.classList.add("active");
    archivedList.classList.remove("active");

    await loading();

    renderUnarchived();
  });

  //LOADING
  const loadingElement = document.createElement("res-loading");

  const loading = async () => {
    notesList.innerHTML = "";

    notesList.append(loadingElement);

    await Utils.delay();
  };

  return {
    renderUnarchived,
    renderArchived,
  };
};

export default home;
