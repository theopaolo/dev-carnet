import { parse } from "parse5";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { isIP } from "node:net";

function* elements(node) {
  if (node.tagName) yield node;
  for (const child of node.childNodes || []) yield* elements(child);
}

export function readPage(html) {
  const meta = new Map();
  const links = [];
  let title = "";
  for (const node of elements(parse(html))) {
    const attrs = Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
    if (node.tagName === "meta")
      meta.set((attrs.property || attrs.name || "").toLowerCase(), attrs.content);
    if (node.tagName === "title")
      title = node.childNodes.map((child) => child.value || "").join("");
    if (node.tagName === "a" && attrs.href) links.push(attrs.href);
  }
  const clean = (value, length) => (value || "").replace(/\s+/g, " ").trim().slice(0, length);
  return {
    title: clean(meta.get("og:title") || title, 160),
    description: clean(meta.get("og:description") || meta.get("description"), 320),
    links,
  };
}

async function fetchPreview(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(8000),
    headers: {
      "User-Agent": "Carnet-Link-Preview/1.0",
      Accept: "text/html",
      "Accept-Language": "fr,en;q=0.8",
    },
  });
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
    await response.body?.cancel();
    throw new Error(`HTTP ${response.status}`);
  }
  const reader = response.body.getReader();
  let html = "";
  const decoder = new TextDecoder();
  try {
    // ponytail: seul le premier Mo est lu ; augmenter si un site place ses métadonnées plus loin.
    while (html.length < 1_000_000 && !/<\/head\s*>/i.test(html)) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
  } finally {
    await reader.cancel();
  }
  const { title, description } = readPage(html);
  if (!title || /just a moment|access denied|attention required|captcha/i.test(title))
    throw new Error("Page inaccessible");
  return { title, description };
}

if (import.meta.main) {
  // npm run build, puis npm run previews : aucune requête externe pendant la lecture.
  const urls = new Set();
  for (const file of await readdir("dist", { recursive: true })) {
    if (!file.endsWith(".html")) continue;
    for (const href of readPage(await readFile(`dist/${file}`, "utf8")).links) {
      if (!/^https?:\/\//i.test(href)) continue;
      const url = new URL(href);
      if (
        isIP(url.hostname) ||
        !url.hostname.includes(".") ||
        /(?:^|\.)(?:localhost|local|example|test|invalid)$/.test(url.hostname) ||
        url.username ||
        url.password
      )
        continue;
      url.hash = "";
      urls.add(url.href);
    }
  }
  const file = new URL("../src/data/link-previews.json", import.meta.url);
  const previous = JSON.parse(await readFile(file, "utf8"));
  const entries = {};
  const queue = [...urls].sort();
  let updated = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      for (let url; (url = queue.shift());) {
        try {
          entries[url] = await fetchPreview(url);
          updated++;
        } catch {
          if (previous[url]) entries[url] = previous[url];
          console.warn(`Aperçu indisponible : ${url}`);
        }
      }
    }),
  );
  await writeFile(
    file,
    JSON.stringify(Object.fromEntries(Object.entries(entries).sort()), null, 2) + "\n",
  );
  console.log(
    `${updated}/${urls.size} aperçus actualisés, ${Object.keys(entries).length} disponibles.`,
  );
}
