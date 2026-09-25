# Carnet

Site statique Astro qui publie les cours écrits en Markdown.

Déploiement sur Coolify avec le `Dockerfile` du dépôt : choisir le build pack
Dockerfile et le port `80`. Le build produit `dist/`, servi par Nginx. Aucun
déploiement GitHub Pages n’est nécessaire.

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
node scripts/check-publication-dates.mjs # après le build
```

Chaque page de cours porte deux dates dans son frontmatter :

```yaml
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
```

`publishedAt` reste la date de première publication sur le site. Modifier `updatedAt`
quand le contenu de la page change, notamment les versions, les recommandations de
sécurité et les règles juridiques. Un changement de thème ou une reconstruction du
site ne change pas ces dates. Le build exige des dates valides au format `AAAA-MM-JJ`
et refuse une mise à jour antérieure à la publication.

Les dates initiales ont été reprises de la première et de la dernière apparition
de chaque page dans l’historique Git disponible du site. Elles ne retracent pas les
éventuelles publications antérieures sur d’autres supports. Pour le cours importé
de documentation, le script conserve la publication et ne change la mise à jour
que si le contenu importé diffère. Une nouvelle page importée reçoit la date du jour.

Dans un diagramme, `Node:::accent` (orange, ce qui tourne) et `Node:::store` (vert, données)
forcent la couleur. Les ids `Container*`, `API`, `Worker`, `Migrate`, `Volume*`, `Data`, `Dist`
la reçoivent automatiquement.
