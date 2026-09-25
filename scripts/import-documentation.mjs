// Importe le cours "Documenter son projet web" depuis son dépôt MkDocs.
// Source de vérité : le dépôt d'origine. Relancer après chaque modification :
//   node scripts/import-documentation.mjs
// Fait : copie les chapitres à plat, développe les <!-- inclure: … -->,
// réécrit les liens entre chapitres et vers les fichiers de la démo, copie les visuels.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve, relative, join } from "node:path";

const SRC = "/Users/theogoedert/Documents/Webworks/6-learning-tech/cours-documentation-web";
const DEST = new URL("../src/cours/documentation/", import.meta.url).pathname;
const REPO = "https://github.com/theopaolo/cours-documentation-web/blob/main/";

// [chemin dans le dépôt source, nom du chapitre sur le site, titre court pour la barre latérale]
const PAGES = [
  ["documenter-son-projet-web-atelier-5h.md", "index", "Documenter son projet web"],
  ["cours-documentation/01-pourquoi-documenter.md", "01-pourquoi-documenter", "Pourquoi documenter"],
  ["cours-documentation/02-organiser-les-contenus.md", "02-organiser-les-contenus", "Organiser les contenus"],
  ["cours-documentation/03-ecrire-clairement.md", "03-ecrire-clairement", "Écrire clairement"],
  ["cours-documentation/04-readme-et-guides-pratiques.md", "04-readme-et-guides-pratiques", "README et guides"],
  ["cours-documentation/05-architecture-c4.md", "05-architecture-c4", "Architecture C4"],
  ["cours-documentation/06-donnees-et-merise.md", "06-donnees-et-merise", "Données et Merise"],
  ["cours-documentation/07-decisions-et-code.md", "07-decisions-et-code", "Décisions et code"],
  ["cours-documentation/08-verifier-et-maintenir.md", "08-verifier-et-maintenir", "Vérifier et maintenir"],
  ["cours-documentation/09-documentation-vivante.md", "09-documentation-vivante", "Documentation vivante et BDD"],
  ["demo/README.md", "10-demonstration", "Démonstration JavaScript"],
  ["cours-documentation/exemples.md", "11-exemples", "Exemples et corrigés"],
  ["cours-documentation/documentation-editeur.md", "12-documentation-editeur", "Documentation dans l'éditeur"],
  ["cours-documentation/adr/001-conserver-annulations.md", "13-adr-001", "ADR de la démonstration"],
  ["cours-documentation/outils-et-sources.md", "14-outils-et-sources", "Outils et sources"],
  ["guide-animation.md", "15-guide-animation", "Guide d'animation"],
  ["cours-documentation/visuels/credits.md", "16-credits", "Crédits des visuels"],
];

// Même table que scripts/mkdocs_hook.py dans le dépôt source
const INCLUDES = {
  "demo/editeur/survol.js": "javascript",
  "demo/editeur/capacite.ts": "typescript",
  "demo/src/reservations.mjs": "javascript",
  "demo/features/reservations.feature": "gherkin",
  "demo/features/steps/reservations.mjs": "javascript",
  "demo/tests/reservations.test.mjs": "javascript",
  "cours-documentation/visuels/c4-contexte.mmd": "text",
  "cours-documentation/visuels/reservations.mcd": "text",
  "cours-documentation/visuels/reservations-erd.mmd": "text",
  "cours-documentation/visuels/adr-annulation.mmd": "text",
  "scripts/mkdocs_hook.py": "python",
};

// Pages réservées à l'enseignant : `hidden: true`, jamais construites par Astro
const HIDDEN = new Set(["15-guide-animation"]);

const slugOf = new Map(PAGES.map(([src, slug]) => [src, slug]));
const VISUELS = "cours-documentation/visuels/";

// Un visuel .svg qui a une source .mmd devient un bloc Mermaid rendu par le site,
// avec le même style que le cours Docker. Les C4 restent en image : le rendu
// Mermaid des C4 est expérimental et ignore le thème.
function mermaidBlock(name, alt) {
  if (!name.endsWith(".svg")) return null;
  const mmd = join(SRC, VISUELS, name.replace(/\.svg$/, ".mmd"));
  if (!existsSync(mmd)) return null;
  const lines = readFileSync(mmd, "utf8").trimEnd().split("\n");
  if (/^C4/.test(lines[0])) return null;
  const descr = alt ? ["    accDescr: " + alt.replace(/\s+/g, " ").trim()] : [];
  return "\n```mermaid\n" + [lines[0], ...descr, ...lines.slice(1)].join("\n") + "\n```\n";
}

function convert(srcPath, slug, title, order) {
  let md = readFileSync(join(SRC, srcPath), "utf8");

  md = md.replace(/<!-- inclure: ([\w/.-]+) -->/g, (_, name) => {
    if (!(name in INCLUDES)) throw new Error("Source non autorisée : " + name);
    const code = readFileSync(join(SRC, name), "utf8");
    return "\n~~~" + INCLUDES[name] + "\n" + code + "\n~~~\n";
  });

  // Liens et images relatifs : [texte](chemin#ancre), hors URLs absolues
  md = md.replace(/(!?)\[([^\]]*)\]\(([^)\s#]+)(#[^)]*)?\)/g, (m, bang, text, href, hash = "") => {
    if (/^[a-z]+:/.test(href) || href.startsWith("/")) return m;
    const target = relative(SRC, resolve(SRC, dirname(srcPath), href));
    if (bang) {
      // Visuels copiés à côté des chapitres
      if (target.startsWith(VISUELS)) {
        const name = target.slice(VISUELS.length);
        return mermaidBlock(name, text) ?? `![${text}](./visuels/${name})`;
      }
      return m;
    }
    if (slugOf.has(target) && !HIDDEN.has(slugOf.get(target))) {
      const s = slugOf.get(target);
      return `[${text}](/documentation/${s === "index" ? "" : s + "/"}${hash})`;
    }
    // Fichiers de la démo, scripts… : vers GitHub
    return `[${text}](${REPO}${target}${hash})`;
  });

  const hidden = HIDDEN.has(slug) ? "hidden: true\n" : "";
  const previous = previousPages.get(slug) ?? "";
  const today = new Date().toISOString().slice(0, 10);
  const publishedAt = previous.match(/^publishedAt: "([\d-]+)"$/m)?.[1] ?? today;
  const unchanged = previous.replace(/^---\n[\s\S]*?\n---\n\n/, "") === md;
  const updatedAt = unchanged ? previous.match(/^updatedAt: "([\d-]+)"$/m)?.[1] ?? today : today;
  const out = `---\ntitle: "${title.replace(/"/g, '\\"')}"\norder: ${order}\npublishedAt: "${publishedAt}"\nupdatedAt: "${updatedAt}"\n${hidden}---\n\n${md}`;
  writeFileSync(join(DEST, slug + ".md"), out);
}

// Les dates éditoriales du site survivent à la régénération des fichiers.
const previousPages = new Map(PAGES.map(([, slug]) => {
  const path = join(DEST, slug + ".md");
  return [slug, existsSync(path) ? readFileSync(path, "utf8") : ""];
}));
rmSync(DEST, { recursive: true, force: true });
mkdirSync(join(DEST, "visuels"), { recursive: true });
PAGES.forEach(([src, slug, title], i) => convert(src, slug, title, i));
cpSync(join(SRC, VISUELS), join(DEST, "visuels"), {
  recursive: true,
  filter: (p) => !/\.(mmd|mcd|css|md)$/.test(p),
});
console.log(`${PAGES.length} pages importées dans ${DEST}`);
