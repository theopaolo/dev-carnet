import { escapeHtml as esc } from "../lib/html.mjs";
const fmt = (number) => number.toLocaleString("fr-FR");
const TRAVEL = 700;
const still = matchMedia("(prefers-reduced-motion: reduce)");

function rowHtml(step) {
  if (step.from === step.to)
    return `<div class="seq-row"><div class="seq-self" style="grid-column:${step.from + 1}"><span class="seq-label">↻ ${esc(step.text)}</span></div></div>`;
  const lo = Math.min(step.from, step.to);
  const hi = Math.max(step.from, step.to);
  const cls = `seq-msg${step.to < step.from ? " rtl" : ""}${step.dashed ? " dashed" : ""}`;
  return (
    `<div class="seq-row"><div class="${cls}" style="grid-column:${lo + 1}/${hi + 2};--span:${hi - lo + 1}">` +
    `<span class="seq-label">${esc(step.text)}</span>` +
    `<span class="seq-track"><span class="seq-line"></span><span class="seq-dot"></span></span></div></div>`
  );
}

// Lignes, avec un cadre autour des étapes consécutives d'un même bloc loop
function rowsHtml(steps) {
  let html = "";
  steps.forEach((step, i) => {
    if (step.loop && step.loop !== steps[i - 1]?.loop)
      html += `<div class="seq-loop"><span class="seq-loop-label">loop ${esc(step.loop.label)}</span>`;
    html += rowHtml(step);
    if (step.loop && step.loop !== steps[i + 1]?.loop) html += "</div>";
  });
  return html;
}

export function rowsView(sequence) {
  let rows, loops;
  return {
    html:
      `<div class="seq-actors">${sequence.actors.map((a) => `<div class="seq-actor">${esc(a.label)}</div>`).join("")}</div>` +
      `<div class="seq-rows"><div class="seq-lifelines" aria-hidden="true">${"<i></i>".repeat(sequence.actors.length)}</div>${rowsHtml(sequence.steps)}</div>`,
    update(element, stepNumber) {
      rows ??= [...element.querySelectorAll(".seq-row")];
      loops ??= [...element.querySelectorAll(".seq-loop")];
      rows.forEach((row, i) => {
        row.hidden = i >= stepNumber;
        row.classList.remove("current");
      });
      loops.forEach((loop) => (loop.hidden = !loop.querySelector(".seq-row:not([hidden])")));
      if (stepNumber > 0) {
        void rows[stepNumber - 1].offsetWidth; // relance l'animation CSS
        rows[stepNumber - 1].classList.add("current");
        // En plein écran, seule la vue défile : suivre la dernière flèche
        if (document.fullscreenElement === element)
          rows[stepNumber - 1].scrollIntoView({ block: "nearest" });
      }
    },
  };
}

