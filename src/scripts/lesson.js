import "./reading.js";
import "./reading-progress.js";
import { initNotebook } from "./notebook.js";

initNotebook();

if (document.querySelector("div.mermaid")) import("./diagrams.js");
if (document.querySelector(".diagram.seq")) import("./sequence.js");
if (document.querySelector(".content img")) import("./image-zoom.js");
