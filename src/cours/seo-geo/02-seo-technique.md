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

Donnez à chaque page un `title` précis. "Tarifs de l'escalade de bloc à Lyon | Prise d'Air" est plus utile que "Tarifs". Résumez ensuite le contenu dans la **meta description**, en une ou deux phrases.

`lang="fr"` indique la langue. La balise `viewport` permet un affichage adapté au téléphone. Le lien `canonical` indique l'adresse de référence si le même contenu existe à plusieurs **URL**.

Google peut reprendre le titre et la description, ou choisir d'autres textes dans la page. La meta description ne détermine pas le classement. Elle peut aider la personne à décider de cliquer. [Google, liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr) et [extraits](https://developers.google.com/search/docs/appearance/snippet?hl=fr).

<figure class="course-figure">
<img src="/ressources/seo-geo/du-code-au-resultat.svg" width="720" height="470" loading="lazy" alt="Un résultat Google pour Prise d'Air et les éléments du code associés : favicon, données du site, URL, title et meta description.">
<figcaption>Le code fournit des informations que Google peut utiliser pour présenter le résultat. Le titre et l'extrait affichés peuvent différer de ceux du HTML.</figcaption>
</figure>

## Organiser le contenu avec des balises HTML

Un grand texte dans un `div` reste un `div`. Utilisez les balises qui correspondent au contenu : `h1` pour le titre principal, `h2` pour les sections et `a` pour les liens.

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

Google découvre les autres pages grâce aux liens `<a href>`. Le texte du lien doit annoncer la destination : "Voir les tarifs" plutôt que "ici". [Google, liens explorables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=fr).

Écrivez les prix, les horaires et l'adresse en texte HTML. Une image ou un texte ajouté seulement après un clic ne suffit pas. Pour une image informative, rédigez un `alt` qui transmet l'information utile. Pour une image décorative, utilisez `alt=""`.

### Choisir des adresses lisibles

Préférez `/seance-decouverte` à une adresse difficile à comprendre comme `/index.php?id=42&cat=7`. Utilisez des minuscules et des tirets entre les mots.

## Comprendre les réponses du serveur

Quand vous ouvrez une adresse, votre navigateur demande une page au serveur qui héberge le site. Ils échangent selon un ensemble de règles appelé **HTTP**. Le serveur renvoie le contenu demandé, s'il le trouve, et un **code de statut HTTP** : un nombre qui indique le résultat de la demande.

Par exemple, le code **200** signifie que la demande a réussi. Les codes **301** et **404** correspondent à deux autres situations, utiles à connaître quand vous modifiez un site.

### Une page change d'adresse : la redirection 301

Supposons que la page `/decouverte` devienne `/seance-decouverte`. Des visiteurs peuvent encore utiliser l'ancienne adresse depuis leurs favoris ou un lien partagé.

Configurez une **redirection 301** sur le serveur : sa réponse indique que la page a déménagé définitivement et donne sa nouvelle adresse. Le navigateur ouvre alors cette adresse automatiquement. Le visiteur arrive sur la bonne page, même avec l'ancien lien. Les moteurs de recherche peuvent aussi prendre en compte ce changement.

Mettez également à jour les liens de votre site pour qu'ils pointent directement vers `/seance-decouverte`.

### Une page est introuvable : le code 404

Si une page a été supprimée sans page équivalente pour la remplacer, le serveur doit renvoyer le code **404**. Il signifie "aucune page trouvée à cette adresse". Une faute de frappe dans l'adresse peut produire la même réponse.

Vous pouvez afficher un message utile, par exemple "Cette page n'existe plus", avec un lien vers l'accueil ou les activités. Le serveur doit tout de même renvoyer le code 404 : écrire "page introuvable" dans une page envoyée avec le code 200 donnerait une information trompeuse aux robots.

Si un contenu équivalent existe à une nouvelle adresse, utilisez plutôt une redirection 301 vers cette page. Évitez de rediriger toutes les pages supprimées vers l'accueil, où le visiteur risque de ne pas retrouver ce qu'il cherchait.

### Sécuriser la connexion avec HTTPS

**HTTPS** est la version sécurisée de HTTP. Les échanges entre le navigateur et le serveur sont chiffrés, ce qui protège notamment les informations envoyées dans un formulaire pendant leur trajet.

L'adresse commence alors par `https://`. Pour l'activer, configurez un **certificat TLS** auprès de votre hébergeur, puis redirigez les adresses `http://` vers leur version `https://`. Beaucoup d'hébergeurs proposent cette configuration dans leur interface.

HTTPS protège la connexion. Il ne garantit pas que le contenu du site est fiable.

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

`robots.txt` ne protège pas des données privées. Un espace membre doit demander une connexion. [Google, présentation de robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=fr).

<aside class="course-note">

Avant de publier un site, vérifiez qu'un `noindex` utilisé pour les tests n'est pas resté dans les pages publiques. Vérifiez aussi que `robots.txt` ne bloque pas tout le site.

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

Vous pouvez indiquer dans `lastmod` la date à laquelle un contenu a réellement changé. Les outils de création de sites peuvent générer ce fichier.

## Vérifier ce qu'un robot peut lire sans JavaScript

Google peut exécuter le JavaScript, mais tous les robots ne le font pas. Pour les informations publiques à référencer, préférez un HTML qui contient déjà le texte.

Le **rendu côté serveur** (SSR) et la **génération statique** (SSG) produisent ce HTML avant de l'envoyer au navigateur. Avec le **rendu côté client** (CSR), le navigateur construit le contenu en exécutant le JavaScript.

