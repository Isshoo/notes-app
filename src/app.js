import home from "./script/view/home.js";
import "./script/index.js";
import "./styles/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const render = home();
  render.renderUnarchived();
  home();
});
