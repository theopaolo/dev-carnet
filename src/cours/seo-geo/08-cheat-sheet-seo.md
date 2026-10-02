---
title: 'Annexe : cheat-sheet SEO'
order: 8
publishedAt: "2026-10-02"
updatedAt: "2026-10-02"
---

# Annexe : cheat-sheet SEO

Cette fiche rassemble les contrôles à faire avant de publier un site, puis pendant son suivi. Les exemples utilisent Prise d'Air, la salle d'escalade fictive du cours. Copiez ou imprimez cette fiche pour cocher les points applicables à votre projet.

## Contenu et confiance

- [ ] Chaque page répond à une intention principale, par exemple connaître les tarifs ou préparer une première séance.
- [ ] Le sujet apparaît dans un `h1` descriptif et la réponse commence dans les premières lignes.
- [ ] Les `h2` et `h3` organisent le contenu dans un ordre logique.
- [ ] Le texte apporte des informations originales et vérifiées, sans répétition artificielle de mots-clés ni longueur imposée.
- [ ] L'établissement et les auteurs sont identifiables. Leur expérience, les sources et le contact sont précisés lorsque c'est utile.
- [ ] Les prix, horaires et conditions sont à jour. Les dates de mise à jour correspondent à de vraies modifications.
- [ ] Des liens internes permettent d'atteindre chaque page importante, avec un texte qui annonce la destination.
- [ ] Les liens entrants recherchés viennent de partenaires ou de publications pertinents, sans achat de liens destiné à manipuler le classement.

[Revoir le chapitre sur le contenu](/seo-geo/03-contenu/).

## HTML et métadonnées

- [ ] Chaque page possède un `title` unique, descriptif et concis, ainsi qu'une meta description adaptée à son contenu.
- [ ] La langue et le `viewport` sont déclarés.
- [ ] Les zones de la page utilisent des balises adaptées, comme `nav`, `main` et `footer`.
- [ ] Les liens de navigation sont de vrais `<a href="…">`, utilisables au clavier.
- [ ] Le contenu à référencer est présent dans le HTML initial, produit en statique, SSG ou SSR, sans clic nécessaire pour le révéler.
- [ ] Si une URL canonique est indiquée, elle correspond au contenu de la page et reste cohérente avec les liens et le sitemap.
- [ ] Si le partage le justifie, Open Graph et les cartes X/Twitter proposent un aperçu avec une image publique.
- [ ] Si des données structurées sont pertinentes, le JSON-LD correspond au contenu visible et a été validé.

Exemple de `head` pour une page, à adapter avec le domaine réel :

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Séance découverte de bloc à Lyon | Prise d'Air</title>
  <meta name="description" content="Découvrez le bloc à Lyon 7e : séance de 1 h 30 à 18 €, chaussons compris. Consultez les conditions et réservez votre créneau.">
  <link rel="canonical" href="https://prisedair.example/seance-decouverte">
</head>
```

Google peut reformuler le titre et l'extrait. Le JSON-LD peut rendre une page éligible à certains résultats enrichis, sans garantir leur affichage ni une meilleure position.

[Revoir le HTML, les aperçus de partage et le JSON-LD](/seo-geo/02-seo-technique/).

## Exploration et indexation

- [ ] Les pages publiques à indexer répondent en HTTP `200` et utilisent HTTPS.
- [ ] Aucun `noindex` de préproduction ne subsiste, y compris dans un éventuel en-tête HTTP `X-Robots-Tag`.
- [ ] `robots.txt` autorise l'exploration des pages et des ressources nécessaires à leur rendu.
- [ ] Les URL sont lisibles et stables. Les doublons ont une adresse de référence cohérente.
- [ ] Un changement d'adresse utilise une redirection `301` vers la page équivalente. Les liens internes ont été mis à jour.
- [ ] Une page supprimée sans remplacement équivalent renvoie `404`.
- [ ] Si un sitemap est fourni, il liste les URL canoniques à indexer et reste accessible à l'adresse déclarée.

`robots.txt` contrôle l'exploration, `noindex` contrôle l'indexation. Pour lire un `noindex`, le robot doit pouvoir explorer la page. Aucun des deux ne protège les données privées : utilisez un contrôle d'accès.

[Revoir les règles d'exploration](/seo-geo/02-seo-technique/#distinguer-robotstxt-et-noindex).

## Images, mobile et performance

- [ ] Le contenu reste lisible et utilisable sur téléphone, sans défilement horizontal de la page.
- [ ] Les images ont des noms descriptifs, un format et des dimensions adaptés à l'affichage.
- [ ] Chaque image informative possède un `alt` utile. Une image décorative reçoit `alt=""`.
- [ ] Les attributs `width` et `height` réservent l'espace des images.
- [ ] `loading="lazy"` est réservé aux images hors écran au chargement, sans retarder l'image principale visible.
- [ ] Le JavaScript, les scripts tiers, les polices et le CSS chargés sont limités aux besoins de la page.
- [ ] Le cache HTTP des fichiers statiques est configuré. Un CDN est envisagé si les mesures le justifient.

| Core Web Vital | Cible au 75e percentile |
| --- | --- |
| LCP : affichage principal | ≤ 2,5 s |
| INP : réponse aux interactions | ≤ 200 ms |
| CLS : stabilité visuelle | ≤ 0,1 |

Évaluez mobile et ordinateur séparément. Lighthouse aide au diagnostic, mais son test au chargement ne mesure pas l'INP réel des visiteurs. Utilisez les données de terrain lorsqu'elles sont disponibles. Une page rapide doit aussi répondre à la recherche. [web.dev, mesures et seuils](https://web.dev/articles/vitals).

## Après publication

- [ ] La propriété du site est validée dans [Search Console](https://search.google.com/search-console).
- [ ] Le sitemap, s'il existe, est envoyé et son traitement est vérifié.
- [ ] Les URL importantes sont inspectées pour vérifier leur indexation et la canonique retenue par Google.
- [ ] Les problèmes d'indexation, de Core Web Vitals et de données structurées sont examinés dans les rapports disponibles.
- [ ] Les requêtes, impressions, clics et CTR sont comparés sur des périodes comparables. La position moyenne sert de repère, pas de classement fixe.
- [ ] Pour une activité locale, l'adresse, les horaires et les coordonnées concordent avec la fiche d'établissement.

Search Console aide à suivre le site, sans être une condition d'indexation. Un sitemap facilite la découverte, sans garantir que ses pages seront indexées. [Google, démarrer avec Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=fr).

## Quel outil pour quel contrôle ?

| Contrôle | Outil ou méthode |
| --- | --- |
| Texte reçu avant JavaScript | Afficher le code source de la page |
| Statut HTTP, redirection, cache, `X-Robots-Tag` | Onglet Réseau des DevTools |
| Mise en page et navigation | Affichage mobile et parcours au clavier |
| Problèmes techniques automatiques | Lighthouse dans Helium ou un autre navigateur compatible |
| Performance réelle d'un site publié | [PageSpeed Insights](https://pagespeed.web.dev/) et Search Console |
| Syntaxe et vocabulaire JSON-LD | [Validateur schema.org](https://validator.schema.org/) |
| Éligibilité aux résultats enrichis pris en charge | [Test de Google](https://search.google.com/test/rich-results) |
| Indexation et recherches qui apportent des visites | Search Console |

Pour l'[atelier de correction](/seo-geo/06-atelier/), utilisez les contrôles de contenu, HTML, images et mobile. Les contrôles de domaine et de Search Console demandent un site réellement publié que vous gérez.
