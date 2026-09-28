const hasStrings = (value, keys) => keys.every((key) => typeof value?.[key] === "string");
const validPage = (page) => /^[\p{L}\p{N}_-]+(?:\/[\p{L}\p{N}_-]+)*$/u.test(page);
const optionalString = (value, key) => value[key] === undefined || typeof value[key] === "string";

export function isNote(note) {
  return (
    hasStrings(note, ["id", "page", "title", "quote", "text"]) &&
    /^[a-zA-Z0-9_-]+$/.test(note.id) &&
    validPage(note.page) &&
    note.quote.length > 0 &&
    ["prefix", "suffix", "course"].every((key) => optionalString(note, key))
  );
}

export function isRibbon(ribbon) {
  return (
    hasStrings(ribbon, ["page", "slug", "title"]) &&
    validPage(ribbon.page) &&
    optionalString(ribbon, "section")
  );
}

export function load(key) {
  try {
    const entries = JSON.parse(localStorage.getItem(key));
    if (!Array.isArray(entries)) return [];
    const valid = key === "notes" ? isNote : isRibbon;
    return entries.filter(valid);
  } catch {
    return [];
  }
}

export function save(key, entries) {
  try {
    localStorage.setItem(key, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export const where = (entry) => (entry.section ? `${entry.title}, ${entry.section}` : entry.title);
export const plural = (count, word) => `${count} ${word}${count > 1 ? "s" : ""}`;
const timestamp = (entry) => (Number.isFinite(entry.at) ? entry.at : 0);

export function byPage(notes) {
  const groups = new Map();
  for (const note of [...notes].sort((a, b) => timestamp(a) - timestamp(b))) {
    if (!groups.has(note.page)) groups.set(note.page, []);
    groups.get(note.page).push(note);
  }
  return [...groups.values()];
}

export function mergeNotebook(current, incoming) {
  if (!Array.isArray(incoming?.notes) || !Array.isArray(incoming?.ribbons)) {
    throw new Error("Invalid notebook export");
  }
  const notes = new Map(
    [...current.notes, ...incoming.notes.filter(isNote)].map((note) => [note.id, note]),
  );
  const ribbons = [...current.ribbons, ...incoming.ribbons.filter(isRibbon)]
    .sort((a, b) => timestamp(b) - timestamp(a))
    .filter(
      (ribbon, index, all) =>
        all.findIndex((other) => other.page === ribbon.page && other.slug === ribbon.slug) ===
        index,
    )
    .slice(0, 3)
    .map((ribbon, slot) => ({ ...ribbon, slot }));
  return { notes: [...notes.values()], ribbons };
}

export function importNotebook(markdown, current) {
  const match = markdown.match(/<!-- carnet (.*?) -->/s);
  if (!match) throw new Error("Missing notebook data");
  return mergeNotebook(current, JSON.parse(match[1]));
}

export function exportNotebook({ ribbons, notes }, url, date = new Date()) {
  const markdown = [
    "# Pochette Carnet",
    "",
    `Exportée le ${date.toLocaleDateString("fr-FR")}.`,
    "",
  ];
  if (ribbons.length) {
    markdown.push(
      "## Rubans",
      "",
      ...ribbons.map((ribbon) => `- [${where(ribbon)}](${url(ribbon.page, ribbon.slug)})`),
      "",
    );
  }
  if (notes.length) markdown.push("## Notes", "");
  for (const group of byPage(notes)) {
    markdown.push(`### [${group[0].title}](${url(group[0].page)})`, "");
    for (const note of group) {
      markdown.push(...note.quote.split("\n").map((line) => `> ${line}`), "");
      if (note.text) markdown.push(note.text, "");
      if (note.detached) markdown.push("_Note détachée : ce passage n'est plus dans la page._", "");
    }
  }
  // Escape comment delimiters without changing the data restored on import.
  markdown.push(
    `<!-- carnet ${JSON.stringify({ ribbons, notes }).replace(/--/g, "-\\u002d")} -->`,
    "",
  );
  return markdown.join("\n");
}
