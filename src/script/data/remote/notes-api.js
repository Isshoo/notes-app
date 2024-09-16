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
      const response = await fetch(`${baseUrl}/notes?archived=true`);
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
        body: JSON.stringify(newNote),
      };

      const response = await fetch(`${baseUrl}/notes`, options);
      const responseJson = await response.json();
      const data = responseJson.data;

      return data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export default NotesApi;
