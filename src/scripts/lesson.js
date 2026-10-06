import "./reading.js";
import "./reading-progress.js";
import "./link-previews.js";
import { initNotebook } from "./notebook.js";

initNotebook();

// À l'impression, les blocs repliés s'ouvrent, puis se referment
let closed = [];
addEventListener("beforeprint", () => {
  closed = [...document.querySelectorAll(".content details:not([open])")];
  closed.forEach((details) => (details.open = true));
});
addEventListener("afterprint", () => closed.forEach((details) => (details.open = false)));

if (document.querySelector("div.mermaid")) import("./diagrams.js");
if (document.querySelector(".diagram.seq")) import("./sequence.js");
if (document.querySelector(".content img")) import("./image-zoom.js");
