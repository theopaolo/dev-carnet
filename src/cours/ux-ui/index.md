---
title: 'Design UX et UI'
order: 2
publishedAt: "2026-09-27"
updatedAt: "2026-10-01"
---

# Design UX et UI

## Le projet

Vous concevez le parcours d'inscription à une séance d'essai gratuite à la MJC des Tilleuls : choix d'un atelier, réservation et confirmation. Le [brief](/ux-ui/04-brief-et-entretiens/) précise les contraintes.

Les exemples suivent Inès, qui commande dans l'appli d'un snack. Dans les ateliers, vous appliquez ces méthodes au site de la MJC, depuis les premiers entretiens jusqu'au test de réservation.

Liens de travail :

- [Discord](https://discord.gg/Nq42Qxg2K)
- [Tableau tldraw](https://www.tldraw.com/f/Z7UQceeqciIkih4lfWoN8?d=v0.0.1496.933.page)
- [Figma](https://www.figma.com/signup) ou [Penpot](https://penpot.app/)
- [draw.io](https://app.diagrams.net/), gratuit et sans compte, pour dessiner les schémas : sitemap, journey, user flow

## Les ateliers UX

Les pages [UX et UI](/ux-ui/01-ux-et-ui/) et [Lois de l'UX](/ux-ui/02-lois-de-l-ux/) expliquent les notions utilisées dans ces ateliers.

| Atelier | Ce que vous faites | Rendu |
| --- | --- | --- |
| [Roasting](/ux-ui/01-ux-et-ui/#le-roasting) | Examiner l'inscription sur un site de MJC ou de centre socioculturel | Une idée à reprendre, un problème à éviter et une capture |
| [Audit UX](/ux-ui/03-audit-ux/) | Réaliser une tâche et repérer ce qui aide ou gêne | Des observations reliées aux lois UX, une capture et une amélioration |
| [1–2. Préparer la réservation](/ux-ui/04-brief-et-entretiens/) | Choisir une activité, recueillir un récit d'inscription et en tirer les besoins | Une frame avec l'activité, les difficultés et les réponses prévues dans le site |
| [3. Persona](/ux-ui/05-persona/) | Décrire un profil à partir du récit et du brief | Un persona et ses besoins pour l'inscription |
| [4. Story map et user stories](/ux-ui/06-user-stories/) | Organiser les actions du persona et définir la première version | La story map, trois stories et deux critères pour la réservation |
| [5. Journey](/ux-ui/07-journey/) | Dessiner le parcours, de la découverte de l'atelier à la séance | Le parcours, ses blocages et une amélioration |
| [6. Sitemap](/ux-ui/08-architecture-de-l-information/) | Organiser les pages du site en arbre | Le sitemap avec des noms de pages compréhensibles |

## Les ateliers UI

Travaillez dans un fichier personnel nommé "MJC des Tilleuls, votre prénom". Indiquez l'origine des éléments UX repris d'un travail de groupe. Créez vos propres écrans et composants, puis faites vos corrections.

### Construire la maquette dans Figma

À partir de vos wireframes, préparez les styles et les variables, créez les composants, puis assemblez et testez la maquette. Adaptez au moins la fiche atelier au mobile et au desktop.

Le moodboard et les harmonies colorées sont des approfondissements facultatifs. Pour l'atelier, vous pouvez utiliser la mini-charte du cours.

Gardez le brief, le persona et les user stories à portée de main. Chaque écran doit répondre à un besoin identifié dans ces documents.

| Atelier | Ce que vous faites | Rendu |
| --- | --- | --- |
| [Zoning](/ux-ui/09-zoning-et-wireframes/#le-zoning-1) | Placer les grandes zones de la fiche atelier selon les besoins du persona | Des rectangles nommés |
| [Prise en main de Figma](/ux-ui/09-zoning-et-wireframes/#prendre-en-main-figma) | Créer un écran, ajouter des formes et du texte, essayer l'auto layout | Une fiche atelier en gris et un bouton qui s'adapte au texte |
| [Wireframes](/ux-ui/09-zoning-et-wireframes/#les-wireframes) | Dessiner la liste des ateliers, la fiche et la réservation | Trois écrans et leurs états : confirmation, erreur, accord parental, séance complète |
| [Styles et variables](/ux-ui/13-style-guide-et-composants/#choisir-les-styles) | Appliquer la charte, nommer les tokens et vérifier que les éléments liés se mettent à jour | Quatre styles de texte, des variables et une carte d'atelier |
| [Composants](/ux-ui/13-style-guide-et-composants/#creer-les-composants) | Créer un bouton et un champ, puis une carte si vous avez terminé | Les états, deux instances et une note d’utilisation |
| [Maquette](/ux-ui/14-maquette-et-test/#assembler-la-maquette) | Appliquer les styles, faire la fiche en mobile et en desktop, relier les écrans | Le prototype, son schéma d'enchaînement et les notes pour le code |
| [Test et correction](/ux-ui/14-maquette-et-test/#tester-linscription) | Observer une personne utiliser le prototype, puis corriger un blocage | Les observations, la correction et le résultat du nouvel essai |

Consultez [Hiérarchie visuelle](/ux-ui/11-hierarchie-visuelle/) et [Typographie et couleurs](/ux-ui/12-typographie-et-couleurs/) pour choisir les styles. La page [User flow, séquence et UML](/ux-ui/10-user-flow-sequence-uml/) explique le schéma d'enchaînement à rendre avec la maquette. Les diagrammes de séquence et d'états sont facultatifs.

## Accessibilité

Apprenez à repérer une barrière, à la tester et à vérifier la correction. Vous appliquerez ces tests à votre projet MJC et ajouterez les résultats au dossier.

- [HTML, accessibilité et ARIA](/ux-ui/15-accessibilite-html-et-aria/)
- [Tester et documenter l’accessibilité](/ux-ui/16-tester-et-auditer/)
- [Atelier : tester et corriger une page](/ux-ui/17-atelier-accessibilite/)

## Coder et présenter le projet

| Atelier | Ce que vous faites | Rendu |
| --- | --- | --- |
| 10. Coder et rendre accessible | Adapter la page `site/`, tester son accessibilité et corriger les problèmes | La page publiée et, dans le dossier, les observations avant et après correction |
| 11. Référencer | Écrire le `title` et la meta description, mesurer avec Lighthouse | `seo.md` avec les mesures et les modifications |
| [12. Présenter](/ux-ui/#presenter-le-projet) | Expliquer un choix de conception et montrer la page publiée | Une démonstration appuyée sur le prototype et les tests |

## Le dossier à rendre

Rassemblez les rendus dans un dossier "Projet UX/UI, accessibilité et SEO", dans l'ordre ci-dessous.

### Introduction

- Contexte et objectif du projet, à partir du [brief](/ux-ui/04-brief-et-entretiens/).

### UX

1. [Audit UX](/ux-ui/03-audit-ux/) du site existant : captures annotées, [lois UX](/ux-ui/02-lois-de-l-ux/) et principes de la Gestalt utilisés
2. Deux fiches [persona](/ux-ui/05-persona/) : besoins, motivations et difficultés
3. [User journey](/ux-ui/07-journey/) : reprendre et adapter celui de tldraw ou en créer un. Indiquez s'il décrit le parcours actuel ou le parcours proposé
4. [User stories](/ux-ui/06-user-stories/) : "En tant que…, je veux…, afin de…"
5. [Sitemap](/ux-ui/08-architecture-de-l-information/) du site de la MJC des Tilleuls
6. [Story mapping](/ux-ui/06-user-stories/) du parcours d'inscription : organiser les étapes et prioriser les fonctionnalités

### UI

1. [Zoning](/ux-ui/09-zoning-et-wireframes/#le-zoning-1)
2. [Wireframes](/ux-ui/09-zoning-et-wireframes/#les-wireframes) des écrans du parcours choisi
3. [Style guide](/ux-ui/13-style-guide-et-composants/) : échelle typographique et palette de couleurs
4. [Composants](/ux-ui/13-style-guide-et-composants/#creer-les-composants) réutilisables et leurs principaux états
5. [Maquettes](/ux-ui/14-maquette-et-test/#assembler-la-maquette) en couleur
6. [Prototype](/ux-ui/14-maquette-et-test/) cliquable à partir des wireframes ou des maquettes

### Accessibilité

1. Les problèmes trouvés sur `a-corriger.html` et sur un site existant : où, qui est gêné, quelle correction.
2. Trois corrections, avec le test avant et après.
3. Votre fichier `corrige.html`.

Les [consignes de l’atelier](/ux-ui/17-atelier-accessibilite/) détaillent chaque étape.

## Présenter le projet

Montrez un problème rencontré, votre solution et une correction issue d'un test. Appuyez-vous sur votre prototype et la page publiée.

## Le barème

Ce barème s'applique à chaque personne.
| Évaluation | Points | Ce qui est vérifié |
| --- | --- | --- |
| UX | 25 | Persona, story map, stories et journey tirés des entretiens et du brief |
| UI | 10 | Maquette adaptée au mobile, schéma, tokens appliqués, composants et états expliqués. Correspondance avec le CSS vérifiée dans la page codée |
| Accessibilité | 30 | HTML correct, formulaire utilisable au clavier, problèmes et corrections notés dans le dossier avec l'avant et l'après |
| SEO | 15 | `title` et description utiles, mesure Lighthouse avant et après |
| Compréhension | 20 | Épreuve et réponses pendant la démonstration |

## Le lien avec le titre DWWM

Ce module vous prépare à la compétence de maquettage du [titre professionnel DWWM, niveau 5, RNCP37674](https://www.francecompetences.fr/recherche/rncp/37674/). Les maquettes doivent répondre au besoin, respecter la charte et prévoir l'accessibilité et l'affichage mobile. Joignez un schéma d'enchaînement des écrans.
