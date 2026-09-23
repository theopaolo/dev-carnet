# Carnet

Site statique Astro qui publie les cours écrits en Markdown.

- `src/cours/<cours>/index.md` : page d'accueil d'un cours, `title` et `order` en frontmatter.
  Les chapitres sont les autres `.md` du dossier, triés par `order`.
- `src/cours/documentation/` est généré depuis le dépôt `cours-documentation-web` :
  `node scripts/import-documentation.mjs` (ne pas éditer ces fichiers à la main).
- `src/styles/theme.css` : typographie, code, diagrammes, mode sombre (jetons dans `:root`).
- `src/scripts/diagrams.js` : rendu Mermaid, légende `accTitle` / `accDescr`, lecture pas à pas des flowcharts et zoom plein écran.
- `src/lib/remark-mermaid.mjs` : transforme les blocs ```` ```mermaid ```` en `<div class="mermaid">`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

Dans un diagramme, `Node:::accent` (orange, ce qui tourne) et `Node:::store` (vert, données)
forcent la couleur. Les ids `Container*`, `API`, `Worker`, `Migrate`, `Volume*`, `Data`, `Dist`
la reçoivent automatiquement.
