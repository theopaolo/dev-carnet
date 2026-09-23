// ```mermaid [play] → <pre class="diagram"><div class="mermaid">…</div></pre>
// ```animated [loop] → <div class="diagram seq">…</div>
// Le rendu se fait côté client (src/scripts/diagrams.js), pas par Shiki.
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function remarkMermaid() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children.forEach((child, i) => {
        if (child.type === "code" && child.lang === "mermaid") {
          // ```mermaid play : flowchart lu connexion par connexion (src/scripts/diagrams.js)
          const play = child.meta === "play" ? " data-play" : "";
          node.children[i] = {
            type: "html",
            value: `<pre class="diagram"${play}><div class="mermaid">${escape(child.value)}</div></pre>`,
          };
        } else if (child.type === "code" && child.lang === "animated") {
          // Diagramme joué pas à pas par src/scripts/sequence.js.
          // ```animated loop : disposition en étoile au lieu des lignes de séquence
          const layout = child.meta === "loop" ? ' data-layout="loop"' : "";
          node.children[i] = {
            type: "html",
            value: `<div class="diagram seq"${layout}><pre class="seq-src">${escape(child.value)}</pre></div>`,
          };
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}
