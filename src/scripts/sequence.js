// Joue les blocs ```animated pas à pas : un message par étape, le contexte
// (messages[]) grandit sous le diagramme. Syntaxe : src/lib/parse-sequence.mjs.
// Deux dispositions pour la même source :
//   rows : diagramme de séquence, l'historique des messages s'empile
//   loop : étoile autour de l'acteur le plus sollicité, un point parcourt la flèche en cours
import { parseSequence } from "../lib/parse-sequence.mjs";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (n) => n.toLocaleString("fr-FR");
const INTERVAL = 2200;
const TRAVEL = 700;
const still = matchMedia("(prefers-reduced-motion: reduce)");

// ---------- rows : diagramme de séquence ----------

function rowHtml(st) {
  if (st.from === st.to)
    return `<div class="seq-row"><div class="seq-self" style="grid-column:${st.from + 1}"><span class="seq-label">↻ ${esc(st.text)}</span></div></div>`;
  const lo = Math.min(st.from, st.to);
  const hi = Math.max(st.from, st.to);
  const cls = `seq-msg${st.to < st.from ? " rtl" : ""}${st.dashed ? " dashed" : ""}`;
  return (
    `<div class="seq-row"><div class="${cls}" style="grid-column:${lo + 1}/${hi + 2};--span:${hi - lo + 1}">` +
    `<span class="seq-label">${esc(st.text)}</span>` +
    `<span class="seq-track"><span class="seq-line"></span><span class="seq-dot"></span></span></div></div>`
  );
}

// Lignes, avec un cadre autour des étapes consécutives d'un même bloc loop
function rowsHtml(steps) {
  let html = "";
  steps.forEach((st, i) => {
    if (st.loop && st.loop !== steps[i - 1]?.loop)
      html += `<div class="seq-loop"><span class="seq-loop-label">loop ${esc(st.loop.label)}</span>`;
    html += rowHtml(st);
    if (st.loop && st.loop !== steps[i + 1]?.loop) html += "</div>";
  });
  return html;
}

function rowsView(s) {
  let rows, loops;
  return {
    html:
      `<div class="seq-actors">${s.actors.map((a) => `<div class="seq-actor">${esc(a.label)}</div>`).join("")}</div>` +
      `<div class="seq-rows"><div class="seq-lifelines" aria-hidden="true">${"<i></i>".repeat(s.actors.length)}</div>${rowsHtml(s.steps)}</div>`,
    update(el, k) {
      rows ??= [...el.querySelectorAll(".seq-row")];
      loops ??= [...el.querySelectorAll(".seq-loop")];
      rows.forEach((r, i) => {
        r.hidden = i >= k;
        r.classList.remove("current");
      });
      loops.forEach((l) => (l.hidden = !l.querySelector(".seq-row:not([hidden])")));
      if (k > 0) {
        void rows[k - 1].offsetWidth; // relance l'animation CSS
        rows[k - 1].classList.add("current");
        // En plein écran, seule la vue défile : suivre la dernière flèche
        if (document.fullscreenElement === el) rows[k - 1].scrollIntoView({ block: "nearest" });
      }
    },
  };
}

// ---------- loop : étoile autour du harness ----------

