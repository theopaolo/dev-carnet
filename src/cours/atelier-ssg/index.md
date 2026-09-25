---
title: 'Créer un mini-blog avec un SSG'
order: 8
---

# Créer un mini-blog avec un SSG

Fabriquez un mini-blog que vous alimenterez tout au long de votre M2 : questionnements, découvertes, apprentissages, envies.

**Objectifs**

- Avoir un premier petit projet en ligne
- Apprendre l’architecture SSG (static site generator)
- Développer sa culture technique

**Quelques exemples de blogs**

Parcourez ces blogs avant de commencer. Regardez leur structure, ce qu'ils publient et leur ton.

- [Maggie Appleton](https://maggieappleton.com/garden) : digital garden, dessin + écriture
- [Lea Verou](https://lea.verou.me/) : CSS experte, très technique
- [Julia Evans](https://jvns.ca/) : zines, pédagogie technique
- [Josh W. Comeau](https://www.joshwcomeau.com/) : interactivité, vulgarisation CSS/React
- [Adam Argyle](https://nerdy.dev/) : CSS, animations
- [Brittany Ellich](https://brittanyellich.com/blog/)
- [Cassidy Williams](https://cassidoo.co/blog/)
- [Framablog](https://framablog.org/) : numérique libre
- [Access42](https://access42.net/blog/) : accessibilité web
- [La Cascade](https://la-cascade.io/) : traductions CSS/JS francophones

### Architecture d’un générateur de site statique

_Un SSG est un logiciel qui crée des sites web composés de pages statiques, généralement au format HTML._[_src_](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9rateur_de_site_statique)

Un CMS comme WordPress génère chaque page côté serveur, à la demande. Un SSG construit les pages une fois, avant la mise en ligne, puis le serveur les sert telles quelles.

![Schéma des étapes d’un générateur de site statique.](/ressources/atelier-ssg/files/019e3f18-ab7a-753f-b39e-3b08f9cd423b/shapes_at_26-05-19_09.17.02.svg)

### Le concept de data layer

Le _data layer_ relie vos sources de contenu brut à vos templates. Il normalise, filtre et enrichit les données avant de les injecter dans les pages.

**Sans data layer**

Chaque template lit directement les fichiers source. La logique de transformation se retrouve copiée dans plusieurs templates.

**Avec data layer**

Les données se transforment à un seul endroit. Les templates se contentent d'afficher.

Dans **Astro**, le data layer passe par les [Content Collections](https://docs.astro.build/en/guides/content-collections/) : vous définissez un schéma (Zod) pour vos articles, et Astro valide chaque fichier `.md` à la compilation.

Dans **11ty**, le data layer passe par la [Data Cascade](https://www.11ty.dev/docs/data-cascade/) : des fichiers `.json`, `.js` ou `.11tydata.js` fournissent des données globales ou par dossier.

Le data layer sépare _ce que vous savez_ (vos données) de _la façon de l'afficher_ (vos templates).

### Les avantages d’un SSG

| **Critère** | **SSG** | **CMS dynamique (WordPress…)** |
| --- | --- | --- |
| Performance | HTML servi directement, sans calcul | Génération à chaque requête |
| Sécurité | Aucune base de données exposée | Surface d'attaque large (SQL, plugins…) |
| Coût d'hébergement | Gratuit sur GitHub Pages / Netlify | Nécessite un serveur PHP + BDD |
| SEO | HTML complet dès le chargement | Variable selon la config |
| Maintenance | Pas de serveur applicatif à mettre à jour | Mises à jour régulières du cœur et des plugins |
| Versioning | Contenu et code dans Git | Contenu en base, hors de Git |

Un SSG convient à un blog personnel, une documentation ou un portfolio. Dès que le site a besoin d'une base de données en temps réel (e-commerce, espace membres), un CMS dynamique ou un framework avec serveur devient plus adapté.

## Stack recommandée

Pour ce projet, je vous recommande [**Astro**](https://astro.build/) ou [**11ty**](https://www.11ty.dev/) (aussi appelé _Build Awesome_). Ce sont deux générateurs de site statique très utilisés.

| Astro - _si vous aimez les composants_ | 11ty - _si vous préférez la sobriété_ |
| --- | --- |
| Syntaxe proche de HTML/JSX | Minimaliste, zéro JS côté client par défaut |
| Composants réutilisables natifs | Supporte Markdown, Nunjucks, Liquid, JSX… |
| Supporte Svelte, Vue, React en îlots | Data Cascade : données globales, par dossier ou par page |
| Islands Architecture : du JS seulement dans les composants qui en ont besoin | Build rapide |
| Content Collections pour le data layer | Configuration en JavaScript simple |

**Astro** va plus loin qu'un SSG. Vous pouvez y écrire des composants avec Svelte ou Vue. Astro a été l'un des premiers frameworks à promouvoir l’architecture en îlots [_(Islands Architecture)_](https://docs.astro.build/en/concepts/islands/). Il se rapproche d'un framework web comme **Nuxt** ou **SvelteKit**.

**11ty** part du minimum : un runtime JS comme Node.js ou Deno génère le site à partir des sources. Un fichier de configuration ajoute ensuite des fonctions, par exemple des filtres de contenu ou des moteurs de templating comme **Liquid**, **Nunjucks** ou JSX.

## Déploiement sur GitHub Pages

GitHub Pages sert gratuitement des fichiers statiques depuis un dépôt Git. Il suffit pour ce projet.

### Mise en place pas à pas

**1** **Créez un dépôt GitHub** nommé `votre-username.github.io` (pour un site racine) ou n'importe quel nom (pour un sous-chemin).

**2** **Configurez la base URL** dans votre générateur.

Pour Astro (`astro.config.mjs`) :

```
export default defineConfig({
  site: 'https://username.github.io',
  base: '/nom-du-repo', // seulement si ce n'est pas le repo racine
});
```

Pour 11ty (`.eleventy.js`) :

```
module.exports = function(eleventyConfig) {
  return {
    pathPrefix: "/nom-du-repo/"
  };
};
```

**3** **Créez le workflow GitHub Actions** dans `.github/workflows/deploy.yml`. Ce fichier lance le build et le déploiement à chaque `git push`.

Pour Astro :

```
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4
```

**4** **Activez GitHub Pages** dans les settings du dépôt : _Settings → Pages → Source : GitHub Actions_.

**5** **Poussez votre code** avec `git push`. Le site est en ligne en 1 ou 2 minutes à l'adresse indiquée dans l'onglet Pages.


**Astuce :** votre URL ressemblera à `https://username.github.io/nom-du-repo`. Pour un domaine personnalisé, ajoutez un fichier `CNAME` (gratuit côté GitHub, le domaine reste à acheter).

## Pour aller plus loin

- [Documentation Astro](https://docs.astro.build/en/getting-started/)
- [Documentation 11ty](https://www.11ty.dev/docs/)
- [GitHub Pages : documentation officielle](https://docs.github.com/en/pages)
- [Content Collections (Astro) : data layer](https://docs.astro.build/en/guides/content-collections/)
- [Data Cascade (11ty)](https://www.11ty.dev/docs/data-cascade/)
