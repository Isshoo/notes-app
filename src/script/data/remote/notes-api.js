import Swal from "sweetalert2";
import { loading } from "../../view/home";
const baseUrl = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getUnarchivedNotes() {
    try {
      await loading();
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();
      const data = await responseJson.data;

      console.log(responseJson.message);
      return data;
    } catch (error) {
      throw new Error();
    }
  }
  static async getArchivedNotes() {
    try {
      await loading();
      const response = await fetch(`${baseUrl}/notes/archived`);
      const responseJson = await response.json();
      const data = await responseJson.data;

      console.log(responseJson.message);
      return data;
    } catch (error) {
      throw new Error();
    }
  }

  static async createNote(newNote) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNote.title,
          body: newNote.body,
        }),
      };

      await loading();

      const response = await fetch(`${baseUrl}/notes`, options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.status}`,
        text: `${responseJson.message}`,
        icon: "success",
      });

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };

      await loading();

      const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: "success",
      });

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  static async archive(noteId) {
    try {
      const options = {
        method: "POST",
      };

      await loading();

      const response = await fetch(
        `${baseUrl}/notes/${noteId}/archive`,
        options,
      );
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: "success",
      });

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  static async unarchive(noteId) {
    try {
      const options = {
        method: "POST",
      };

      await loading();

      const response = await fetch(
        `${baseUrl}/notes/${noteId}/unarchive`,
        options,
      );
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: "success",
      });

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
}

export default NotesApi;
