// Le carnet de l'élève : trois rubans (marque-pages) et des notes sur des passages surlignés.
// Tout reste dans le localStorage de ce navigateur (PRODUCT.md, principe 4). La Pochette
// (src/pages/pochette.astro) les liste, les exporte en Markdown et les réimporte.
import { describe, locate } from "../lib/anchor.mjs";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const pageUrl = (page, hash = "") => `${base}/${page}/${hash && `#${hash}`}`;

export const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    return [];
  }
};
export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

// Masqués depuis la Pochette, par exemple avant de projeter (lu dans la tête de Lesson.astro)
const hidden = "notesHidden" in document.documentElement.dataset;
const content = document.getElementById("contenu");
const page = content?.dataset.page;
const title = content?.querySelector("h1")?.textContent.trim() || document.title;
const course = document.querySelector(".where-course")?.textContent.trim() ?? "";

// ---------- Rubans ----------

export const where = (r) => (r.section ? `${r.title}, ${r.section}` : r.title);
export const plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;

const rail = document.querySelector(".ribbons");

function renderRail() {
  rail.replaceChildren(
    ...load("ribbons")
      .sort((a, b) => a.slot - b.slot)
      .map((r) => {
        const a = document.createElement("a");
        a.className = "ribbon";
        a.dataset.slot = r.slot;
        if (r.page === page) a.dataset.here = "";
        a.href = pageUrl(r.page, r.slug);
        a.setAttribute("aria-label", `Ruban : ${where(r)}`);
        a.innerHTML = '<span class="ribbon-band"></span><span class="ribbon-label" aria-hidden="true"></span>';
        a.lastChild.textContent = where(r);
        return a;
      }),
  );
}

// Pochette (src/components/Pocket.astro) : compte, une fiche qui dépasse par ruban ou note
// (cinq au plus), rubans rangés sur l'accueil
function renderPocket() {
  const ribbons = load("ribbons").sort((a, b) => a.slot - b.slot);
  const notes = load("notes").length;
  const parts = [ribbons.length && plural(ribbons.length, "ruban"), notes && plural(notes, "note")].filter(Boolean);
  for (const card of document.querySelectorAll(".pocket-card")) {
    const count = card.querySelector("[data-pocket-count]");
    count.dataset.empty ??= count.textContent;
    count.textContent = parts.join(", ") || count.dataset.empty;
    card
      .querySelector("[data-pocket-slips]")
      .replaceChildren(...Array.from({ length: Math.min(ribbons.length + notes, 5) }, () => document.createElement("i")));
    card.querySelector("[data-pocket-peek]")?.replaceChildren(
      ...ribbons.map((r) => {
        const li = document.createElement("li");
        li.dataset.slot = r.slot;
        li.append(Object.assign(document.createElement("span"), { textContent: where(r) }));
        return li;
      }),
    );
  }
}

// Téléphone : le même bouton à côté de chaque titre, pour marquer la section sans remonter
// à « Sur cette page » (affiché sous 760px seulement)
for (const b of document.querySelectorAll(".toc-inline [data-ribbon]")) {
  const copy = b.cloneNode();
  copy.className = "heading-ribbon";
  document.getElementById(b.dataset.ribbon)?.append(copy);
}

// Sommaire : un bouton par section. Le titre de la section posée garde son ruban dans la marge
const buttons = document.querySelectorAll("[data-ribbon]");

function renderRibbons() {
  const ribbons = load("ribbons");
  for (const b of buttons) {
    const r = ribbons.find((r) => r.page === page && r.slug === b.dataset.ribbon);
    b.setAttribute("aria-pressed", String(!!r));
    if (r) b.dataset.slot = r.slot;
    else delete b.dataset.slot;
    b.title = r
      ? "Retirer le ruban"
      : "Poser un ruban sur cette section" + (ribbons.length >= 3 ? ". Le plus ancien des trois est déplacé ici" : "");
  }
  for (const h of content?.querySelectorAll(":scope > [data-slot]") ?? []) delete h.dataset.slot;
  for (const r of ribbons) if (r.page === page && r.slug) document.getElementById(r.slug)?.setAttribute("data-slot", r.slot);
}

