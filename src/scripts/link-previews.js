import { base } from "../lib/urls";
import "../styles/link-previews.css";

const preview = document.createElement("div");
preview.id = "link-preview";
preview.className = "link-preview";
preview.role = "tooltip";
preview.hidden = true;
preview.innerHTML = "<strong></strong><p></p><small></small>";
document.body.append(preview);
const [title, description, address] = preview.children;
let active;
let timer;
let index;
let pinned = false;

const definitions = new Map();
const termKey = (text) => text.trim().toLocaleLowerCase("fr").replaceAll("’", "'");
for (const definition of document.querySelectorAll("[data-glossary-terms]")) {
  for (const term of JSON.parse(definition.dataset.glossaryTerms)) {
    definitions.set(termKey(term), definition);
  }
}
for (const term of document.querySelectorAll(".content strong, .content code")) {
  if (
    term.closest("a, button, pre, nav, h1, h2, h3, h4, h5, h6, .diagram") ||
    term.querySelector("a, button")
  )
    continue;
  const key = termKey(term.textContent);
  const definition = definitions.get(key);
  if (!definition) continue;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "glossary-term";
  button.setAttribute("aria-label", `${term.textContent.trim()} : définition`);
  button.setAttribute("aria-describedby", definition.id);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", preview.id);
  button.dataset.definition = definition.id;
  button.append(...term.childNodes);
  term.append(button);
  definitions.delete(key);
}

function close() {
  clearTimeout(timer);
  if (active) {
    if (active.matches(".glossary-term")) active.setAttribute("aria-expanded", "false");
    const ids = (active.getAttribute("aria-describedby") || "")
      .split(" ")
      .filter((id) => id && id !== preview.id);
    if (ids.length) active.setAttribute("aria-describedby", ids.join(" "));
    else active.removeAttribute("aria-describedby");
  }
  active = null;
  pinned = false;
  preview.hidden = true;
}

function position() {
  const rect = active.getBoundingClientRect();
  const { width, height } = preview.getBoundingClientRect();
  preview.style.left = `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`;
  const below = rect.bottom + 8;
  preview.style.top = `${Math.max(12, below + height <= innerHeight - 12 ? below : rect.top - height - 8)}px`;
}

async function show(link, url) {
  active = link;
  if (link.dataset.definition) {
    title.textContent = link.textContent;
    description.textContent = document.getElementById(link.dataset.definition).textContent.trim();
    address.textContent = "Définition du lexique";
    link.setAttribute("aria-expanded", "true");
    preview.hidden = false;
    position();
    return;
  }
  title.textContent = link.textContent.trim() || url.hostname;
  description.textContent = "Chargement de l’aperçu…";
  address.textContent = url.origin === location.origin ? "Carnet" : url.hostname;
  preview.hidden = false;
  link.setAttribute(
    "aria-describedby",
    [link.getAttribute("aria-describedby"), preview.id].filter(Boolean).join(" "),
  );
  position();
  index ??= fetch(`${base}/link-previews.json`, { signal: AbortSignal.timeout(5000) })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .catch(() => {
      index = null;
      return {};
    });
  const entries = await index;
  if (active !== link) return;
  url.hash = "";
  const entry =
    entries[url.origin === location.origin ? `${url.pathname.replace(/\/$/, "")}/` : url.href];
  title.textContent = entry?.title || title.textContent;
  description.textContent = entry?.description || "Aucun résumé disponible pour cette page.";
  address.textContent =
    url.origin === location.origin ? "Carnet" : url.href.replace(/^https?:\/\//, "");
  position();
}

function schedule(link, url) {
  clearTimeout(timer);
  if (active === link) return;
  close();
  timer = setTimeout(() => show(link, url), 350);
}

function leave() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (pinned || active?.matches(":focus-visible, :hover") || preview.matches(":hover")) return;
    close();
  }, 200);
}

for (const button of document.querySelectorAll(".glossary-term")) {
  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") schedule(button);
  });
  button.addEventListener("pointerleave", leave);
  button.addEventListener("focus", () => {
    if (button.matches(":focus-visible")) {
      close();
      show(button);
    }
  });
  button.addEventListener("blur", () => {
    pinned = false;
    leave();
  });
  button.addEventListener("click", () => {
    const wasPinned = active === button && pinned;
    close();
    if (!wasPinned) {
      show(button);
      pinned = true;
    }
  });
}

for (const link of document.querySelectorAll(".content a[href]")) {
  if (
    link.closest("nav, .toc, .pager") ||
    link.matches("[download], .heading-link") ||
    link.querySelector("img")
  )
    continue;
  const url = new URL(link.href);
  if (
    !/^https?:$/.test(url.protocol) ||
    (url.origin === location.origin && url.pathname === location.pathname) ||
    /\.(?:pdf|zip|png|jpe?g|svg|gif|webp|mp[34])$/i.test(url.pathname)
  )
    continue;
  link.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") schedule(link, url);
  });
  link.addEventListener("pointerleave", leave);
  link.addEventListener("focus", () => {
    if (link.matches(":focus-visible")) schedule(link, url);
  });
  link.addEventListener("blur", leave);
  link.addEventListener("click", close);
}

preview.addEventListener("pointerenter", () => clearTimeout(timer));
preview.addEventListener("pointerleave", leave);
document.addEventListener("pointerdown", (event) => {
  if (!active?.contains(event.target) && !preview.contains(event.target)) close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") close();
});
document.addEventListener(
  "scroll",
  (event) => {
    if (!active || preview.contains(event.target)) return;
    const rect = active.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= innerHeight) close();
    else position();
  },
  true,
);
window.addEventListener("resize", close);
