(() => {
  const read = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const saved = read("theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const size = Number(read("textSize"));
  if (Number.isInteger(size) && size >= -1 && size <= 3 && size !== 0)
    document.documentElement.dataset.size = size;
  // Rubans et notes masqués depuis la Pochette (src/scripts/notebook.js)
  if (read("notesHidden")) document.documentElement.dataset.notesHidden = "";
  // Focus : pour la séance en cours seulement (sessionStorage)
  try {
    if (sessionStorage.getItem("present") === "1") document.documentElement.dataset.present = "";
  } catch {}
})();
