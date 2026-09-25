// Ancres des titres sans accents : « Hôte, client et serveur » → #hote-client-et-serveur.
// Une adresse copiée reste lisible, sans #h%C3%B4te-…. Même slugger qu'Astro (github-slugger),
// et Astro garde l'id posé ici pour le sommaire et la recherche (rehypeHeadingIds)
import Slugger from "github-slugger";

const text = (node) => (node.type === "text" ? node.value : (node.children ?? []).map(text).join(""));

export function rehypeHeadingIds() {
  return (tree) => {
    const slugger = new Slugger();
    const walk = (node) => {
      for (const child of node.children ?? []) {
        if (child.type === "element" && /^h[1-6]$/.test(child.tagName)) {
          child.properties.id ??= slugger.slug(text(child).normalize("NFD").replace(/\p{M}/gu, ""));
        } else walk(child);
      }
    };
    walk(tree);
  };
}
