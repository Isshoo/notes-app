const baseUrl = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getUnarchivedNotes() {
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();
      const data = responseJson.data;

      return data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  static async getArchivedNotes() {
    try {
      const response = await fetch(`${baseUrl}/notes/archived`);
      const responseJson = await response.json();
      const data = responseJson.data;

      return data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
      const data = responseJson.data;

      console.log(data);
      this.getArchivedNotes();
      return data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
      const responseJson = await response.json();
      const data = responseJson.data;

      console.log(data);
      return data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export default NotesApi;