function starView(s) {
  // Centre : l'acteur qui envoie ou reçoit le plus de messages (le harness)
  const hits = s.actors.map((_, i) => s.steps.filter((st) => st.from === i || st.to === i).length);
  const hub = hits.indexOf(Math.max(...hits));
  const others = s.actors.map((_, i) => i).filter((i) => i !== hub);
  // Les autres en cercle, en partant de la gauche, dans le sens des aiguilles
  const pos = [];
  pos[hub] = { x: 50, y: 50 };
  others.forEach((a, i) => {
    const t = Math.PI + (i * 2 * Math.PI) / others.length;
    pos[a] = { x: 50 + 34 * Math.cos(t), y: 50 + 36 * Math.sin(t) };
  });
  const key = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
  const edges = [...new Set(s.steps.filter((st) => st.from !== st.to).map((st) => key(st.from, st.to)))];

  // Un tour = un appel identique au premier message du premier loop (harness → modèle)
  const first = s.steps.find((st) => st.loop);
  const isTurn = (st) => first && st.from === first.from && st.to === first.to;
  const turns = s.steps.filter(isTurn).length;

  let label, dot, lines, loopTag, turnTag;
  return {
    html: `<div class="seq-stage">
        <svg class="seq-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edges
          .map((e) => {
            const [a, b] = e.split("-").map(Number);
            return `<line data-edge="${e}" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>`;
          })
          .join("")}</svg>
        ${s.actors.map((a, i) => `<div class="seq-actor" style="left:${pos[i].x}%;top:${pos[i].y}%">${esc(a.label)}</div>`).join("")}
        <span class="seq-dot" aria-hidden="true"></span>
        <span class="seq-label seq-stage-label" hidden></span>
        ${first ? `<div class="seq-turn"><span class="seq-loop-label">loop ${esc(first.loop.label)}</span> <span class="seq-turn-n"></span></div>` : ""}
      </div>`,
    update(el, k) {
      label ??= el.querySelector(".seq-stage-label");
      dot ??= el.querySelector(".seq-stage .seq-dot");
      lines ??= [...el.querySelectorAll(".seq-edges line")];
      loopTag ??= el.querySelector(".seq-turn .seq-loop-label");
      turnTag ??= el.querySelector(".seq-turn-n");
      const st = s.steps[k - 1];
      lines.forEach((l) => l.classList.toggle("on", !!st && l.dataset.edge === key(st.from, st.to)));

      if (turnTag) {
        const n = s.steps.slice(0, k).filter(isTurn).length;
        turnTag.textContent = n ? `tour ${n} / ${turns}` : "";
        loopTag.classList.toggle("on", !!st?.loop);
      }

      label.hidden = !st;
      if (!st) return;
      const a = pos[st.from];
      const b = pos[st.to];
      // Étiquette au milieu de la flèche, ou sous l'acteur pour un message à soi-même
      label.textContent = st.from === st.to ? `↻ ${st.text}` : st.text;
      label.classList.toggle("self", st.from === st.to);
      label.style.left = `${(a.x + b.x) / 2}%`;
      label.style.top = st.from === st.to ? `calc(${a.y}% + 2.4em)` : `${(a.y + b.y) / 2}%`;
      if (still.matches) return;
      label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, delay: 100, fill: "backwards" });
      if (st.from !== st.to)
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

// ---------- version texte : les mêmes étapes en liste, pour lecteur d'écran ou lecture rapide ----------

function transcript(s) {
  const who = (i) => esc(s.actors[i].label);
  const tokens = (list) => list.map((e) => `${esc(e.role)} ${fmt(e.tokens)} tokens`).join(", ");
  const items = s.steps.map((st, i) => {
    const msg = st.from === st.to ? `${who(st.from)} : ${esc(st.text)}` : `${who(st.from)} → ${who(st.to)} : ${esc(st.text)}`;
    const ctx = [
      st.compact && `compaction, l’historique devient un résumé de ${fmt(st.compact.tokens)} tokens`,
      st.ctx.length && `+ ${tokens(st.ctx)}`,
    ].filter(Boolean);
    const loopStart = st.loop && st.loop !== s.steps[i - 1]?.loop;
    const loopEnd = st.loop && st.loop !== s.steps[i + 1]?.loop;
    return `<li>${loopStart ? `<span class="seq-text-meta">Début de la boucle ${esc(st.loop.label)}</span>` : ""}${msg}${
      ctx.length ? `<span class="seq-text-meta">Contexte : ${ctx.join(", ")}</span>` : ""
    }${st.note ? `<span class="seq-text-note">${esc(st.note)}</span>` : ""}${
      loopEnd ? `<span class="seq-text-meta">Fin de la boucle</span>` : ""
    }</li>`;
  });
  return `<details class="seq-text">
      <summary>Version texte</summary>
      ${s.initial.length ? `<p>Contexte de départ : ${s.initial.map((e) => `${esc(e.label)} (${esc(e.role)}, ${fmt(e.tokens)} tokens)`).join(", ")}.</p>` : ""}
      <ol>${items.join("")}</ol>
    </details>`;
}

// ---------- commun : contexte, note, commandes ----------

function mount(el, fig) {
  const s = parseSequence(el.textContent);
  const view = el.dataset.layout === "loop" ? starView(s) : rowsView(s);
  const n = s.steps.length;
  // Chaque entrée retient l'étape qui l'ajoute (0 = contexte de départ) et,
  // après une compaction, l'étape qui la retire
  const entries = s.initial.map((e) => ({ ...e, at: 0, until: Infinity }));
  s.steps.forEach((st, i) => {
    if (st.compact) {
      for (const e of entries) if (e.until === Infinity && e.role !== "system" && e.role !== "tools") e.until = i + 1;
      entries.push({ role: "summary", ...st.compact, at: i + 1, until: Infinity });
    }
    for (const e of st.ctx) entries.push({ ...e, at: i + 1, until: Infinity });
  });
  const live = (k) => entries.filter((e) => e.at <= k && k < e.until);
  const sum = (list) => list.reduce((a, e) => a + e.tokens, 0);
  // 100 % de la barre = le plus gros contexte atteint, ou le budget s'il est plus grand
  let peak = 0;
  for (let k = 0; k <= n; k++) peak = Math.max(peak, sum(live(k)));
  const scale = Math.max(peak, s.budget) || 1;
  const roles = [...new Set(entries.map((e) => e.role))];

  el.style.setProperty("--cols", s.actors.length);
  el.innerHTML = `
    <div class="seq-view">${view.html}</div>
    <p class="seq-note" aria-live="polite"></p>
    ${
      entries.length
        ? `<div class="seq-ctx">
        <div class="seq-ctx-head"><span>messages[] envoyé au modèle</span><span class="seq-total"></span></div>
        <div class="seq-bar-wrap">
          <div class="seq-bar">${entries.map((e) => `<span class="seg" data-role="${esc(e.role)}" title="${esc(`${e.role} : ${e.label} (${fmt(e.tokens)} tokens)`)}"></span>`).join("")}</div>
          ${s.budget ? `<i class="seq-budget" style="left:${(s.budget / scale) * 100}%" title="Budget : ${fmt(s.budget)} tokens"></i>` : ""}
        </div>
        <ul class="seq-legend">${roles.map((r) => `<li data-role="${esc(r)}"><i></i>${esc(r)} <b></b></li>`).join("")}</ul>
      </div>`
        : ""
    }
    <div class="diagram-bar">
      <p class="diagram-caption">${s.title || s.desc ? `<span class="fig">Fig. ${fig}</span> <strong>${esc(s.title)}</strong> <span class="desc">${esc(s.desc)}</span>` : ""}</p>
      <div class="seq-controls">
        <button type="button" class="seq-btn" data-act="prev" aria-label="Étape précédente">‹</button>
        <button type="button" class="seq-btn seq-play" data-act="play" aria-pressed="false">Lecture</button>
        <button type="button" class="seq-btn" data-act="next" aria-label="Étape suivante">›</button>
        <span class="seq-count"></span>
        <button type="button" class="seq-btn" data-act="full">Plein écran</button>
      </div>
    </div>
    ${transcript(s)}`;

  const actors = [...el.querySelectorAll(".seq-actor")];
  const segs = [...el.querySelectorAll(".seg")];
  const legend = [...el.querySelectorAll(".seq-legend li")];
  const note = el.querySelector(".seq-note");
  const play = el.querySelector(".seq-play");
  let cur = 0;
  let timer = null;

  function show(k) {
    cur = k;
    view.update(el, k);
    actors.forEach((a, i) => a.classList.toggle("active", k > 0 && i === s.steps[k - 1].to));
    note.textContent = k > 0 ? s.steps[k - 1].note : "";

    const seen = live(k);
    entries.forEach((e, i) => {
      segs[i].style.width = seen.includes(e) ? `${(e.tokens / scale) * 100}%` : "0";
      segs[i].classList.toggle("new", e.at === k && k > 0);
    });
    legend.forEach((li) => {
      const total = sum(seen.filter((e) => e.role === li.dataset.role));
      li.hidden = total === 0;
      li.querySelector("b").textContent = fmt(total);
    });
    const t = el.querySelector(".seq-total");
    if (t) t.textContent = `${fmt(sum(seen))} tokens${s.budget ? ` / budget ${fmt(s.budget)}` : ""}`;

    el.querySelector(".seq-count").textContent = `${k} / ${n}`;
    el.querySelector('[data-act="prev"]').disabled = k === 0;
    el.querySelector('[data-act="next"]').disabled = k === n;
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    play.textContent = "Lecture";
    play.setAttribute("aria-pressed", "false");
  }

  function start() {
    if (cur === n) show(0);
    play.textContent = "Pause";
    play.setAttribute("aria-pressed", "true");
    const tick = () => (cur < n ? show(cur + 1) : stop());
    tick();
    timer = setInterval(tick, INTERVAL);
  }

  el.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "play") timer ? stop() : start();
    if (act === "prev") (stop(), show(Math.max(0, cur - 1)));
    if (act === "next") (stop(), show(Math.min(n, cur + 1)));
    if (act === "full") document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.();
  });
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") (stop(), show(Math.min(n, cur + 1)));
    if (e.key === "ArrowLeft") (stop(), show(Math.max(0, cur - 1)));
  });

  show(0);
}

const all = [...document.querySelectorAll(".diagram")];
document.querySelectorAll(".diagram.seq").forEach((el) => mount(el, all.indexOf(el) + 1));