export function starView(sequence) {
  // Centre : l'acteur qui envoie ou reçoit le plus de messages (le harness)
  const hits = sequence.actors.map(
    (_, i) => sequence.steps.filter((step) => step.from === i || step.to === i).length,
  );
  const hub = hits.indexOf(Math.max(...hits));
  const others = sequence.actors.map((_, i) => i).filter((i) => i !== hub);
  // Les autres en cercle, en partant de la gauche, dans le sens des aiguilles
  const pos = [];
  pos[hub] = { x: 50, y: 50 };
  others.forEach((a, i) => {
    const t = Math.PI + (i * 2 * Math.PI) / others.length;
    pos[a] = { x: 50 + 34 * Math.cos(t), y: 50 + 36 * Math.sin(t) };
  });
  const key = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
  const edges = [
    ...new Set(
      sequence.steps.filter((step) => step.from !== step.to).map((step) => key(step.from, step.to)),
    ),
  ];

  // Un tour = un appel identique au premier message du premier loop (harness → modèle)
  const first = sequence.steps.find((step) => step.loop);
  const isTurn = (step) => first && step.from === first.from && step.to === first.to;
  const turns = sequence.steps.filter(isTurn).length;

  let label, dot, lines, loopTag, turnTag;
  return {
    html: `<div class="seq-stage">
        <svg class="seq-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edges
          .map((e) => {
            const [a, b] = e.split("-").map(Number);
            return `<line data-edge="${e}" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>`;
          })
          .join("")}</svg>
        ${sequence.actors.map((a, i) => `<div class="seq-actor" style="left:${pos[i].x}%;top:${pos[i].y}%">${esc(a.label)}</div>`).join("")}
        <span class="seq-dot" aria-hidden="true"></span>
        <span class="seq-label seq-stage-label" hidden></span>
        ${first ? `<div class="seq-turn"><span class="seq-loop-label">loop ${esc(first.loop.label)}</span> <span class="seq-turn-n"></span></div>` : ""}
      </div>`,
    update(element, stepNumber) {
      label ??= element.querySelector(".seq-stage-label");
      dot ??= element.querySelector(".seq-stage .seq-dot");
      lines ??= [...element.querySelectorAll(".seq-edges line")];
      loopTag ??= element.querySelector(".seq-turn .seq-loop-label");
      turnTag ??= element.querySelector(".seq-turn-n");
      const step = sequence.steps[stepNumber - 1];
      lines.forEach((loop) =>
        loop.classList.toggle("on", !!step && loop.dataset.edge === key(step.from, step.to)),
      );

      if (turnTag) {
        const n = sequence.steps.slice(0, stepNumber).filter(isTurn).length;
        turnTag.textContent = n ? `tour ${n} / ${turns}` : "";
        loopTag.classList.toggle("on", !!step?.loop);
      }

      label.hidden = !step;
      if (!step) return;
      const a = pos[step.from];
      const b = pos[step.to];
      // Étiquette au milieu de la flèche, ou sous l'acteur pour un message à soi-même
      label.textContent = step.from === step.to ? `↻ ${step.text}` : step.text;
      label.classList.toggle("self", step.from === step.to);
      label.style.left = `${(a.x + b.x) / 2}%`;
      label.style.top = step.from === step.to ? `calc(${a.y}% + 2.4em)` : `${(a.y + b.y) / 2}%`;
      if (still.matches) return;
      label.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 350,
        delay: 100,
        fill: "backwards",
      });
      if (step.from !== step.to)
        dot.animate(
          [
            { left: `${a.x}%`, top: `${a.y}%`, opacity: 1 },
            { left: `${b.x}%`, top: `${b.y}%`, opacity: 1, offset: 0.85 },
            { left: `${b.x}%`, top: `${b.y}%`, opacity: 0 },
          ],
          { duration: TRAVEL, easing: "ease-in-out" },
        );
    },
  };
}

export function transcript(sequence) {
  const who = (i) => esc(sequence.actors[i].label);
  const tokens = (list) => list.map((e) => `${esc(e.role)} ${fmt(e.tokens)} tokens`).join(", ");
  const items = sequence.steps.map((step, i) => {
    const msg =
      step.from === step.to
        ? `${who(step.from)} : ${esc(step.text)}`
        : `${who(step.from)} → ${who(step.to)} : ${esc(step.text)}`;
    const ctx = [
      step.compact &&
        `compaction, l’historique devient un résumé de ${fmt(step.compact.tokens)} tokens`,
      step.ctx.length && `+ ${tokens(step.ctx)}`,
    ].filter(Boolean);
    const loopStart = step.loop && step.loop !== sequence.steps[i - 1]?.loop;
    const loopEnd = step.loop && step.loop !== sequence.steps[i + 1]?.loop;
    return `<li>${loopStart ? `<span class="seq-text-meta">Début de la boucle ${esc(step.loop.label)}</span>` : ""}${msg}${
      ctx.length ? `<span class="seq-text-meta">Contexte : ${ctx.join(", ")}</span>` : ""
    }${step.note ? `<span class="seq-text-note">${esc(step.note)}</span>` : ""}${
      loopEnd ? `<span class="seq-text-meta">Fin de la boucle</span>` : ""
    }</li>`;
  });
  return `<details class="seq-text">
      <summary>Version texte</summary>
      ${sequence.initial.length ? `<p>Contexte de départ : ${sequence.initial.map((e) => `${esc(e.label)} (${esc(e.role)}, ${fmt(e.tokens)} tokens)`).join(", ")}.</p>` : ""}
      <ol>${items.join("")}</ol>
    </details>`;
}