Le but du test est de savoir si un robot qui n'exécute pas JavaScript peut lire les informations utiles dès qu'il reçoit la page. Essayez avec [la page de Prise d'Air à corriger](/ressources/seo-geo/a-corriger.html). Affichez son code source avec Ctrl+U, ou Cmd+Option+U sur Mac, puis cherchez `<div id="infos"></div>` : cet élément est vide. Le prix "18 €" apparaît plus bas, mais dans un script, pas dans le contenu HTML de la page.

Revenez à la page et cliquez sur "Afficher les infos". Dans les **DevTools**, ouvrez l'onglet Éléments et cherchez `id="infos"` : il contient maintenant le prix et les conditions de la séance. Le navigateur les a ajoutés après le clic. Un robot qui ne lance pas JavaScript ne verra pas ces informations comme du contenu de la page. Pour les rendre accessibles dès le chargement, placez-les directement dans le HTML, à l'intérieur de `<div id="infos">`.

## Sur mobile, viser à avoir des pages lisibles et qui chargent rapidement

Google utilise la version mobile des pages pour l'indexation. Vérifiez que le contenu reste disponible sur téléphone et que la page ne déborde pas horizontalement.

Privilégiez les formats WebP ou AVIF, qui permettent souvent de réduire le poids des images. Pour celles qui se trouvent hors du *viewport* au chargement de la page, utilisez `loading="lazy"` afin de différer leur téléchargement. Ne l'appliquez pas à l'image principale si elle est visible dès l'ouverture. Indiquez aussi `width` et `height` pour que le navigateur réserve la place des images et évite les décalages de mise en page.

```html
<img src="mur-principal.avif" width="1200" height="800"
     alt="Le mur principal de Prise d'Air, avec ses blocs de couleur">

<img src="vestiaires.webp" width="600" height="400" loading="lazy"
     alt="Les vestiaires">
```

Les **Core Web Vitals** mesurent la vitesse d'affichage du contenu principal (**LCP**), la réactivité (**INP**) et la stabilité de la mise en page (**CLS**). Dans cet atelier, utilisez ces mesures pour repérer une image lourde, du JavaScript qui ralentit la page ou des éléments qui se déplacent pendant le chargement. [Google, Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=fr).

<span id="decouvrir-les-donnees-structurees"></span>

## Décrire la salle avec des données structurées

Une page peut afficher "Prise d'Air, 12 rue Imaginaire, Lyon". Un visiteur reconnaît le nom de la salle et son adresse. Les **données structurées** ajoutent des champs explicites pour les moteurs : `name` contient le nom du lieu, `address` son adresse. [schema.org](https://schema.org/) fournit les noms de ces champs et des types de lieux.

Ce balisage aide Google à identifier ce que décrit la page. Pour les types qu'il prend en charge, il peut aussi rendre la page éligible à un **résultat enrichi**. Par exemple, une recette peut afficher son temps de cuisson dans Google. L'affichage n'est jamais garanti. [Google, présentation des données structurées](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=fr).

Ajoutez des données structurées quand la page contient déjà ces informations en HTML pour les visiteurs et qu'un type correspond à son contenu. Pour la page qui présente Prise d'Air, `SportsActivityLocation` décrit un lieu d'activité sportive. Si le nom ou l'adresse change, mettez à jour le texte visible et le balisage. [Google, règles sur le contenu balisé](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=fr).

Google recommande d'écrire ces données en **JSON-LD**. C'est un objet JSON placé dans `<script type="application/ld+json">`. Cette balise contient des données : elle n'exécute pas JavaScript et n'affiche pas de texte sur la page.

<details class="course-details">
<summary>Exemple : écrire le nom et l'adresse de Prise d'Air en JSON-LD</summary>

Le bloc suivant reprend le nom et l'adresse que les visiteurs doivent pouvoir lire sur la page. `@type` indique le type de lieu, `name` son nom et `address` son adresse.

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

## Contrôler une page avec Lighthouse et suivre le site avec Search Console

**Lighthouse**, dans les DevTools, effectue des contrôles automatiques de performance, d'accessibilité et de SEO, y compris sur une page servie en local. Ses résultats donnent des pistes, mais ne remplacent pas un audit d'accessibilité : même un score de 100 en accessibilité ne garantit pas que la page soit utilisable au clavier ou avec un lecteur d'écran. Il faut aussi vérifier les parcours et le contenu à la main. [Chrome, score d'accessibilité Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/scoring/).

Ses mesures de performance viennent d'un test réalisé dans des conditions simulées. Elles aident à repérer des lenteurs, mais ne suffisent pas à décrire ce que vivent les visiteurs sur leurs appareils et leurs connexions. Pour un site publié, comparez-les à des mesures recueillies auprès des visiteurs. [web.dev, mesures en laboratoire et sur le terrain](https://web.dev/articles/user-centric-performance-metrics).

Un bon score SEO ne garantit pas non plus une bonne place dans Google : Lighthouse ne juge pas si le texte répond aux recherches des visiteurs.

**[Search Console](https://search.google.com/search-console)** sert à suivre un site publié : pages indexées, erreurs, recherches et clics. Il faut prouver que vous gérez le site pour accéder à ses rapports.

Dans l'[atelier](/seo-geo/06-atelier/), vous utiliserez Lighthouse et la lecture du HTML. Les deux se complètent : certains problèmes ne seront visibles qu'en lisant la page.
