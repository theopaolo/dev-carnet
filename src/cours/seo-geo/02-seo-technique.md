---
title: 'Le SEO technique'
order: 2
publishedAt: "2026-10-01"
updatedAt: "2026-10-02"
---

# Le SEO technique

Le SEO technique permet aux robots d'accéder aux pages et d'en lire le contenu. Pour commencer, vérifiez le HTML, les liens et l'affichage sur téléphone.

Vous retrouverez des pratiques du cours d'[accessibilité](/ux-ui/15-accessibilite-html-et-aria/) : des titres bien organisés, des liens compréhensibles et des alternatives aux images.

## Que mettre dans le `head` d'une page

Le `head` contient notamment le titre de l'onglet et une description que Google peut reprendre dans ses résultats.

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Séance découverte de bloc à Lyon | Prise d'Air</title>
  <meta name="description" content="Première séance de bloc à Lyon 7e : 1 h 30, 18 €, chaussons compris, dès 8 ans. Découvrez les conditions et réservez votre créneau.">
  <link rel="canonical" href="https://prisedair.example/seance-decouverte">
  <link rel="icon" href="/favicon.svg">
</head>
```

Donnez à chaque page un `title` unique, descriptif et concis, comme "Tarifs de l'escalade de bloc à Lyon | Prise d'Air", qui renseigne davantage le visiteur que "Tarifs" seul. Complétez-le par une **meta description** propre à cette page, qui résume le contenu en une ou deux phrases.

Dans cet exemple, `lang="fr"` indique la langue du document, tandis que la balise `viewport` permet un affichage adapté au téléphone. Si le même contenu existe à plusieurs **URL**, le lien `canonical` en indique l'adresse de référence.

Google peut reprendre le titre et la description ou choisir d'autres textes dans la page, comme l'explique sa documentation sur les [liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr) et les [extraits](https://developers.google.com/search/docs/appearance/snippet?hl=fr). La meta description ne détermine pas le classement, mais elle peut aider la personne à décider de cliquer.

<figure class="course-figure">
<img src="/ressources/seo-geo/du-code-au-resultat.svg" width="720" height="470" loading="lazy" alt="Un résultat Google pour Prise d'Air et les éléments du code associés : favicon, données du site, URL, title et meta description.">
</figure>

### Choisir une URL canonique cohérente

Si `/seance-decouverte` et `/seance-decouverte?utm_source=lettre` affichent le même contenu, leur `canonical` peut désigner `https://prisedair.example/seance-decouverte`. Cette adresse doit aussi être celle utilisée dans les liens internes et le sitemap. Une page sans doublon peut indiquer sa propre URL.

Le `canonical` est un signal, pas une obligation pour Google. Les redirections et le sitemap contribuent aussi à son choix. Ne faites pas pointer toutes les pages vers l'accueil : la page de référence doit proposer un contenu identique ou très proche. [Google, choix d'une URL canonique](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=fr).

### Préparer les aperçus de partage

