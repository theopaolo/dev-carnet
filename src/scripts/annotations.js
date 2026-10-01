import { describe, locate } from "../lib/anchor.mjs";
import { load, save } from "../lib/notebook.mjs";

export function initAnnotations({ content, page, title, course, hidden, renderPocket }) {
  if (!content || !page || hidden) return;

  // Texte de la page vu par les notes : sans l'interface ajoutée (boutons, sommaire, diagrammes)
  const SKIP = "button:not(.glossary-term), svg, .diagram, .toc-inline, .pager, .note-card";

  function textIndex() {
    const nodes = [];
    let text = "";
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        node.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    for (let node; (node = walker.nextNode());) {
      nodes.push({ node, offset: text.length });
      text += node.data;
    }
    return { nodes, text };
  }

  // Sélection → début et fin dans le texte de la page, sans les espaces au bord
  function offsets(range, { nodes, text }) {
    let start = -1;
    let end = -1;
    for (const { node, offset } of nodes) {
      if (!range.intersectsNode(node)) continue;
      const startOffset = node === range.startContainer ? range.startOffset : 0;
      const endOffset = node === range.endContainer ? range.endOffset : node.length;
      if (startOffset >= endOffset) continue;
      if (start < 0) start = offset + startOffset;
      end = offset + endOffset;
    }
    while (start < end && /\s/.test(text[start])) start++;
    while (end > start && /\s/.test(text[end - 1])) end--;
    return end - start > 1 ? [start, end] : null;
  }

  // Surligne le passage : un <mark> par morceau de texte, le premier sert de bouton
  function wrap(note, { nodes }, start, end) {
    const marks = [];
    for (const { node, offset } of nodes) {
      const startOffset = Math.max(start - offset, 0);
      const endOffset = Math.min(end - offset, node.length);
      // Les retours à la ligne entre deux blocs ne se surlignent pas
      if (startOffset >= endOffset || !node.data.slice(startOffset, endOffset).trim()) continue;
      const range = document.createRange();
      range.setStart(node, startOffset);
      range.setEnd(node, endOffset);
      const mark = document.createElement("mark");
      mark.className = "annot";
      mark.dataset.note = note.id;
      range.surroundContents(mark);
      marks.push(mark);
    }
    Object.assign(marks[0] ?? {}, {
      id: `note-${note.id}`,
      tabIndex: 0,
      title: "Modifier la note",
    });
    marks[0]?.setAttribute("role", "button");
    return marks;
  }

  // La note s'affiche sous le paragraphe, l'élément de liste, le tableau ou le bloc de code du passage
  function place(card, mark) {
    const block =
      mark.closest(".code-block, table") ??
      mark.closest("pre, li, p, h2, h3, h4, blockquote, dd") ??
      mark;
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
      <div class="note-actions cluster">
        <button type="button" class="button" data-save>Enregistrer</button>
        <button type="button" class="note-link" data-remove>Retirer le surlignage</button>
      </div>`;
      const textarea = card.querySelector("textarea");
      textarea.value = note.text;
      textarea.focus();
    } else {
      card.innerHTML = `<p></p>
      <div class="note-actions cluster">
        <button type="button" class="note-link" data-edit>Modifier</button>
        <button type="button" class="note-link" data-remove>Supprimer</button>
      </div>`;
      card.firstElementChild.textContent = note.text;
    }
  }

  const findNote = (id) => load("notes").find((note) => note.id === id);
  // change : champs à modifier, ou null pour supprimer la note
  const setNote = (id, change) => {
    save(
      "notes",
      load("notes").flatMap((note) =>
        note.id !== id ? [note] : change ? [{ ...note, ...change }] : [],
      ),
    );
    renderPocket();
  };

  function removeNote(id) {
    for (const mark of content.querySelectorAll(`mark[data-note="${id}"]`)) {
      const parent = mark.parentNode;
      mark.replaceWith(...mark.childNodes);
      parent.normalize();
    }
    content.querySelector(`.note-card[data-note="${id}"]`)?.remove();
    setNote(id, null);
  }

  // Notes de la page : chaque passage est cherché dans le texte actuel.
  // Introuvable (chapitre réécrit) : la note est détachée et reste dans la Pochette
  const notes = load("notes");
  for (const note of notes.filter((note) => note.page === page)) {
    const index = textIndex();
    const start = locate(index.text, note);
    note.detached = start < 0;
    if (start < 0) continue;
    wrap(note, index, start, start + note.quote.length);
    showCard(note);
  }
  save("notes", notes);
  // Lien "voir dans la page" de la Pochette : la note n'existait pas encore au chargement
  if (location.hash.startsWith("#note-"))
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "center" });

  // Bouton Annoter sous la sélection
  const tool = document.createElement("button");
  tool.type = "button";
  tool.className = "button annot-tool";
  tool.hidden = true;
  tool.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>Annoter`;
  document.body.append(tool);
  // Le clic ne doit pas effacer la sélection avant d'être traité
  tool.addEventListener("pointerdown", (event) => event.preventDefault());

  document.addEventListener("selectionchange", () => {
    const selection = getSelection();
    const range = selection.rangeCount ? selection.getRangeAt(0) : null;
    const ancestor = range?.commonAncestorContainer;
    const element = ancestor?.nodeType === Node.TEXT_NODE ? ancestor.parentElement : ancestor;
    tool.hidden =
      !range ||
      range.collapsed ||
      !content.contains(element) ||
      !!element.closest(SKIP) ||
      selection.toString().trim().length < 2;
    if (tool.hidden) return;
    const rect = range.getBoundingClientRect();
    const maxLeft = document.documentElement.clientWidth - tool.offsetWidth - 8;
    tool.style.top = `${rect.bottom + scrollY + 8}px`;
    tool.style.left = `${Math.max(8, Math.min(rect.left + rect.width / 2 - tool.offsetWidth / 2, maxLeft)) + scrollX}px`;
  });

  tool.addEventListener("click", () => {
    const selection = getSelection();
    const index = textIndex();
    const selectionOffsets = selection.rangeCount && offsets(selection.getRangeAt(0), index);
    if (!selectionOffsets) return;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const note = {
      id,
      page,
      title,
      course,
      ...describe(index.text, ...selectionOffsets),
      text: "",
      at: Date.now(),
    };
    save("notes", [...load("notes"), note]);
    renderPocket();
    selection.removeAllRanges();
    tool.hidden = true;
    wrap(note, index, ...selectionOffsets);
    showCard(note, true);
  });

  const edit = (id) => showCard(findNote(id), true);
  const commit = (card) => {
    const id = card.dataset.note;
    setNote(id, { text: card.querySelector("textarea").value.trim() });
    showCard(findNote(id));
    document.getElementById(`note-${id}`)?.focus();
  };
  content.addEventListener("click", (event) => {
    const card = event.target.closest(".note-card");
    const mark = event.target.closest("mark.annot");
    if (mark && getSelection().isCollapsed) edit(mark.dataset.note);
    if (!card) return;
    if (event.target.closest("[data-save]")) commit(card);
    if (event.target.closest("[data-edit]")) edit(card.dataset.note);
    if (event.target.closest("[data-remove]")) removeNote(card.dataset.note);
  });
  content.addEventListener("keydown", (event) => {
    const mark = event.target.closest?.("mark.annot");
    if (mark && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      edit(mark.dataset.note);
    }
    const card = event.target.closest?.(".note-card");
    if (!card || event.target.tagName !== "TEXTAREA") return;
    // Cmd/Ctrl + Entrée enregistre, Échap annule la saisie
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) commit(card);
    if (event.key === "Escape") {
      showCard(findNote(card.dataset.note));
      document.getElementById(`note-${card.dataset.note}`)?.focus();
    }
  });
}
