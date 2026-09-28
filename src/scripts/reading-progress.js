// Reprendre : la dernière page lue et sa section, relues par le lien de l'accueil.
// Rien ne quitte le navigateur
const pageId = document.getElementById("contenu").dataset.page;
const remember = (section) => {
  if (!pageId) return;
  try {
    localStorage.setItem("resume", JSON.stringify({ id: pageId, ...section }));
  } catch {}
};
remember();

// Surligne l'entrée du sommaire dont le titre est à l'écran
const toc = document.querySelector(".toc");
const links = new Map(
  [...document.querySelectorAll(".toc a")].map((link) => [
    link.getAttribute("href").slice(1),
    link,
  ]),
);
const setActive = (id) => {
  const link = links.get(id);
  if (!link || link.classList.contains("active")) return;
  links.forEach((link) => link.classList.remove("active"));
  link.classList.add("active");
  // Le titre de la page (depth-1) ramène en haut : pas de section à retenir
  remember(
    link.parentElement.classList.contains("depth-2")
      ? { slug: id, section: link.textContent }
      : undefined,
  );
  // Un long sommaire défile dans sa colonne : l'entrée active reste visible
  if (
    link.offsetTop < toc.scrollTop ||
    link.offsetTop + link.offsetHeight > toc.scrollTop + toc.clientHeight
  ) {
    toc.scrollTop = link.offsetTop - toc.clientHeight / 2;
  }
};
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
  },
  { rootMargin: "0px 0px -70% 0px" },
);
links.forEach((_, id) => {
  const heading = document.getElementById(id);
  if (heading) observer.observe(heading);
});
// Les derniers titres n'atteignent jamais le haut de l'écran : en bas de page, la dernière entrée
const lastId = [...links.keys()].at(-1);
addEventListener(
  "scroll",
  () => {
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) setActive(lastId);
  },
  { passive: true },
);
