class Utils {
  static generateUniqueId() {
    const unikId = Math.floor(Math.random() * 10000000000).toString(16);
    return `notes-${unikId}-${unikId}-${unikId}`;
  }

  static generateCreatedAt() {
    const date = new Date();
    return date;
  }

  static makeNewNote(id, title, body, createdAt, archived) {
    return {
      id,
      title,
      body,
      createdAt,
      archived,
    };
  }

  static emptyElement(element) {
    element.innerHTML = "";
  }
  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }
  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
}

export default Utils;
