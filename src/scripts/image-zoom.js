// Zoom plein écran des images du contenu, avec le même dialogue que les diagrammes Mermaid
const zoom = document.createElement("dialog");
zoom.className = "zoom";
zoom.innerHTML =
  '<button type="button" class="button zoom-close">Fermer</button><div class="zoom-body"></div>';
document.body.append(zoom);
// Un clic ferme, sauf sur l'image au téléphone : elle s'y parcourt au doigt
zoom.addEventListener("click", (event) => {
  if (!event.target.closest(".zoom-body img") || !matchMedia("(max-width: 760px)").matches)
    zoom.close();
});

document.querySelectorAll(".content img").forEach((img) => {
  if (img.closest("a, button")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "image-zoom";
  button.setAttribute("aria-label", `Agrandir l'image : ${img.alt}`);
  img.replaceWith(button);
  button.append(img);
  button.addEventListener("click", () => {
    const copy = img.cloneNode();
    copy.loading = "eager";
    zoom.setAttribute("aria-label", img.alt || "Image agrandie");
    zoom.querySelector(".zoom-body").replaceChildren(copy);
    zoom.showModal();
  });
});
