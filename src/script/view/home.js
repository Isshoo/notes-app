import NotesData from "../data/notes-data.js";
import Utils from "../utility/utils.js";

let notes = [];

const home = () => {
  notes = NotesData.getAll();

  notes.forEach((note) => {
    console.log(note);
  });
};

export default home;
