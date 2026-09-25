// Confort de lecture : taille du texte (A- / A+), bouton Copier sur les blocs de code, liens de section.

// Taille : html[data-size] de -1 à 3, appliquée avant le rendu par le script en tête de Lesson.astro
const MIN = -1;
const MAX = 3;
const root = document.documentElement;
const smaller = document.querySelector('[data-size-step="-1"]');
const bigger = document.querySelector('[data-size-step="1"]');

function setSize(n) {
  if (n === 0) delete root.dataset.size;
  else root.dataset.size = n;
  try {
    localStorage.setItem("textSize", n);
  } catch {}
  smaller.disabled = n <= MIN;
  bigger.disabled = n >= MAX;
}

const current = () => Number(root.dataset.size ?? 0);
if (smaller && bigger) {
  setSize(current());
  smaller.addEventListener("click", () => setSize(Math.max(MIN, current() - 1)));
  bigger.addEventListener("click", () => setSize(Math.min(MAX, current() + 1)));
}

// Copier : chaque bloc Shiki est enveloppé pour que le bouton ne défile pas avec le code
for (const pre of document.querySelectorAll(".content pre.astro-code")) {
  const wrap = document.createElement("div");
  wrap.className = "code-block";
  pre.replaceWith(wrap);
  wrap.append(pre);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-btn";
  btn.textContent = "Copier";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ""));
      btn.textContent = "Copié";
    } catch {
      // Presse-papiers refusé (contexte non sécurisé) : sélectionner le code, copie au clavier
      getSelection().selectAllChildren(pre);
      btn.textContent = "Sélectionné";
    }
    setTimeout(() => (btn.textContent = "Copier"), 1800);
  });
  wrap.append(btn);
}

// Titres de section : le titre devient un lien vers sa section, et le clic copie l'adresse
// à envoyer aux élèves. Le lien enveloppe le texte : un lecteur d'écran lit le titre, sans « # »
for (const h of document.querySelectorAll(".content > h2[id], .content > h3[id]")) {
  if (h.querySelector("a")) continue;
  const a = document.createElement("a");
  a.className = "heading-link";
  a.href = `#${h.id}`;
  a.append(...h.childNodes);
  h.append(a);
  a.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(a.href);
      a.dataset.copied = "";
      setTimeout(() => delete a.dataset.copied, 1800);
    } catch {}
  });
}
