import Swal from "sweetalert2";
const baseUrl = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getUnarchivedNotes() {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch(`${baseUrl}/notes`, options);
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
      const options = {
        method: "GET",
      };
      const response = await fetch(`${baseUrl}/notes/archived`, options);
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
