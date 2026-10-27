---
title: "Mini-blog ou quand se passer d'un backend"
order: 8
publishedAt: "2026-09-23"
updatedAt: "2026-10-26"
---
# Mini-blog ou quand se passer d'un backend

Vous avez peut-être déjà construit des applications avec une API et une base de données. Dans cette page, on se pose la question inverse : de quoi un site a-t-il réellement besoin, et quand peut-on se passer d'un backend ? On commence par un exercice d'architecture sur le site d'une association, puis vous construisez et publiez votre propre blog avec Astro.

**Objectifs**

- Choisir une architecture à la mesure des besoins, avec ou sans backend
- Découvrir Astro, un générateur de site statique (SSG), et son data layer
- Publier un site avec un déploiement automatisé par GitHub Actions
- Disposer d'un espace où publier sa veille

**Compétences travaillées**

- Préparer et documenter le déploiement d'une application
- Contribuer à la mise en production dans une démarche DevOps
- La veille, une compétence transversale

**Questions de départ**

- Faut-il toujours un backend ?
- Pourquoi un site statique alors que je sais construire des applications avec un backend ?
- Pourquoi apprendre Astro ou 11ty si je connais déjà React, Vue ou un autre framework ?
- Pourquoi développer un blog alors qu'on peut en créer un en quelques minutes ?

## Le brief

Une association publie des articles, des ressources et des événements. Elle dispose de peu de moyens et n'a pas de développeur pour assurer la maintenance. Elle veut un site performant, accessible et durable.

1. Prenez le temps de schématiser une architecture et vos choix techniques.
2. Faire le schéma... en mermaid ou dessing...
3. C'est bon ?
4. Maintenant l'association as de nouveaux besoins :
	- réduire ses coûts d'hébergement
	- tenir des centaines de milliers de visites après un passage à la télévision
	- laisser les bénévoles publier sans passer par Git
	- permettre aux visiteurs de s'inscrire aux événements

Modifiez votre schéma et pour chaque ajout, essayez d'estimer ce qu'il coûte en argent, en maintenance ou en complexité. Gardez ce schéma, vous y reviendrez à la fin de la page.

## Construire une fois ou à chaque requête

_Un SSG est un logiciel qui crée des sites web composés de pages statiques, généralement au format HTML._ [_src_](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9rateur_de_site_statique)

Un CMS comme WordPress génère chaque page côté serveur, à la demande. Une application avec une API fonctionne de la même façon : chaque visite déclenche un appel à l'API, qui interroge la base de données. Pour un article publié une fois et rarement modifié, ce calcul se répète à chaque visite alors que son résultat ne change pas. Un SSG construit donc les pages une seule fois, avant la mise en ligne, puis le serveur les sert telles quelles.

![Schéma des étapes d’un générateur de site statique.](/ressources/atelier-ssg/files/019e3f18-ab7a-753f-b39e-3b08f9cd423b/shapes_at_26-05-19_09.17.02.svg)

### Quand un backend devient nécessaire

Un SSG convient à un blog, une documentation ou un portfolio, parce que leur contenu est le même pour tous les visiteurs et ne change qu'au moment d'une publication. Un backend devient nécessaire quand le serveur doit répondre différemment selon la personne ou le moment : des comptes utilisateurs, des données privées, des contenus écrits par les visiteurs ou des données qui changent chaque minute. Entre les deux, des services externes couvrent une partie des besoins sans backend à maintenir, par exemple un formulaire hébergé ou un CMS branché sur Git.

Reprenez votre schéma. Si vous avez placé un serveur dès la première version, que vous coûte le pic de trafic ?

| Critère | SSG (Astro, Hugo, 11ty…) | Site avec backend (WordPress, API et BDD…) |
| --- | --- | --- |
| Performance | HTML pré-généré, servi rapidement, facilement distribuable via CDN | HTML généré côté serveur, avec possibilité de cache et CDN |
| Sécurité | Surface d'attaque publique réduite sans backend applicatif | Surface d'attaque plus importante : authentification, plugins, API, BDD |
| Hébergement | Hébergement statique simple, souvent gratuit pour de petits projets | Hébergement compatible avec le runtime, la BDD et les services nécessaires |
| SEO | HTML directement accessible aux moteurs de recherche | HTML également accessible, dépend surtout du contenu et de la configuration |
| Maintenance | Dépendances, build et pipeline à maintenir | Cœur, plugins, thèmes, serveur et BDD à maintenir |
| Contenus | Markdown, fichiers ou CMS externe, souvent reconstruits à la publication | Interface d'administration et publication immédiate |
| Versioning | Git possible pour le code et les contenus | Git pour le code, révisions des contenus dans le CMS |
| Fonctionnalités dynamiques | Nécessitent du JavaScript, des services externes ou un backend | Backend disponible pour comptes, commentaires, recherche, etc. |