// Aussi appelé par la Pochette après un retrait ou un import
export function render() {
  if (rail && !hidden) renderRail();
  if (page) renderRibbons();
  renderPocket();
}
render();

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-ribbon]");
  if (!b || !page) return;
  const slug = b.dataset.ribbon;
  let ribbons = load("ribbons");
  const i = ribbons.findIndex((r) => r.page === page && r.slug === slug);
  if (i >= 0) ribbons.splice(i, 1);
  else {
    // Trois rubans, comme un Leuchtturm : le plus ancien est déplacé ici
    if (ribbons.length >= 3) ribbons = ribbons.sort((a, b) => a.at - b.at).slice(1);
    const slot = [0, 1, 2].find((s) => !ribbons.some((r) => r.slot === s));
    // Le titre de la page (h1) : pas de section, le ruban mène en haut de page
    const h = document.getElementById(slug);
    const section = h?.tagName === "H2" ? h.textContent.trim() : "";
    ribbons.push({ slot, page, slug, section, title, at: Date.now() });
  }
  save("ribbons", ribbons);
  render();
});

// ---------- Notes ----------

// Texte de la page vu par les notes : sans l'interface ajoutée (boutons, sommaire, diagrammes)
const SKIP = "button, svg, .diagram, .toc-inline, .pager, .note-card";

function textIndex() {
  const nodes = [];
  let text = "";
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n; (n = walker.nextNode()); ) {
    nodes.push({ n, at: text.length });
    text += n.data;
  }
  return { nodes, text };
}

// Sélection → début et fin dans le texte de la page, sans les espaces au bord
function offsets(range, { nodes, text }) {
  let start = -1;
  let end = -1;
  for (const { n, at } of nodes) {
    if (!range.intersectsNode(n)) continue;
    const s = n === range.startContainer ? range.startOffset : 0;
    const e = n === range.endContainer ? range.endOffset : n.length;
    if (s >= e) continue;
    if (start < 0) start = at + s;
    end = at + e;
  }
  while (start < end && /\s/.test(text[start])) start++;
  while (end > start && /\s/.test(text[end - 1])) end--;
  return end - start > 1 ? [start, end] : null;
}

// Surligne le passage : un <mark> par morceau de texte, le premier sert de bouton
function wrap(note, { nodes }, start, end) {
  const marks = [];
  for (const { n, at } of nodes) {
    const s = Math.max(start - at, 0);
    const e = Math.min(end - at, n.length);
    // Les retours à la ligne entre deux blocs ne se surlignent pas
    if (s >= e || !n.data.slice(s, e).trim()) continue;
    const r = document.createRange();
    r.setStart(n, s);
    r.setEnd(n, e);
    const m = document.createElement("mark");
    m.className = "annot";
    m.dataset.note = note.id;
    r.surroundContents(m);
    marks.push(m);
  }
  Object.assign(marks[0] ?? {}, { id: `note-${note.id}`, tabIndex: 0, title: "Modifier la note" });
  marks[0]?.setAttribute("role", "button");
  return marks;
}

// La note s'affiche sous le paragraphe, l'élément de liste, le tableau ou le bloc de code du passage
function place(card, mark) {
  const block = mark.closest(".code-block, table") ?? mark.closest("pre, li, p, h2, h3, h4, blockquote, dd") ?? mark;
  if (block.tagName === "LI") return block.append(card);
  let at = block;
  while (at.nextElementSibling?.classList.contains("note-card")) at = at.nextElementSibling;
  at.after(card);
}

function showCard(note, editing = false) {
  let card = content.querySelector(`.note-card[data-note="${note.id}"]`);
  if (!note.text && !editing) return card?.remove();
  if (!card) {
    card = document.createElement("div");
    card.className = "note-card";
    card.dataset.note = note.id;
    card.setAttribute("role", "note");
    place(card, document.getElementById(`note-${note.id}`));
  }
  if (editing) {
    card.innerHTML = `<textarea rows="3" aria-label="Note sur le passage surligné"></textarea>
      <div class="note-actions">
        <button type="button" class="theme-toggle" data-save>Enregistrer</button>
        <button type="button" class="note-link" data-remove>Retirer le surlignage</button>
      </div>`;
    const area = card.querySelector("textarea");
    area.value = note.text;
    area.focus();
  } else {
    card.innerHTML = `<p></p>
      <div class="note-actions">
        <button type="button" class="note-link" data-edit>Modifier</button>
        <button type="button" class="note-link" data-remove>Supprimer</button>
      </div>`;
    card.firstElementChild.textContent = note.text;
  }
}

