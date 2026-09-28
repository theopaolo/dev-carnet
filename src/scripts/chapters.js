// Chapitres sur téléphone : la barre latérale est copiée dans un dialog au premier clic.
// Sans JS, le lien descend à la barre latérale en bas de page.
const chapters = document.querySelector("dialog.chapters");
document.querySelector(".chapters-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (!chapters.querySelector(".sidebar")) {
    const nav = document.querySelector(".sidebar").cloneNode(true);
    nav.removeAttribute("id");
    chapters.append(nav);
  }
  chapters.showModal();
  chapters.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "center" });
});

// Barre latérale : l'entrée de la page affichée est visible sans avoir à la chercher
const nav = document.querySelector(".shell > .sidebar");
const here = nav?.querySelector('[aria-current="page"]');
if (here && here.offsetTop + here.offsetHeight > nav.clientHeight) {
  nav.scrollTop = here.offsetTop - nav.clientHeight / 3;
}
chapters.querySelector("[data-close]").addEventListener("click", () => chapters.close());
// Clic sur le fond, hors du contenu du dialog
chapters.addEventListener("click", (e) => {
  if (e.target === chapters) chapters.close();
});