Les balises **Open Graph** décrivent le titre, le texte et l'image proposés lorsqu'un lien est partagé sur un service compatible. Ajoutez-les dans le `head` si vous voulez maîtriser cet aperçu. Les cartes X, encore appelées Twitter Cards, utilisent notamment `twitter:card`.

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Séance découverte de bloc à Lyon | Prise d'Air">
<meta property="og:description" content="1 h 30 de bloc à Lyon 7e, 18 €, chaussons compris. Consultez les conditions et les créneaux.">
<meta property="og:url" content="https://prisedair.example/seance-decouverte">
<meta property="og:image" content="https://prisedair.example/images/seance-decouverte.jpg">
<meta property="og:image:alt" content="Le mur de bloc de la salle Prise d'Air">
<meta name="twitter:card" content="summary_large_image">
```

Remplacez les adresses fictives par celles de la page et d'une image publique réellement disponible. Ces balises servent à la présentation du partage, sans garantir un gain de classement dans Google. Elles complètent le `title` et la meta description. [Protocole Open Graph](https://ogp.me/).

## Organiser le contenu avec des balises HTML

Agrandir le texte d'un `div` ne suffit pas à en faire un titre dans la structure HTML. Utilisez les balises qui correspondent au contenu : `h1` pour le titre principal, `h2` pour les sections et `a` pour les liens.

```html
<!-- Exemple à corriger -->
<div class="gros">Bienvenue !</div>
<span onclick="location.href='/tarifs'">Tarifs</span>
<a href="/tarifs">ici</a>
```

```html
<!-- Exemple corrigé -->
<h1>Salle d'escalade de bloc à Lyon 7e</h1>
<h2>Tarifs et réservations</h2>
<a href="/tarifs">Voir les tarifs</a>
<p>Séance découverte : 1 h 30, 18 €, chaussons compris.</p>
```

Utilisez aussi `header`, `nav`, `main` et `footer` pour identifier les zones de la page, et `article` si le contenu forme un ensemble autonome. Les niveaux `h1`, `h2` et `h3` décrivent une hiérarchie, leur apparence se règle en CSS. Pour ce cours, utilisez un `h1` principal. Le nombre de `h1` ne suffit pas à juger la qualité du référencement : vérifiez surtout que la structure aide à comprendre la page.

Google découvre les autres pages grâce aux liens `<a href>`, dont le texte doit annoncer la destination : "Voir les tarifs" plutôt que "ici". Sa documentation sur les [liens explorables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=fr) détaille ces recommandations.

Écrivez les prix, les horaires et l'adresse en texte HTML pour qu'ils soient accessibles sans dépendre d'une image ou d'un clic. Les images informatives doivent aussi avoir un `alt` qui transmet l'information utile, tandis que les images décoratives reçoivent un `alt=""`.

### Choisir des adresses lisibles

Préférez `/seance-decouverte` à une adresse difficile à comprendre comme `/index.php?id=42&cat=7`. Utilisez des minuscules et des tirets entre les mots. Gardez les URL stables : ne renommez pas une page déjà publiée pour y ajouter quelques mots-clés.

## Comprendre les réponses du serveur

Quand vous ouvrez une adresse, votre navigateur demande une page au serveur qui héberge le site. Ils échangent selon un ensemble de règles appelé **HTTP**. Le serveur renvoie le contenu demandé, s'il le trouve, et un **code de statut HTTP** : un nombre qui indique le résultat de la demande.

Par exemple, le code **200** signifie que la demande a réussi. Les codes **301** et **404** correspondent à deux autres situations, utiles à connaître quand vous modifiez un site.

### Une page change d'adresse : la redirection 301

Supposons que la page `/decouverte` devienne `/seance-decouverte`. Des visiteurs peuvent encore utiliser l'ancienne adresse depuis leurs favoris ou un lien partagé.

Configurez une **redirection 301** sur le serveur pour indiquer que la page a déménagé définitivement et fournir sa nouvelle adresse. Le navigateur l'ouvre automatiquement, ce qui permet au visiteur d'arriver sur la bonne page même avec l'ancien lien. Les moteurs de recherche peuvent eux aussi prendre en compte ce changement.

Mettez également à jour les liens de votre site pour qu'ils pointent directement vers `/seance-decouverte`.

### Une page est introuvable : le code 404

Si une page a été supprimée sans page équivalente pour la remplacer, le serveur doit renvoyer le code **404**, qui signifie "aucune page trouvée à cette adresse". Une faute de frappe dans l'adresse peut produire la même réponse.

Vous pouvez afficher un message utile, par exemple "Cette page n'existe plus", avec un lien vers l'accueil ou les activités. Le serveur doit tout de même renvoyer le code 404 : écrire "page introuvable" dans une page envoyée avec le code 200 donnerait une information trompeuse aux robots.

Si un contenu équivalent existe à une nouvelle adresse, utilisez plutôt une redirection 301 vers cette page. Évitez de rediriger toutes les pages supprimées vers l'accueil, où le visiteur risque de ne pas retrouver ce qu'il cherchait.

### Sécuriser la connexion avec HTTPS

**HTTPS** est la version sécurisée de HTTP. Les échanges entre le navigateur et le serveur sont chiffrés, ce qui protège notamment les informations envoyées dans un formulaire pendant leur trajet.

L'adresse commence alors par `https://`. Pour l'activer, configurez un **certificat TLS** auprès de votre hébergeur, puis redirigez les adresses `http://` vers leur version `https://`. Beaucoup d'hébergeurs proposent cette configuration dans leur interface.

