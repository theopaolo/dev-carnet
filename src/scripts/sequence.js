import { rowsView, starView, transcript } from "./sequence-views.js";
import { escapeHtml as esc } from "../lib/html.mjs";
// Joue les blocs ```animated pas à pas : un message par étape, le contexte
// (messages[]) grandit sous le diagramme. Syntaxe : src/lib/parse-sequence.mjs.
// Deux dispositions pour la même source :
//   rows : diagramme de séquence, l'historique des messages s'empile
//   loop : étoile autour de l'acteur le plus sollicité, un point parcourt la flèche en cours
import { parseSequence } from "../lib/parse-sequence.mjs";

const fmt = (stepCount) => stepCount.toLocaleString("fr-FR");
const INTERVAL = 2200;

function mount(element, fig) {
  const sequence = parseSequence(element.textContent);
  const view = element.dataset.layout === "loop" ? starView(sequence) : rowsView(sequence);
  const stepCount = sequence.steps.length;
  // Chaque entrée retient l'étape qui l'ajoute (0 = contexte de départ) et,
  // après une compaction, l'étape qui la retire
  const entries = sequence.initial.map((entry) => ({ ...entry, at: 0, until: Infinity }));
  sequence.steps.forEach((step, i) => {
    if (step.compact) {
      for (const entry of entries)
        if (entry.until === Infinity && entry.role !== "system" && entry.role !== "tools")
          entry.until = i + 1;
      entries.push({ role: "summary", ...step.compact, at: i + 1, until: Infinity });
    }
    for (const entry of step.ctx) entries.push({ ...entry, at: i + 1, until: Infinity });
  });
  const live = (stepNumber) =>
    entries.filter((entry) => entry.at <= stepNumber && stepNumber < entry.until);
  const sum = (list) => list.reduce((total, entry) => total + entry.tokens, 0);
  // 100 % de la barre = le plus gros contexte atteint, ou le budget s'il est plus grand
  let peak = 0;
  for (let stepNumber = 0; stepNumber <= stepCount; stepNumber++)
    peak = Math.max(peak, sum(live(stepNumber)));
  const scale = Math.max(peak, sequence.budget) || 1;
  const roles = [...new Set(entries.map((entry) => entry.role))];

  element.style.setProperty("--cols", sequence.actors.length);
  element.innerHTML = `
    <div class="seq-view">${view.html}</div>
    <p class="seq-note" aria-live="polite"></p>
    ${
      entries.length
        ? `<div class="seq-ctx">
        <div class="seq-ctx-head"><span>messages[] envoyé au modèle</span><span class="seq-total"></span></div>
        <div class="seq-bar-wrap">
          <div class="seq-bar">${entries.map((entry) => `<span class="seg" data-role="${esc(entry.role)}" title="${esc(`${entry.role} : ${entry.label} (${fmt(entry.tokens)} tokens)`)}"></span>`).join("")}</div>
          ${sequence.budget ? `<i class="seq-budget" style="left:${(sequence.budget / scale) * 100}%" title="Budget : ${fmt(sequence.budget)} tokens"></i>` : ""}
        </div>
        <ul class="seq-legend">${roles.map((r) => `<li data-role="${esc(r)}"><i></i>${esc(r)} <b></b></li>`).join("")}</ul>
      </div>`
        : ""
    }
    <div class="diagram-bar">
      <p class="diagram-caption">${sequence.title || sequence.desc ? `<span class="fig">Fig. ${fig}</span> <strong>${esc(sequence.title)}</strong> <span class="desc">${esc(sequence.desc)}</span>` : ""}</p>
      <div class="seq-controls">
        <button type="button" class="button seq-btn" data-act="prev" aria-label="Étape précédente">‹</button>
        <button type="button" class="button seq-btn seq-play" data-act="play" aria-pressed="false">Lecture</button>
        <button type="button" class="button seq-btn" data-act="next" aria-label="Étape suivante">›</button>
        <span class="seq-count"></span>
        <button type="button" class="button seq-btn" data-act="full">Plein écran</button>
      </div>
    </div>
    ${transcript(sequence)}`;

  const actors = [...element.querySelectorAll(".seq-actor")];
  const segments = [...element.querySelectorAll(".seg")];
  const legend = [...element.querySelectorAll(".seq-legend li")];
  const note = element.querySelector(".seq-note");
  const play = element.querySelector(".seq-play");
  let currentStep = 0;
  let timer = null;

  function show(stepNumber) {
    currentStep = stepNumber;
    view.update(element, stepNumber);
    actors.forEach((actor, i) =>
      actor.classList.toggle("active", stepNumber > 0 && i === sequence.steps[stepNumber - 1].to),
    );
    note.textContent = stepNumber > 0 ? sequence.steps[stepNumber - 1].note : "";

    const seen = live(stepNumber);
    entries.forEach((entry, i) => {
      segments[i].style.width = seen.includes(entry) ? `${(entry.tokens / scale) * 100}%` : "0";
      segments[i].classList.toggle("new", entry.at === stepNumber && stepNumber > 0);
    });
    legend.forEach((item) => {
      const total = sum(seen.filter((entry) => entry.role === item.dataset.role));
      item.hidden = total === 0;
      item.querySelector("b").textContent = fmt(total);
    });
    const totalLabel = element.querySelector(".seq-total");
    if (totalLabel)
      totalLabel.textContent = `${fmt(sum(seen))} tokens${sequence.budget ? ` / budget ${fmt(sequence.budget)}` : ""}`;

    element.querySelector(".seq-count").textContent = `${stepNumber} / ${stepCount}`;
    element.querySelector('[data-act="prev"]').disabled = stepNumber === 0;
    element.querySelector('[data-act="next"]').disabled = stepNumber === stepCount;
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    play.textContent = "Lecture";
    play.setAttribute("aria-pressed", "false");
  }

  function start() {
    if (currentStep === stepCount) show(0);
    play.textContent = "Pause";
    play.setAttribute("aria-pressed", "true");
    const tick = () => (currentStep < stepCount ? show(currentStep + 1) : stop());
    tick();
    timer = setInterval(tick, INTERVAL);
  }

  element.addEventListener("click", (event) => {
    const act = event.target.closest("[data-act]")?.dataset.act;
    if (act === "play") timer ? stop() : start();
    if (act === "prev") {
      stop();
      show(Math.max(0, currentStep - 1));
    }
    if (act === "next") {
      stop();
      show(Math.min(stepCount, currentStep + 1));
    }
    if (act === "full")
      document.fullscreenElement ? document.exitFullscreen() : element.requestFullscreen?.();
  });
  element.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      stop();
      show(Math.min(stepCount, currentStep + 1));
    }
    if (event.key === "ArrowLeft") {
      stop();
      show(Math.max(0, currentStep - 1));
    }
  });

  show(0);
}

const all = [...document.querySelectorAll(".diagram")];
document
  .querySelectorAll(".diagram.seq")
  .forEach((element) => mount(element, all.indexOf(element) + 1));
