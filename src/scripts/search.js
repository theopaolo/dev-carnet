import { escapeHtml } from "../lib/html.mjs";
import { prepareIndex, searchWords, search, highlight, snippet } from "../lib/search.mjs";

const dialog = document.querySelector("dialog.search");
const input = dialog.querySelector("input");
const list = dialog.querySelector(".search-results");
const status = dialog.querySelector(".search-status");
let index;
let loading;

async function loadIndex() {
  if (index) return;
  // Repeated shortcuts share the same request. A failed request can be retried.
  loading ??= fetch(dialog.dataset.index)
    .then((response) => {
      if (!response.ok) throw new Error(`Search index: ${response.status}`);
      return response.json();
    })
    .then((entries) => {
      index = prepareIndex(entries);
    })
    .finally(() => {
      loading = undefined;
    });
  await loading;
}

function renderResults() {
  const words = searchWords(input.value);
  const hits = search(index, words, dialog.dataset.course);
  status.textContent = !words.length
    ? ""
    : hits.length
      ? `${hits.length === 12 ? "12 premiers" : hits.length} résultats`
      : "Aucun résultat";
  list.innerHTML = hits
    .map(
      (entry) => `
    <li><a href="${escapeHtml(entry.url)}">
      <span class="search-page">${highlight(entry.page, words)}</span>
      ${entry.section ? `<span class="search-section">${highlight(entry.section, words)}</span>` : ""}
      <span class="search-snippet">${snippet(entry, words)}</span>
    </a></li>`,
    )
    .join("");
}

async function openSearch() {
  if (!dialog.open) dialog.showModal();
  input.select();
  if (!index) status.textContent = "Chargement…";
  try {
    await loadIndex();
    renderResults();
  } catch {
    status.textContent = "La recherche n'a pas pu charger. Fermez puis rouvrez pour réessayer.";
  }
}

for (const button of document.querySelectorAll(".search-open"))
  button.addEventListener("click", openSearch);
document.addEventListener("keydown", (event) => {
  const onPage = [document.body, document.getElementById("contenu"), null].includes(
    document.activeElement,
  );
  const shortcut = event.key === "k" && (event.metaKey || event.ctrlKey);
  const slash = event.key === "/" && onPage && !event.metaKey && !event.ctrlKey && !event.altKey;
  if (event.defaultPrevented || (!shortcut && !slash)) return;
  event.preventDefault();
  openSearch();
});
input.addEventListener("input", () => {
  if (index) renderResults();
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") list.querySelector("a")?.click();
  if (event.key === "ArrowDown") {
    event.preventDefault();
    list.querySelector("a")?.focus();
  }
});
list.addEventListener("keydown", (event) => {
  const links = [...list.querySelectorAll("a")];
  const current = links.indexOf(document.activeElement);
  if (event.key === "ArrowDown") {
    event.preventDefault();
    links[current + 1]?.focus();
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    (links[current - 1] ?? input).focus();
  }
});
list.addEventListener("click", (event) => {
  if (event.target.closest("a")) dialog.close();
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
