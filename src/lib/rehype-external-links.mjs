// Liens externes (http, https) ouverts dans un nouvel onglet. La flèche ↗ vient de prose.css.
// Les <a> écrits en HTML dans le markdown arrivent ici en texte brut (Astro les parse après
// les plugins), d'où le remplacement dans node.value
const external = /^https?:\/\//;

export function rehypeExternalLinks() {
  return (tree) => {
    const walk = (node) => {
      for (const child of node.children ?? []) {
        if (
          child.type === "element" &&
          child.tagName === "a" &&
          external.test(child.properties.href ?? "")
        ) {
          child.properties.target = "_blank";
          child.properties.rel = ["noopener"];
        } else if (child.type === "raw") {
          child.value = child.value.replace(
            /<a (?=[^>]*href="https?:\/\/)(?![^>]*target=)/g,
            '<a target="_blank" rel="noopener" ',
          );
        }
        walk(child);
      }
    };
    walk(tree);
  };
}
