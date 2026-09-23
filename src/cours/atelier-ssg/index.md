---
title: 'Atelier SSG : mini-blog tech'
order: 8
---

# Atelier SSG - Mini-blog tech

Fabriquez un mini-blog que vous alimenterez tout au long de votre M2 : questionnements, découvertes, apprentissages, envies.

**Objectifs**

- Avoir un premier petit projet en ligne
- Apprendre l’architecture SSG (static site generator)
- Développer sa culture technique

**Voici quelques exemple de blog**

Parcourez ces blogs avant de commencer, observez comment ils sont structurés, ce qu'ils publient, leur ton.

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

### Architecture d’un Générateur de site statique

_Un SSG, c’est un logiciel qui permet de créer des sites web composés de pages statiques, généralement au format HTML._[_src_](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9rateur_de_site_statique)

différence d'un CMS comme WordPress, les pages ne sont pas générées à la demande côté serveur, elles sont construites une fois, en avance, puis servies telles quelles.

![Schéma des étapes d’un générateur de site statique.](/ressources/atelier-ssg/files/019e3f18-ab7a-753f-b39e-3b08f9cd423b/shapes_at_26-05-19_09.17.02.svg)

### Le concept de data layer

Le _data layer_ est la couche qui fait le lien entre vos sources de contenu brut et vos templates. C'est ici que les données sont normalisées, filtrées, enrichies avant d'être injectées dans les pages.

**Sans data layer**

Chaque template accède directement aux fichiers source. Difficile à maintenir, logique dispersée partout.

**Avec data layer**

Un seul endroit pour transformer vos données. Les templates restent "bêtes" — ils affichent, ils n'interprètent pas.

Dans **Astro**, le data layer passe par les [Content Collections](https://docs.astro.build/en/guides/content-collections/) : vous définissez un schéma (Zod) pour vos articles, et Astro valide chaque fichier `.md` à la compilation.

Dans **11ty**, le data layer fonctionne via les [Data Cascade](https://www.11ty.dev/docs/data-cascade/) : des fichiers `.json`, `.js` ou `.11tydata.js` fournissent des données globales ou par dossier.


Le data layer, c'est la séparation entre _ce que vous savez_ (vos données) et _comment vous l'affichez_ (vos templates).

### Les avantages d’un SSG

| **Critère** | **SSG** | **CMS dynamique (WordPress…)** |
| --- | --- | --- |
| Performance | Très rapide,HTML servi directement | Génération à chaque requête |
| Sécurité | Aucune base de données exposée | Surface d'attaque large (SQL, plugins…) |
| Coût d'hébergement | Gratuit sur GitHub Pages / Netlify | Nécessite un serveur PHP + BDD |
| SEO | Excellent, HTML complet dès le chargement | Variable selon la config |
| Maintenance | Minime, pas de mise à jour serveur | Mises à jour régulières obligatoires |
| Versioning | Natif via Git | Complexe à versionner |

Un SSG est idéal pour un blog personnel, une documentation, un portfolio. Dès que vous avez besoin d'une vraie base de données temps réel (e-commerce, espace membres), un CMS dynamique reprend l'avantage.

## Stack recommandée

Pour ce projet je vous recommande d’utiliser soit [**Astro**](https://astro.build/) ou bien [**11ty**](https://www.11ty.dev/) (aka _Build Awesome_).

Ce sont deux générateurs de site statique très populaires.

| Astro - _si vous aimez les composants_ | 11ty - _si vous préférez la sobriété_ |
| --- | --- |
| Syntaxe proche de HTML/JSX | Minimaliste, zéro JS côté client par défaut |
| Composants réutilisables natifs | Supporte Markdown, Nunjucks, Liquid, JSX… |
| Supporte Svelte, Vue, React en îlots | Data Cascade très puissant |
| Islands Architecture, le JS uniquement là où c'est nécessaire | Excellente performance build |
| Content Collections pour le data layer | Communauté francophone active |

**Astro** possède de nombreuses fonctionnalités supplémentaires. Par exemple, il est possible de fabriquer des composants réutilisables avec des frameworks front comme Svelte ou Vue directement dans Astro. Astro est une des pionnières à promouvoir l’Architecture en îlots [_(Islands Architecture)_](https://docs.astro.build/en/concepts/islands/)_._ Au final, plus qu’un SSG, on peut le considérer comme un framework web à l’instar d’un **Nuxt** ou **SvelteKit**.

**11ty** a une approche minimaliste : il a besoin d’un runtime JS comme Node.js ou Deno pour générer le site statique depuis des sources. Par la suite, on ajoute un fichier de configuration pour des fonctionnalités supplémentaires, comme le filtrage de contenu et la rédaction de nos sources avec des moteurs de templating comme **Liquid**, **Nunjucks** et même JSX, entre autres.

## **Déploiement sur GitHub Pages**

GitHub Pages est un hébergement gratuit qui sert des fichiers statiques directement depuis un dépôt Git. Idéal pour ce projet.

### **Mise en place pas à pas**

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

**3** **Créez le workflow GitHub Actions** dans `.github/workflows/deploy.yml`. C'est ce fichier qui automatise le build et le déploiement à chaque `git push`.

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

**5** **Poussez votre code** avec `git push`. Le site est en ligne en 1-2 minutes à l'adresse indiquée dans l'onglet Pages.


**Tip :** votre URL ressemblera à `https://username.github.io/nom-du-repo`. Si vous voulez un domaine personnalisé, GitHub Pages supporte l'ajout d'un `CNAME` gratuit.

## **Pour aller plus loin**

- [Documentation Astro](https://docs.astro.build/en/getting-started/)
- [Documentation 11ty](https://www.11ty.dev/docs/)
- [GitHub Pages — documentation officielle](https://docs.github.com/en/pages)
- [Content Collections (Astro) — data layer](https://docs.astro.build/en/guides/content-collections/)
- [Data Cascade (11ty)](https://www.11ty.dev/docs/data-cascade/)