_Pour approfondir ces notions, voir la page [Architecture logicielle](/architecture-logicielle/), qui explore les autres stratégies de rendu._

## Trouver son sujet
Que ce soit des questionnements, des ressources, des guides ou façons de faire ou autre, un "blog tech" reste une publication personnelles, sa forme, périodicité et longueur des article vous appartiens.

- [PentesterLab](https://pentesterlab.com/blog) : sécurité applicative
- [Les-Tilleuls.coop](https://les-tilleuls.coop/blog) : coopérative spécialisée dans les API et l'open source
- [Emmanuelle Aboaf](https://emmanuelle-aboaf.netlify.app/blog) : développement, accessibilité et expérience vécue du handicap
- [Alsacréations](https://www.alsacreations.com/actu/) : référence historique pour CSS, HTML, standards du Web, JavaScript et accessibilité
- [Maggie Appleton](https://maggieappleton.com/garden) : digital garden, dessin et écriture
- [Sam Rose](https://samwho.dev/) : ressources pédagogiques interactives
- [Lea Verou](https://lea.verou.me/) : CSS experte, très technique
- [Framablog](https://framablog.org/) : numérique libre
- [Access42](https://access42.net/blog/) : accessibilité web
- [Drew DeVault](https://drewdevault.com/) : culture du logiciel libre et infrastructures indépendantes

_Et pour encore plus de blogs, visitez [Glane](https://glane.ludique.dev/category/blog/)._

Posez-vous ensuite trois questions : sur quoi aimeriez-vous écrire, pour qui, et à quel rythme ? Pour commencer, une liste de liens commentés, une découverte par semaine ou une question en cours suffisent à nourrir un blog de veille. La page [Veille](/veille/) liste des sources.

## Construire son blog avec Astro

### Panorama de l'écosystème des SSG

- [Hugo](https://gohugo.io/) : générateur en Go, performant, avec un écosystème de thèmes
- [Zola](https://www.getzola.org/) : générateur en Rust, autonome, approche intégrée
- [Jekyll](https://jekyllrb.com/) : écosystème Ruby, historique du blog statique
- [11ty](https://www.11ty.dev/) : approche JavaScript minimaliste et templates flexibles
- [Astro](https://astro.build/) : composants, contenu structuré, rendu hybride et îlots

Un CMS qui s'appuie sur Git offre une interface d'édition et enregistre les contenus en Markdown dans le dépôt : [Pages CMS](https://pagescms.org/), [Sveltia](https://sveltiacms.app/en/), [Decap](https://decapcms.org/).

Un CMS headless stocke les contenus dans sa propre base et les expose par une API, sans s'occuper de l'affichage : [Directus](https://directus.com/), [Payload](https://payloadcms.com/), [Strapi](https://strapi.io/).

### Pourquoi Astro

Dans cette page, je vous suggère [**Astro**](https://astro.build/). C'est un SSG populaire qui accepte les composants de vos frameworks JS préférés : Svelte, Vue ou React. Il repose aussi sur l'architecture en îlots [_(Islands Architecture)_](https://docs.astro.build/en/concepts/islands/) : la page reste du HTML statique, et seuls les composants interactifs, les îlots, chargent du JavaScript.

Pour une alternative minimaliste, je vous recommande [**11ty**](https://www.11ty.dev/) (aussi appelé _Build Awesome_). Il génère les pages avec Node.js, et un simple fichier de configuration ajoute des fonctions comme des filtres de contenu ou le choix du moteur de templates (**Liquid**, **Nunjucks** ou **JSX**).

| Astro | 11ty |
| --- | --- |
| Syntaxe proche de HTML/JSX | Minimaliste, zéro JS côté client par défaut |
| Composants réutilisables natifs | Supporte Markdown, Nunjucks, Liquid, JSX… |
| Supporte Svelte, Vue, React en îlots | Data Cascade : données globales, par dossier ou par page |
| Islands Architecture : du JS seulement dans les composants qui en ont besoin | Build rapide |
| Content Collections pour le data layer | Simple configuration en JavaScript |

### Le data layer

Le _data layer_ (couche de données) relie différentes sources de contenu (fichiers `.md`, API, JSON) aux templates qui les affichent. Cette couche normalise, filtre et enrichit les données avant de les injecter dans les pages.

```mermaid
flowchart LR
    A["Fichiers Markdown"] --> D
    B["Données JSON"] --> D
    C["API"] --> D

    D["Data layer<br/>Valider et normaliser<br/>Filtrer et enrichir"]
    D --> E["Templates<br/>Afficher les données"]
    E --> F["Pages HTML"]
```

**Sans data layer**, chaque template lit directement les fichiers source et la logique de transformation se retrouve copiée dans plusieurs templates. **Avec un data layer**, les données se transforment à un seul endroit et les templates ne s'occupent que de l'affichage.

Dans **Astro**, le data layer passe par les [Content Collections](https://docs.astro.build/fr/guides/content-collections/) : vous définissez un schéma (Zod) pour vos articles, et Astro valide chaque fichier `.md` à la compilation.

```mermaid
flowchart TD
    A["Markdown / MDX / JSON"] --> B["Content Collections : loader + schéma Zod"]
    B -. getCollection() .-> C["Pages et composants Astro"]
    C --> D["Build Astro dans GitHub Actions"]
    D --> E["HTML / CSS statique + JS en îlots"]
    E --> F["GitHub Pages"]
    G["Îlots interactifs"] --> C
```

Dans **11ty**, le data layer passe par la [Data Cascade](https://www.11ty.dev/docs/data-cascade/) : des fichiers `.json`, `.js` ou `.11tydata.js` fournissent des données globales ou par dossier.

Le data layer sépare _ce que vous savez_ (vos données) de _la façon de l'afficher_ (vos templates).

### Pas à pas

**1** Créez le projet à partir du modèle de blog officiel.

```sh
npm create astro@latest -- --template blog
```

**2** Ouvrez `src/content.config.ts`. La collection `blog` décrit les articles : son schéma liste les champs attendus dans le frontmatter, l'en-tête placé entre deux lignes `---` en haut de chaque fichier Markdown. Astro arrête la compilation si un article ne respecte pas ce schéma.

**3** Ajoutez une collection `ressources` pour votre veille. Elle met en place le [data layer](#le-data-layer) décrit plus haut : `src/content.config.ts` le déclare, le dossier `src/content/ressources/` le remplit, et les pages le lisent avec `getCollection()`.

On ajoute notre nouvelle collection dans `src/content.config.ts`, sous la collection `blog`. Le loader `glob` indique à Astro où trouver les fichiers Markdown, et le schéma liste les champs attendus. `z.enum` limite le type à des valeurs predéfinies.

```ts
const ressources = defineCollection({
  loader: glob({ base: "./src/content/ressources", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description : z.string(),
    url: z.url(),
    category: z.enum(["audio", "vidéo",  "gif"]),
  }),
});

// On export la nouvelle collection
export const collections = { blog, ressources };
```

Créez ensuite le dossier `src/content/ressources/` et un premier fichier, par exemple `docs-astro.md`. Astro fabrique le slug de l'url à partir du nom du fichier `mon-site.fr/docs-astro/`

```md
---
title: "Documentation d'Astro"
description: "Documentation officielle d'Astro"
url: "https://docs.astro.build/fr/"
category: "outil"
---

Quelque ligne sur ce quie cette ressource apporte.
```

Le dossier `src/pages` contient les routes du site : chaque fichier y devient une URL. Créez `src/pages/ressources/index.astro`, qui s'affiche quand on visite l'adresse `/ressources/` et nous serviras à lister les ressources. 

```astro
---
import { getCollection } from "astro:content";
import BaseHead from "../../components/BaseHead.astro";
import Footer from "../../components/Footer.astro";
import Header from "../../components/Header.astro";

const ressources = await getCollection("ressources");
---

<html lang="fr">
  <head>
    <BaseHead title="Ressources" description="Ma veille" />
  </head>
  <body>
    <Header />
    <main>
      <h1>Ressources</h1>
      <ul>
        {ressources.map((ressource) => (
          <li>
            <a href={`/ressources/${ressource.id}/`}>{ressource.data.title}</a>
            ({ressource.data.category})
          </li>
        ))}
      </ul>
    </main>
    <Footer />
  </body>
</html>
```

Créez enfin `src/pages/ressources/[...slug].astro`, qui affiche une ressource. Les crochets signalent une route dynamique.

```astro
---
import { getCollection, render } from "astro:content";
import BaseHead from "../../components/BaseHead.astro";
import Footer from "../../components/Footer.astro";
import Header from "../../components/Header.astro";

// la fonction `getStaticPaths()` renvoie un chemin par fichier de `src/content/ressources/`
export async function getStaticPaths() {
  const ressources = await getCollection("ressources");
  return ressources.map((ressource) => ({
    params: { slug: ressource.id },
    props: ressource,
  }));
}

const ressource = Astro.props;
// La fonction `render()` transforme le Markdown de la ressource en composant `<Content />`
const { Content } = await render(ressource);
---

<html lang="fr">
  <head>
    <BaseHead title={ressource.data.title} description={ressource.data.description} />
  </head>
  <body>
    <Header />
    <main>
      <h1>{ressource.data.title}</h1>
      <p><a href={ressource.data.url}>Voir la ressource</a> ({ressource.data.category})</p>
      <Content />  <!-- Le contenu de la page .md, const { Content } = await render(ressource); --->
    </main>
    <Footer />
  </body>
</html>
```

Lancez `npm run dev` et ouvrez `/ressources/` : la liste affiche votre ressource, et le lien mène à sa page.

### Tester le schéma en local

Ouvrez une ressource et donnez-lui un type que le schéma refuse, par exemple `type: "podcast"`. Lancez ensuite la commande que GitHub Actions exécutera à chaque mise en ligne :

```sh
npm run build
```

Le build s'arrête et indique la collection, le fichier et le champ fautifs :

```
[InvalidContentEntryDataError] ressources → example data does not match collection schema.

  type: Invalid option: expected one of "article"|"vidéo"|"outil"
```

Remettez une valeur valide et relancez le build. Le schéma contrôle donc la qualité des contenus avant la mise en ligne : une erreur dans un fichier bloque la publication au lieu de produire une page cassée en production.

> **À noter** : le schéma ne vérifie pas les liens, les images ou les dates.

Maintenant ajouter un nouvelle `collection "evenements"`, avec une `url` vers un formulaire d'inscription, une `date` et un `lieu`. 

## Mettre en ligne sur GitHub Pages

GitHub Pages permet de servir gratuitement des fichiers statiques depuis un dépôt Git.

```mermaid
flowchart LR
    A["Écriture Markdown"] --> B["Git push"]
    B --> C["GitHub Actions"]
    C --> D["Build Astro"]
    D --> E["GitHub Pages"]
    E --> F["Site public"]
```

### Mise en place pas à pas

**1** **Créez un dépôt GitHub** nommé `votre-username.github.io`. GitHub publie ce dépôt à la racine de `https://votre-username.github.io`, si bien que les liens du site fonctionnent sans modification.

**2** **Indiquez l'adresse du site** dans `astro.config.mjs`, à la place de `https://example.com` :

```js
site: 'https://votre-username.github.io',
```

Si vous donnez un autre nom au dépôt, GitHub le publie dans un sous-dossier, `https://votre-username.github.io/nom-du-repo/`. Ajoutez alors `base: '/nom-du-repo'` sous la ligne `site`. Un lien écrit en dur comme `/blog/` mène ensuite à une 404, et le modèle de blog écrit tous ses liens ainsi. Préfixez-les avec `import.meta.env.BASE_URL`, par exemple `href={import.meta.env.BASE_URL + href}` dans `src/components/HeaderLink.astro`, puis dans `src/components/Header.astro`, `src/pages/blog/index.astro` et `src/pages/ressources/index.astro`. Avec 11ty, l'option équivalente à `base` s'appelle `pathPrefix`.

**3** **Créez le workflow GitHub Actions** dans `.github/workflows/deploy.yml`. Ce fichier lance le build et le déploiement à chaque `git push`. La documentation d'Astro fournit le fichier complet : [déployer sur GitHub Pages](https://docs.astro.build/fr/guides/deploy/github/).

**4** **Activez GitHub Pages** dans les settings du dépôt : _Settings → Pages → Source : GitHub Actions_.

**5** **Poussez votre code** avec `git push`. Le site est en ligne en 1 ou 2 minutes à l'adresse indiquée dans l'onglet Pages.

Si le build échoue, par exemple parce qu'un contenu ne respecte pas le schéma, le workflow s'arrête avant le déploiement et le site en ligne reste dans son état précédent. L'onglet _Actions_ du dépôt affiche alors le même message d'erreur qu'en local.

**Astuce :** pour un domaine personnalisé, ajoutez un fichier `CNAME` (gratuit côté GitHub, le domaine reste à acheter).

## Faire évoluer l'architecture

- Vos lecteurs souhaitent pouvoir commenter. [giscus](https://giscus.app/fr) stocke les commentaires dans les discussions GitHub.
- Vos lecteurs veulent se tenir informé des nouveaux articles. Ajouter un flux RSS, le template blog possède déjà cette fontionnalité (`src/pages/rss.xml.js`).
- Pour ajouter de la recherche il exite [Pagefind](https://pagefind.app/).
- Vous voulez publier depuis votre téléphone, sans Git. Branchez [Pages CMS](https://pagescms.org/) ou [Sveltia](https://sveltiacms.app/en/) à votre dépôt.

Chacune de ces solutions ajoute une brique sans avoir beosin d'ajouter un de serveur et du code backend. Cepandant, si jamais on as besoin d'un espace personnel ou bien que les contenus soient mis à jour à l minute, dans ce cas un serveur est nécessaire : le chapitre [Frontend, backend et rendu](/architecture-logicielle/02-rendu-web/) présente les stratégies de rendu qui peuvent y répondre.

  ## Retour au schéma d'architecture

  Revenons au schéma de l'association et ses besoins. On peut répondre à une partie avec les mêmes briques que notre SSG : Publication via un CMS git pour les bénévoles, les inscriptions peuvent passer par un formulaire hébergé sur un autres service (tally, google form), et pour la monté en charge et le budget; l'hébergement statique absorbe à la fois les coûts et le pic de trafic, puisque GitHub sert les fichiers à travers un CDN (Content Delivery Network).
  
  Le schéma ci-dessous rassemble ces briques :

  ```mermaid
  flowchart TD
    B["Bénévole"] -->|"remplit un formulaire"| CMS["Pages CMS ou Sveltia"]
    CMS -->|"commit d'un fichier Markdown"| G["Dépôt GitHub : articles, ressources, événements"]
    G -->|"chaque commit déclenche"| GA["GitHub Actions : build Astro et validation Zod"]
    GA -->|"déploie le HTML"| P["GitHub Pages, servi par un CDN"]
    V["Visiteur"] -->|HTTPS| P
    V -->|"s'inscrit à un événement"| T["Formulaire hébergé, par exemple Tally"]
  ```

  Reprenez le schéma que vous avez dessiné au début de la page et comparez-le avec cette solution. À l'écrit, répondez aux questions suivantes :
  
  1. Que changez-vous dans votre schéma ?
  2. Pourquoi le changez-vous ?
  3. À quoi renoncez-vous en échange ?
  
  Par exemple, pour les inscriptions aux événements :
  
  > 1. Je remplace la table `inscriptions` et l'API qui l'alimente par un formulaire hébergé sur un service comme Tally.
  > 2. L'association n'a pas de développeur pour mettre à jour un serveur et sa base de données. Le service hébergé tient aussi le pic de trafic après le passage à la télévision.
  > 3. Les données des inscrits sont stockées chez ce service et non chez l'association. Je dois donc vérifier où elles sont hébergées et en informer les inscrits (voir la page [RGPD](/rgpd/)).
  
  Ces trois réponses gardent la trace de votre choix : dans six mois, vous saurez encore pourquoi l'architecture a cette forme. Ce type de trace s'appelle un [ADR](/architecture-logicielle/06-adr/).
  
  Répondez enfin aux questions de départ, en une ou deux phrases chacune. Pour la troisième, le SSG existe aussi dans les frameworks que vous connaissez : Next.js (`output: 'export'`), Nuxt (`nuxt generate`) et SvelteKit (`adapter-static`) génèrent un site statique, donc ce que vous avez appris ici s'applique aussi à eux.

## Et après : votre blog de veille
La veille fait partie des compétences transversales attendues du métier de dev. Avec votre blog maintenant en ligne, vous pouvez y publier vos découvertes, questionnements, expérimentations etc. C'est une vitrine supplémentaire sur vous que vous pourrez partager.

**Idées pour faire évoluer votre site**

- Ajouter un champ `tags` à la collection `ressources`, avec une valeur par défaut (`z.array(z.string()).default([])`) pour que les ressources sans tags restent valides, puis générer une page par tag. Le fichier `src/pages/tags/[tag].astro` exporte une fonction `getStaticPaths()` qui renvoie la liste des tags, et Astro génère une page HTML par tag au moment du build. Le tutoriel d'Astro détaille cette étape : [générer des pages d'étiquettes](https://docs.astro.build/fr/tutorial/5-astro-api/2/).
- Filtrer les ressources par type ou par tag dans un îlot Svelte, Vue ou React.
- Récupérer des contenus depuis une API au moment du build, avec un loader de Content Collections.
- Dessiner l'architecture qui intégrerait un CMS headless, puis argumenter les compromis.