const findNote = (id) => load("notes").find((n) => n.id === id);
// change : champs à modifier, ou null pour supprimer la note
const setNote = (id, change) => {
  save("notes", load("notes").flatMap((n) => (n.id !== id ? [n] : change ? [{ ...n, ...change }] : [])));
  renderPocket();
};

function removeNote(id) {
  for (const m of content.querySelectorAll(`mark[data-note="${id}"]`)) {
    const parent = m.parentNode;
    m.replaceWith(...m.childNodes);
    parent.normalize();
  }
  content.querySelector(`.note-card[data-note="${id}"]`)?.remove();
  setNote(id, null);
}

if (content && page && !hidden) {
  // Notes de la page : chaque passage est cherché dans le texte actuel.
  // Introuvable (chapitre réécrit) : la note est détachée et reste dans la Pochette
  const notes = load("notes");
  for (const note of notes.filter((n) => n.page === page)) {
    const index = textIndex();
    const i = locate(index.text, note);
    note.detached = i < 0;
    if (i < 0) continue;
    wrap(note, index, i, i + note.quote.length);
    showCard(note);
  }
  save("notes", notes);
  // Lien « voir dans la page » de la Pochette : la note n'existait pas encore au chargement
  if (location.hash.startsWith("#note-")) document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "center" });

  // Bouton Annoter sous la sélection
  const tool = document.createElement("button");
  tool.type = "button";
  tool.className = "theme-toggle annot-tool";
  tool.hidden = true;
  tool.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>Annoter`;
  document.body.append(tool);
  // Le clic ne doit pas effacer la sélection avant d'être traité
  tool.addEventListener("pointerdown", (e) => e.preventDefault());

  document.addEventListener("selectionchange", () => {
    const sel = getSelection();
    const range = sel.rangeCount ? sel.getRangeAt(0) : null;
    const c = range?.commonAncestorContainer;
    const el = c?.nodeType === Node.TEXT_NODE ? c.parentElement : c;
    tool.hidden = !range || range.collapsed || !content.contains(el) || !!el.closest(SKIP) || sel.toString().trim().length < 2;
    if (tool.hidden) return;
    const rect = range.getBoundingClientRect();
    const max = document.documentElement.clientWidth - tool.offsetWidth - 8;
    tool.style.top = `${rect.bottom + scrollY + 8}px`;
    tool.style.left = `${Math.max(8, Math.min(rect.left + rect.width / 2 - tool.offsetWidth / 2, max)) + scrollX}px`;
  });

  tool.addEventListener("click", () => {
    const sel = getSelection();
    const index = textIndex();
    const o = sel.rangeCount && offsets(sel.getRangeAt(0), index);
    if (!o) return;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const note = { id, page, title, course, ...describe(index.text, ...o), text: "", at: Date.now() };
    save("notes", [...load("notes"), note]);
    renderPocket();
    sel.removeAllRanges();
    tool.hidden = true;
    wrap(note, index, ...o);
    showCard(note, true);
  });

  const edit = (id) => showCard(findNote(id), true);
  const commit = (card) => {
    const id = card.dataset.note;
    setNote(id, { text: card.querySelector("textarea").value.trim() });
    showCard(findNote(id));
    document.getElementById(`note-${id}`)?.focus();
  };
  content.addEventListener("click", (e) => {
    const card = e.target.closest(".note-card");
    const mark = e.target.closest("mark.annot");
    if (mark && getSelection().isCollapsed) edit(mark.dataset.note);
    if (!card) return;
    if (e.target.closest("[data-save]")) commit(card);
    if (e.target.closest("[data-edit]")) edit(card.dataset.note);
    if (e.target.closest("[data-remove]")) removeNote(card.dataset.note);
  });
  content.addEventListener("keydown", (e) => {
    const mark = e.target.closest?.("mark.annot");
    if (mark && (e.key === "Enter" || e.key === " ")) (e.preventDefault(), edit(mark.dataset.note));
    const card = e.target.closest?.(".note-card");
    if (!card || e.target.tagName !== "TEXTAREA") return;
    // Cmd/Ctrl + Entrée enregistre, Échap annule la saisie
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) commit(card);
    if (e.key === "Escape") (showCard(findNote(card.dataset.note)), document.getElementById(`note-${card.dataset.note}`)?.focus());
  });
}
