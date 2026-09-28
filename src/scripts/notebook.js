import { load, save, where, plural } from "../lib/notebook.mjs";
import { pageUrl } from "../lib/urls";
import { initAnnotations } from "./annotations.js";

const content = document.getElementById("contenu");
const page = content?.dataset.page;
const title = content?.querySelector("h1")?.textContent.trim() || document.title;
const course = document.querySelector(".where-course")?.textContent.trim() ?? "";
const rail = document.querySelector(".ribbons");

function renderRail(ribbons) {
  rail.replaceChildren(
    ...ribbons.map((ribbon) => {
      const link = document.createElement("a");
      link.className = "ribbon";
      link.dataset.slot = ribbon.slot;
      if (ribbon.page === page) link.dataset.here = "";
      link.href = pageUrl(ribbon.page, ribbon.slug);
      link.setAttribute("aria-label", `Ruban : ${where(ribbon)}`);
      link.innerHTML =
        '<span class="ribbon-band"></span><span class="ribbon-label" aria-hidden="true"></span>';
      link.lastChild.textContent = where(ribbon);
      return link;
    }),
  );
}

function renderPocket() {
  const ribbons = load("ribbons").sort((a, b) => a.slot - b.slot);
  const noteCount = load("notes").length;
  const counts = [
    ribbons.length && plural(ribbons.length, "ruban"),
    noteCount && plural(noteCount, "note"),
  ].filter(Boolean);
  for (const card of document.querySelectorAll(".pocket-card")) {
    const count = card.querySelector("[data-pocket-count]");
    count.dataset.empty ??= count.textContent;
    count.textContent = counts.join(", ") || count.dataset.empty;
    card
      .querySelector("[data-pocket-slips]")
      .replaceChildren(
        ...Array.from({ length: Math.min(ribbons.length + noteCount, 5) }, () =>
          document.createElement("i"),
        ),
      );
    card.querySelector("[data-pocket-peek]")?.replaceChildren(
      ...ribbons.map((ribbon) => {
        const item = document.createElement("li");
        item.dataset.slot = ribbon.slot;
        item.append(Object.assign(document.createElement("span"), { textContent: where(ribbon) }));
        return item;
      }),
    );
  }
}

function renderRibbonButtons(ribbons) {
  for (const button of document.querySelectorAll("[data-ribbon]")) {
    const ribbon = ribbons.find(
      (entry) => entry.page === page && entry.slug === button.dataset.ribbon,
    );
    button.setAttribute("aria-pressed", String(!!ribbon));
    if (ribbon) button.dataset.slot = ribbon.slot;
    else delete button.dataset.slot;
    button.title = ribbon
      ? "Retirer le ruban"
      : "Poser un ruban sur cette section" +
        (ribbons.length >= 3 ? ". Le plus ancien des trois est déplacé ici" : "");
  }
  for (const heading of content.querySelectorAll(":scope > [data-slot]"))
    delete heading.dataset.slot;
  for (const ribbon of ribbons) {
    if (ribbon.page === page && ribbon.slug)
      document.getElementById(ribbon.slug)?.setAttribute("data-slot", ribbon.slot);
  }
}

export function renderNotebook() {
  const ribbons = load("ribbons").sort((a, b) => a.slot - b.slot);
  if (rail) renderRail(ribbons);
  if (page) renderRibbonButtons(ribbons);
  renderPocket();
}

function toggleRibbon(slug) {
  let ribbons = load("ribbons");
  const existing = ribbons.findIndex((ribbon) => ribbon.page === page && ribbon.slug === slug);
  if (existing >= 0) ribbons.splice(existing, 1);
  else {
    // Move the oldest ribbon when all three slots are occupied.
    if (ribbons.length >= 3) ribbons = ribbons.sort((a, b) => a.at - b.at).slice(1);
    const slot = [0, 1, 2].find((slot) => !ribbons.some((ribbon) => ribbon.slot === slot));
    const heading = document.getElementById(slug);
    const section = heading?.tagName === "H2" ? heading.textContent.trim() : "";
    ribbons.push({ slot, page, slug, section, title, at: Date.now() });
  }
  save("ribbons", ribbons);
  renderNotebook();
}

export function initNotebook() {
  // The mobile heading buttons use the same data and delegated handler as the table of contents.
  for (const button of document.querySelectorAll(".toc-inline [data-ribbon]")) {
    const copy = button.cloneNode();
    copy.className = "heading-ribbon";
    document.getElementById(button.dataset.ribbon)?.append(copy);
  }
  renderNotebook();
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ribbon]");
    if (button && page) toggleRibbon(button.dataset.ribbon);
  });
  initAnnotations({
    content,
    page,
    title,
    course,
    hidden: "notesHidden" in document.documentElement.dataset,
    renderPocket,
  });
}
