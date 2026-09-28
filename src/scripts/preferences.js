const root = document.documentElement;
document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  document.dispatchEvent(new Event("themechange"));
});

// Focus : une colonne, sans barre latérale ni sommaire, pour lire ou projeter. Mémorisé d'un chapitre à l'autre
const present = document.querySelector("[data-present-toggle]");

present.setAttribute("aria-pressed", String("present" in root.dataset));
present.addEventListener("click", () => {
  const on = !("present" in root.dataset);
  if (on) root.dataset.present = "";
  else delete root.dataset.present;
  present.setAttribute("aria-pressed", String(on));
  try {
    sessionStorage.setItem("present", on ? "1" : "0");
    localStorage.removeItem("present"); // ancienne mémorisation durable
  } catch {}
});

const MIN = -1;
const MAX = 3;
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
