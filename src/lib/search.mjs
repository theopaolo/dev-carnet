import { escapeHtml } from "./html.mjs";

export const normalize = (text) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
export const searchWords = (query) =>
  normalize(query)
    .split(/\s+/)
    .filter((word) => word.length > 1);

export function prepareIndex(entries) {
  return entries.map((entry) => ({
    ...entry,
    heading: normalize(`${entry.page} ${entry.section}`),
    body: normalize(entry.text),
  }));
}

// ponytail: word matching only. Use Pagefind if typo tolerance or corpus size requires it.
export function search(index, words, course) {
  if (!words.length) return [];
  return index
    .filter((entry) =>
      words.every((word) => entry.heading.includes(word) || entry.body.includes(word)),
    )
    .map((entry) => ({
      entry,
      score:
        (course && entry.url.startsWith(course) ? 10 : 0) +
        words.reduce(
          (score, word) =>
            score + (entry.heading.includes(word) ? 10 : 0) + entry.body.split(word).length - 1,
          0,
        ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ entry }) => entry);
}

export function highlight(text, words) {
  const normalized = normalize(text);
  const ranges = [];
  for (const word of words) {
    if (!word) continue;
    for (
      let start = normalized.indexOf(word);
      start !== -1;
      start = normalized.indexOf(word, start + word.length)
    ) {
      ranges.push([start, start + word.length]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  let html = "";
  let position = 0;
  for (const [start, end] of ranges) {
    if (start < position) continue;
    html +=
      escapeHtml(text.slice(position, start)) +
      `<mark>${escapeHtml(text.slice(start, end))}</mark>`;
    position = end;
  }
  return html + escapeHtml(text.slice(position));
}

export function snippet(entry, words) {
  const matches = words.map((word) => entry.body.indexOf(word)).filter((position) => position >= 0);
  const first = matches.length ? Math.min(...matches) : 0;
  const start = Math.max(0, entry.text.lastIndexOf(" ", Math.max(0, first - 60)) + 1);
  const excerpt = entry.text.slice(start, start + 180);
  return (
    (start > 0 ? "… " : "") +
    highlight(excerpt, words) +
    (start + 180 < entry.text.length ? " …" : "")
  );
}
