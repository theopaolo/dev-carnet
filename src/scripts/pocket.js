import {
  load,
  save,
  where,
  plural,
  byPage,
  exportNotebook,
  importNotebook,
} from "../lib/notebook.mjs";
import { pageUrl } from "../lib/urls";
import { escapeHtml as escapeHtml } from "../lib/html.mjs";
import { renderNotebook } from "./notebook.js";

const status = document.querySelector(".pocket-status");

function renderNotes(notes, linked) {
  return byPage(notes)
    .map(
      (group) => `<article class="pocket-page">
        <h3><a href="${escapeHtml(pageUrl(group[0].page))}">${escapeHtml(group[0].title)}</a>
          ${group[0].course && group[0].course !== group[0].title ? `<span>${escapeHtml(group[0].course)}</span>` : ""}</h3>
        ${group
          .map(
            (note) => `<div class="pocket-note">
              <blockquote>${linked ? `<a href="${escapeHtml(pageUrl(note.page, `note-${note.id}`))}">${escapeHtml(note.quote)}</a>` : escapeHtml(note.quote)}</blockquote>
              ${note.text ? `<p>${escapeHtml(note.text)}</p>` : ""}
              <button type="button" class="note-link" data-remove-note="${escapeHtml(note.id)}">Supprimer</button>
            </div>`,
          )
          .join("")}
      </article>`,
    )
    .join("");
}

function render() {
  const ribbons = load("ribbons").sort((link, b) => link.slot - b.slot);
  const notes = load("notes");
  const attached = notes.filter((note) => !note.detached);
  const detached = notes.filter((note) => note.detached);
  document.querySelector(".pocket-ribbons").innerHTML = ribbons
    .map(
      (
        ribbon,
      ) => `<li><span class="ribbon-band" data-slot="${ribbon.slot}" aria-hidden="true"></span>
        <a href="${escapeHtml(pageUrl(ribbon.page, ribbon.slug))}">${escapeHtml(where(ribbon))}</a>
        <button type="button" class="note-link" data-remove-ribbon="${ribbon.slot}">Retirer</button></li>`,
    )
    .join("");
  document.querySelector(".pocket-notes").innerHTML = renderNotes(attached, true);
  document.querySelector(".pocket-detached").innerHTML = renderNotes(detached, false);
  document.querySelector("[data-detached]").hidden = !detached.length;
  document.querySelector('[data-empty="ribbons"]').hidden = ribbons.length > 0;
  document.querySelector('[data-empty="notes"]').hidden = attached.length > 0;
  renderNotebook();
}

document.querySelector(".pocket").addEventListener("click", (event) => {
  const ribbon = event.target.closest("[data-remove-ribbon]")?.dataset.removeRibbon;
  const note = event.target.closest("[data-remove-note]")?.dataset.removeNote;
  if (ribbon)
    save(
      "ribbons",
      load("ribbons").filter((ribbon) => String(ribbon.slot) !== ribbon),
    );
  if (note)
    save(
      "notes",
      load("notes").filter((note) => note.id !== note),
    );
  if (ribbon || note) render();
});

// Export : Markdown lisible, et les données brutes en commentaire pour le réimport
document.querySelector("[data-export]").addEventListener("click", () => {
  const ribbons = load("ribbons").sort((link, b) => link.slot - b.slot);
  const notes = load("notes");
  const url = (page, hash) => location.origin + pageUrl(page, hash);
  const markdown = exportNotebook({ ribbons, notes }, url);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([markdown], { type: "text/markdown" }));
  link.download = `pochette-carnet-${new Date().toISOString().slice(0, 10)}.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});

// Import : notes fusionnées par identifiant, les trois rubans les plus récents
const file = document.querySelector('input[type="file"]');
document.querySelector("[data-import]").addEventListener("click", () => file.click());
file.addEventListener("change", async () => {
  if (!file.files?.length) return;
  try {
    const current = { notes: load("notes"), ribbons: load("ribbons") };
    const { notes, ribbons } = importNotebook(await file.files[0].text(), current);
    const notesSaved = save("notes", notes);
    const ribbonsSaved = save("ribbons", ribbons);
    status.textContent =
      notesSaved && ribbonsSaved
        ? `Import terminé : ${plural(notes.length, "note")} et ${plural(ribbons.length, "ruban")} dans la Pochette.`
        : "Le navigateur n'a pas pu enregistrer l'import. Gardez votre fichier de sauvegarde.";
    render();
  } catch {
    status.textContent = "Ce fichier n'est pas un export de la Pochette.";
  }
  file.value = "";
});

const show = document.querySelector("[data-show]");
show.checked = !("notesHidden" in document.documentElement.dataset);
show.addEventListener("change", () => {
  try {
    if (show.checked) localStorage.removeItem("notesHidden");
    else localStorage.setItem("notesHidden", "1");
  } catch {}
  if (show.checked) delete document.documentElement.dataset.notesHidden;
  else document.documentElement.dataset.notesHidden = "";
});

render();
