// Recherche dans les cours : <dialog class="search"> de Lesson.astro, index /search.json.
// ponytail: tous les mots doivent apparaître, pas de racinisation ni de tolérance aux fautes.
// Passer à Pagefind si le corpus dépasse quelques dizaines de pages.

const dialog = document.querySelector("dialog.search");
const input = dialog?.querySelector("input");
const list = dialog?.querySelector(".search-results");
const status = dialog?.querySelector(".search-status");
let index = null;

// Sans accents ni majuscules. Même longueur que le texte d'origine (NFC),
// donc les positions trouvées servent aussi pour le texte affiché
const norm = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function load() {
  if (index) return;
  const res = await fetch(dialog.dataset.index);
  index = (await res.json()).map((e) => ({ ...e, n: norm(`${e.page} ${e.section}`), t: norm(e.text) }));
}

function mark(text, words) {
  const n = norm(text);
  const ranges = [];
  for (const w of words) for (let i = n.indexOf(w); i !== -1; i = n.indexOf(w, i + w.length)) ranges.push([i, i + w.length]);
  ranges.sort((a, b) => a[0] - b[0]);
  let html = "";
  let at = 0;
  for (const [a, b] of ranges) {
    if (a < at) continue;
    html += esc(text.slice(at, a)) + `<mark>${esc(text.slice(a, b))}</mark>`;
    at = b;
  }
  return html + esc(text.slice(at));
}

function snippet(e, words) {
  const found = words.map((w) => e.t.indexOf(w)).filter((i) => i >= 0);
  const i = found.length ? Math.min(...found) : 0;
  const start = Math.max(0, e.text.lastIndexOf(" ", Math.max(0, i - 60)) + 1);
  const cut = e.text.slice(start, start + 180);
  return (start > 0 ? "… " : "") + mark(cut, words) + (start + 180 < e.text.length ? " …" : "");
}

function run() {
  const words = norm(input.value).split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) {
    list.innerHTML = "";
    status.textContent = "";
    return;
  }
  const hits = index
    .filter((e) => words.every((w) => e.n.includes(w) || e.t.includes(w)))
    .map((e) => ({ e, score: words.reduce((s, w) => s + (e.n.includes(w) ? 10 : 0) + e.t.split(w).length - 1, 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  status.textContent = hits.length ? `${hits.length === 12 ? "12 premiers" : hits.length} résultats` : "Aucun résultat";
  list.innerHTML = hits
    .map(
      ({ e }) => `<li><a href="${esc(e.url)}">
        <span class="search-page">${mark(e.page, words)}</span>
        ${e.section ? `<span class="search-section">${mark(e.section, words)}</span>` : ""}
        <span class="search-snippet">${snippet(e, words)}</span></a></li>`,
    )
    .join("");
}

function open() {
  dialog.showModal();
  input.select();
  load().then(run);
}

if (dialog) {
  document.querySelector(".search-open")?.addEventListener("click", open);
  document.addEventListener("keydown", (e) => {
    // « / » seul : seulement quand le focus est sur la page, pas sur un lien ou un champ (WCAG 2.1.4)
    const onPage = [document.body, document.getElementById("contenu"), null].includes(document.activeElement);
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && onPage && !dialog.open)) {
      e.preventDefault();
      open();
    }
  });
  input.addEventListener("input", () => index && run());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") list.querySelector("a")?.click();
    if (e.key === "ArrowDown") (e.preventDefault(), list.querySelector("a")?.focus());
  });
  list.addEventListener("keydown", (e) => {
    const links = [...list.querySelectorAll("a")];
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") (e.preventDefault(), links[i + 1]?.focus());
    if (e.key === "ArrowUp") (e.preventDefault(), (links[i - 1] ?? input).focus());
  });
  // Un lien vers la page courante ne recharge pas : fermer la fenêtre
  list.addEventListener("click", (e) => e.target.closest("a") && dialog.close());
  dialog.addEventListener("click", (e) => e.target === dialog && dialog.close());
}