HTTPS protège la connexion, sans garantir la fiabilité du contenu du site.

Pour approfondir : [MDN, code 301](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status/301), [code 404](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status/404) et [HTTPS](https://developer.mozilla.org/fr/docs/Glossary/HTTPS).

## Distinguer robots.txt et noindex

Ces deux instructions interviennent à des étapes différentes :

| Instruction | Effet |
| --- | --- |
| `robots.txt` | Demande aux robots de ne pas explorer certaines adresses |
| `noindex` | Demande de ne pas conserver une page dans l'index |

Le fichier `robots.txt` se place à la racine du site. Dans cet exemple, les robots peuvent visiter les pages publiques, mais pas la recherche interne ni l'espace membre.

```txt
User-agent: *
Disallow: /recherche
Disallow: /compte/

Sitemap: https://prisedair.example/sitemap.xml
```

Une page bloquée dans `robots.txt` peut encore apparaître dans Google si d'autres sites pointent vers elle. Pour demander son retrait de l'index, ajoutez cette balise dans son `head` et laissez le robot explorer la page :

```html
<meta name="robots" content="noindex">
```

Le serveur peut aussi envoyer une instruction `noindex` dans l'en-tête HTTP `X-Robots-Tag`. Vérifiez cet en-tête dans l'onglet Réseau des DevTools, même si aucune balise `noindex` n'apparaît dans le HTML. [Google, directives robots](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=fr).

Comme le rappelle Google dans sa [présentation de robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=fr), ce fichier ne protège pas les données privées : un espace membre doit exiger une connexion pour en contrôler l'accès.

<aside class="course-note">

Avant de publier un site, vérifiez qu'aucun `noindex` utilisé pour les tests ne subsiste dans les pages publiques et que `robots.txt` ne bloque pas tout le site.

</aside>

### Aider les robots à trouver les pages avec un sitemap

Un **sitemap** est un fichier **XML** qui liste les pages à faire découvrir. Il aide le moteur à trouver leurs adresses, sans garantir leur indexation.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://prisedair.example/</loc>
  </url>
  <url>
    <loc>https://prisedair.example/seance-decouverte</loc>
  </url>
</urlset>
```

Les outils de création de sites peuvent générer ce fichier, dans lequel le champ `lastmod` permet d'indiquer la date à laquelle un contenu a réellement changé.

## Vérifier ce qu'un robot peut lire sans JavaScript

Google peut exécuter le JavaScript, mais tous les robots ne le font pas. Pour les informations publiques à référencer, préférez un HTML qui contient déjà le texte.

Le **rendu côté serveur** (SSR) et la **génération statique** (SSG) produisent ce HTML avant de l'envoyer au navigateur. Avec le **rendu côté client** (CSR), le navigateur construit le contenu en exécutant le JavaScript.

Dans [la page de Prise d'Air à corriger](/ressources/seo-geo/a-corriger.html), le code source (Ctrl+U, ou Cmd+Option+U sur Mac) contient un `<div id="infos"></div>` vide. Le prix "18 €" figure dans un script, pas dans le contenu HTML.

Après un clic sur "Afficher les infos", l'onglet Éléments des **DevTools** montre le prix et les conditions dans `<div id="infos">`. Un robot sans JavaScript ne voit pas cet ajout. Placez ces informations directement dans le HTML pour les rendre lisibles dès le chargement.

<span id="sur-mobile-viser-a-avoir-des-pages-lisibles-et-qui-chargent-rapidement"></span>

## Rendre les pages lisibles et rapides à charger sur mobile

Google utilise la version mobile des pages pour l'indexation. Vérifiez que le contenu reste disponible sur téléphone et que la page ne déborde pas horizontalement.

Privilégiez les formats WebP ou AVIF, qui permettent souvent de réduire le poids des images. Pour celles qui se trouvent hors du *viewport* au chargement de la page, utilisez `loading="lazy"` afin de différer leur téléchargement. Ne l'appliquez pas à l'image principale si elle est visible dès l'ouverture. Indiquez aussi `width` et `height` pour que le navigateur réserve la place des images et évite les décalages de mise en page.

```html
<img src="mur-principal.avif" width="1200" height="800"
     alt="Le mur principal de Prise d'Air, avec ses blocs de couleur">

<img src="vestiaires.webp" width="600" height="400" loading="lazy"
     alt="Les vestiaires">
```

Choisissez des noms de fichiers descriptifs, comme `mur-bloc-lyon.webp` plutôt que `IMG_8392.webp`. Le `alt` décrit l'information utile dans le contexte de la page, sans accumuler des mots-clés. Servez une image adaptée à sa taille d'affichage, avec `srcset` et `sizes` si plusieurs tailles sont disponibles. [Google, bonnes pratiques pour les images](https://developers.google.com/search/docs/appearance/google-images?hl=fr).

Les **Core Web Vitals** mesurent la vitesse d'affichage du contenu principal (**LCP**), la réactivité (**INP**) et la stabilité de la mise en page (**CLS**). Ces mesures, décrites dans la [documentation de Google](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=fr), vous aideront dans l'atelier à repérer une image lourde, du JavaScript qui ralentit la page ou des éléments qui se déplacent pendant le chargement.

| Mesure | Seuil considéré comme bon |
| --- | --- |
| LCP, affichage du contenu principal | ≤ 2,5 s |
| INP, délai de réponse aux interactions | ≤ 200 ms |
| CLS, décalages de mise en page | ≤ 0,1 |

Ces seuils s'évaluent au **75e percentile** des visites, séparément sur mobile et ordinateur : au moins 75 % des mesures doivent atteindre le seuil. Un test Lighthouse au chargement ne mesure pas l'INP des visiteurs, car il ne reproduit pas leurs interactions. Consultez les données de terrain de PageSpeed Insights ou de Search Console lorsqu'elles sont disponibles. [web.dev, Core Web Vitals](https://web.dev/articles/vitals).

Commencez par les ressources qui ralentissent réellement la page : réduisez le JavaScript et les scripts tiers inutiles, limitez les polices et leurs variantes, et évitez de bloquer le premier affichage avec du CSS superflu. Configurez le cache HTTP des fichiers statiques. Un CDN, qui distribue les fichiers depuis plusieurs serveurs, peut aider si la distance avec les visiteurs ralentit leur chargement. Les [conseils de web.dev](https://web.dev/articles/top-cwv) permettent de choisir les corrections à partir des mesures.

Ces indicateurs participent à l'expérience de page prise en compte par Google. De bons scores ne garantissent pas une bonne position et ne remplacent pas un contenu pertinent. [Google, Core Web Vitals et recherche](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=fr).

<span id="decouvrir-les-donnees-structurees"></span>

## Décrire la salle avec des données structurées

En lisant "Prise d'Air, 12 rue Imaginaire, Lyon", un visiteur reconnaît le nom de la salle et son adresse. Les **données structurées** rendent ces informations explicites pour les moteurs grâce à des champs comme `name` pour le nom du lieu et `address` pour son adresse. Le vocabulaire [schema.org](https://schema.org/) définit ces champs et les types de lieux qu'ils peuvent décrire.

Ce balisage aide Google à identifier ce que décrit la page et peut, pour les types pris en charge, la rendre éligible à un **résultat enrichi** : une recette peut par exemple apparaître avec son temps de cuisson. Google précise toutefois dans sa [présentation des données structurées](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=fr) que cet affichage n'est jamais garanti.

Ajoutez des données structurées lorsqu'un type correspond au contenu de la page et que les informations sont déjà présentes en HTML pour les visiteurs, conformément aux [règles de Google sur le contenu balisé](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=fr). Pour la page qui présente Prise d'Air, le type `SportsActivityLocation` convient à un lieu d'activité sportive. Si le nom ou l'adresse change, pensez à mettre à jour le texte visible et le balisage.

Google recommande d'écrire ces données en **JSON-LD**, sous la forme d'un objet JSON placé dans `<script type="application/ld+json">`. Cette balise contient uniquement des données : elle n'exécute pas de JavaScript et n'affiche pas de texte sur la page.

<details class="course-details">
<summary>Exemple JSON-LD pour Prise d'Air</summary>

`@type` indique le type de lieu, `name` son nom et `address` son adresse.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Prise d'Air",
  "url": "https://prisedair.example/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue Imaginaire",
    "postalCode": "69007",
    "addressLocality": "Lyon",
    "addressCountry": "FR"
  }
}
</script>
```

Vérifiez ce bloc avec le [validateur schema.org](https://validator.schema.org/). Le [test des résultats enrichis de Google](https://search.google.com/test/rich-results) vérifie les types pris en charge par Google, sans promettre leur affichage dans les résultats.

</details>

Le type dépend de ce que décrit la page : `Organization` pour une organisation, `Article` pour un article, `Event` pour un événement, `Product` pour un produit ou `BreadcrumbList` pour un fil d'Ariane. Un type valide dans schema.org n'est pas forcément pris en charge comme résultat enrichi par Google. Choisissez le balisage adapté au contenu, sans attendre une hausse automatique du classement.

## Contrôler une page avec Lighthouse et suivre le site avec Search Console

**Lighthouse**, dans les DevTools, effectue des contrôles automatiques de performance, d'accessibilité et de SEO, y compris sur une page servie en local. Ses résultats donnent des pistes, mais ne remplacent pas un audit d'accessibilité : même un score de 100 en accessibilité ne garantit pas que la page soit utilisable au clavier ou avec un lecteur d'écran. Il faut aussi vérifier les parcours et le contenu à la main. [Chrome, score d'accessibilité Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/scoring/).

Ses mesures de performance viennent d'un test réalisé dans des conditions simulées. Elles aident à repérer des lenteurs, mais ne suffisent pas à décrire ce que vivent les visiteurs sur leurs appareils et leurs connexions. Pour un site publié, comparez-les à des mesures recueillies auprès des visiteurs. [web.dev, mesures en laboratoire et sur le terrain](https://web.dev/articles/user-centric-performance-metrics).

Un bon score SEO ne garantit pas non plus une bonne place dans Google : Lighthouse ne juge pas si le texte répond aux recherches des visiteurs.

**[Search Console](https://search.google.com/search-console)** sert à suivre un site publié : pages indexées, erreurs, recherches et clics. Il faut prouver que vous gérez le site pour accéder à ses rapports.

Pour un site que vous gérez, suivez ces étapes après publication :

1. Ajoutez le site dans Search Console et validez sa propriété, par exemple avec un enregistrement DNS pour une propriété de type Domaine.
2. Envoyez l'adresse de `sitemap.xml` dans le rapport Sitemaps et vérifiez qu'il est lisible. Listez les URL canoniques des pages à indexer, sans pages supprimées ni pages `noindex`.
3. Inspectez l'URL d'une page importante. Vérifiez l'état d'indexation et l'URL canonique choisie par Google. Le test en direct vérifie l'accès actuel, sans prouver que la page est déjà indexée.
4. Consultez les rapports d'indexation, les Core Web Vitals et les rapports de résultats enrichis disponibles pour le site. Un petit site peut manquer de données de terrain.
5. Suivez les requêtes, impressions, clics et CTR dans le rapport Performances, détaillé au [chapitre sur le contenu](/seo-geo/03-contenu/#suivre-les-resultats-dans-search-console).

Search Console et l'envoi du sitemap ne sont pas obligatoires pour apparaître dans Google. Ils facilitent le diagnostic et le suivi. [Google, démarrer avec Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=fr).
