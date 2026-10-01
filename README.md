# Carnet

Site statique Astro qui publie les cours écrits en Markdown.

Déploiement sur Coolify avec le `Dockerfile` du dépôt : choisir le build pack
Dockerfile et le port `80`. Le build produit `dist/`, servi par Nginx. Aucun
déploiement GitHub Pages n’est nécessaire.

- `src/cours/<cours>/index.md` : page d'accueil d'un cours, `title` et `order` en frontmatter.
  Les chapitres sont les autres `.md` du dossier, triés par `order`.
- `src/cours/documentation/` est généré depuis le dépôt `cours-documentation-web` :
  `node scripts/import-documentation.mjs` (ne pas éditer ces fichiers à la main).
- `src/layouts/Lesson.astro` : assemblage de la page et données du cours.
- `src/components/` : en-tête, navigation du cours, recherche, sommaire et Pochette.
- `src/styles/theme.css` : ordre des couches et imports CSS. Les couleurs et polices
  sont dans `settings.css`, les styles sont répartis par fonction.
- `src/scripts/diagrams.js` : rendu Mermaid, légende `accTitle` / `accDescr`, lecture pas à pas des flowcharts et zoom plein écran.
- `src/lib/remark-mermaid.mjs` : transforme les blocs ```` ```mermaid ```` en `<div class="mermaid">`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
npm test         # tests des fonctions sans navigateur
npm run check    # format, tests, build, dates et cours Three.js
npm run format   # formater le code du site
```

Les liens du contenu affichent un aperçu au survol ou au focus clavier. Les résumés
externes sont conservés dans `src/data/link-previews.json`, sans requête vers les
sites liés pendant la lecture. Après ajout de liens, lancer `npm run build` puis
`npm run previews` pour actualiser ce fichier et le versionner. Le build suivant
publie les aperçus. Les sites inaccessibles gardent leur ancien résumé, s'il existe.

## Organisation du site

Les composants Astro rendent le HTML. Leurs petits blocs `<script>` importent les
modules de `src/scripts/`. Le script de préférences est la seule exception :
`PageHead.astro` insère `preferences-init.js` avant le premier rendu pour éviter
un flash du mauvais thème ou de la mauvaise taille de texte.

- `preferences.js` gère thème, taille du texte et Focus. `chapters.js` gère la
  navigation sur téléphone, `reading-progress.js` le sommaire actif et la reprise.
- `reading.js` ajoute la copie du code et les liens des titres.
- `notebook.js` gère les rubans et les compteurs, `annotations.js` les sélections
  et notes, `pocket.js` la page de sauvegarde. Les clés de stockage et le format
  des exports restent compatibles avec les versions précédentes.
- `src/lib/notebook.mjs` valide, fusionne et exporte les données sans toucher au DOM.
  `src/lib/search.mjs` classe les résultats et prépare les extraits.
- `src/lib/urls.ts` construit les liens avec le chemin de base Astro.
- `diagrams.js` et `sequence.js` sont chargés seulement si la page contient leurs
  diagrammes. Les vues des séquences sont dans `sequence-views.js`. Mermaid lit
  les couleurs de `settings.css`, y compris après un changement de thème.

Le CSS utilise [Piloti 2](https://github.com/theopaolo/piloti) pour les réglages et
compositions `cluster` et `stack`. La base typographique de Piloti n'est pas
importée : Carnet conserve ses polices, tailles et espacements de lettres.
`PageHead.astro` fixe l'ordre avant les styles injectés par Astro, et
`theme.css` reprend l'ordre `settings`, `reset`, `base`, `compositions`, `components`,
`utilities`. Les styles propres aux pages et composants sont dans la couche
`components`, y compris les styles Astro scopés. Les feuilles globales par
fonction couvrent aussi les éléments créés par les scripts et le Markdown.

Ajouter une couleur dans `settings.css`, un style de contenu dans `prose.css`,
un style d'interface dans la feuille de sa fonction. Utiliser les compositions
Piloti pour les rangées et piles, et `.button` pour les boutons communs. Garder
les fonctions de transformation de données dans `src/lib/`, avec un test Node
quand elles contiennent des règles métier.

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

## Creative coding avec Three.js

Ce cours reste sur l'ordinateur de l'enseignant. Ses dossiers Markdown, ressources et
atelier sont ignorés par Git et Docker. Ils ne sont pas inclus dans un clone du dépôt
public. Garder une sauvegarde privée de ces fichiers, Git ne les sauvegarde pas.

Pour l'afficher avec `npm run dev`, créer `.env.development.local` :

```dotenv
SHOW_PRIVATE_COURSES=true
```

Redémarrer le serveur après avoir changé la variable. Sans cette valeur, le cours
n'est pas chargé. `npm run build` exclut toujours les cours privés, même si la variable
vaut `true`. Les pages, la recherche et les ressources publiées restent publiques.
Ce réglage ne fournit pas d'authentification sur le site en ligne.

La liste des identifiants privés est dans `src/lib/private-courses.mjs`. Pour réserver
un autre cours, ajouter son identifiant et ignorer ses dossiers dans `.gitignore` et
`.dockerignore`, comme pour Three.js. Un fichier déjà suivi par Git reste dans le dépôt
et son historique malgré `.gitignore`.

Le cours local est dans `src/cours/threejs/`. Il reprend les notes et expériences originales
du projet local `learning-3D`, traduites en français, avec 89 liens vers Three.js Journey.
Les textes payants et vidéos du cours source ne sont pas inclus.

L'atelier est servi à `/ressources/threejs/atelier/` avec Three.js 0.186.1 et ses licences
dans `vendor/`. Il ne dépend ni d'un CDN, ni d'un serveur séparé. Ses fichiers éditables
sont dans `public/ressources/threejs/atelier/`. La page d'entrée est
`src/pages/ressources/threejs/atelier/index.astro`, pour fonctionner aussi en développement.

Après le build, `node scripts/check-private-courses.mjs` vérifie l'absence des cours
privés dans les pages, la recherche et les ressources. `node scripts/check-threejs.mjs`
vérifie les sources locales et les données des particules si le cours est présent.

Pour vérifier les pages, les liens, la recherche et l'atelier du serveur local :
`node scripts/check-threejs.mjs http://127.0.0.1:4321`.
