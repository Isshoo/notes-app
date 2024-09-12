import NotesData from "../data/notes-data.js";
import Utils from "../utility/utils.js";

const home = () => {
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
};

export default home;
