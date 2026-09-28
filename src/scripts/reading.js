// Copier : chaque bloc Shiki est enveloppé pour que le bouton ne défile pas avec le code
for (const code of document.querySelectorAll(".content pre.astro-code")) {
  const wrapper = document.createElement("div");
  wrapper.className = "code-block";
  code.replaceWith(wrapper);
  wrapper.append(code);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-btn";
  button.textContent = "Copier";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""));
      button.textContent = "Copié";
    } catch {
      // Presse-papiers refusé (contexte non sécurisé) : sélectionner le code, copie au clavier
      getSelection().selectAllChildren(code);
      button.textContent = "Sélectionné";
    }
    setTimeout(() => (button.textContent = "Copier"), 1800);
  });
  wrapper.append(button);
}

// Titres de section : le titre devient un lien vers sa section, et le clic copie l'adresse
// à envoyer aux élèves. Le lien enveloppe le texte : un lecteur d'écran lit le titre, sans « # »
for (const heading of document.querySelectorAll(".content > h2[id], .content > h3[id]")) {
  if (heading.querySelector("a")) continue;
  const link = document.createElement("a");
  link.className = "heading-link";
  link.href = `#${heading.id}`;
  // Le bouton Ruban du titre (notebook.js, parfois exécuté avant) reste hors du lien
  link.append(...[...heading.childNodes].filter((node) => node.nodeName !== "BUTTON"));
  heading.prepend(link);
  link.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(link.href);
      link.dataset.copied = "";
      setTimeout(() => delete link.dataset.copied, 1800);
    } catch {}
  });
}
