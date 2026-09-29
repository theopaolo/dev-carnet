---
title: 'Design UX et UI'
order: 2
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
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
| [1–2. Préparer la réservation](/ux-ui/04-brief-et-entretiens/) | Choisir une activité, recueillir un récit d'inscription et en tirer les besoins | Un cadre avec l'activité, les difficultés et les réponses prévues dans le site |
| [3. Persona](/ux-ui/05-persona/) | Décrire un profil à partir du récit et du brief | Un persona et ses besoins pour l'inscription |
| [4. Story map et user stories](/ux-ui/06-user-stories/) | Organiser les actions du persona et définir la première version | La story map, trois stories et deux critères pour la réservation |
| [5. Journey](/ux-ui/07-journey/) | Dessiner le parcours, de la découverte de l'atelier à la séance | Le parcours, ses blocages et une amélioration |
| [6. Sitemap](/ux-ui/08-architecture-de-l-information/) | Organiser les pages du site en arbre | Le sitemap avec des noms de pages compréhensibles |

## Les ateliers UI

Gardez le brief, le persona et les user stories à portée de main. Chaque écran doit répondre à un besoin identifié dans ces documents.

| Atelier | Ce que vous faites | Rendu |
| --- | --- | --- |
| [Zoning](/ux-ui/09-zoning-et-wireframes/#le-zoning-1) | Placer les grandes zones de la fiche atelier selon les besoins du persona | Des rectangles nommés |
| [Prise en main de Figma](/ux-ui/09-zoning-et-wireframes/#prendre-en-main-figma) | Créer un écran, ajouter des formes et du texte, essayer l'auto layout | Une fiche atelier en gris et un bouton qui s'adapte au texte |
| [Wireframes](/ux-ui/09-zoning-et-wireframes/#les-wireframes) | Dessiner la liste des ateliers, la fiche et la réservation | Trois écrans et leurs états : confirmation, erreur, accord parental, séance complète |
| [Moodboard, facultatif](/ux-ui/12-typographie-et-couleurs/#le-moodboard-de-votre-atelier) | Rassembler des références visuelles pour l'activité choisie | Un collage, une palette et des essais de polices |
| [Styles](/ux-ui/13-style-guide-et-composants/#choisir-les-styles) | Définir la typographie, les couleurs et les espacements | Une planche de styles appliqués à une carte d'atelier |
| [Composants](/ux-ui/13-style-guide-et-composants/#creer-les-composants) | Créer un bouton, un champ et une carte réutilisables | Les composants avec leurs variantes et des instances |
| [Maquette](/ux-ui/14-maquette-et-test/#assembler-la-maquette) | Appliquer les styles aux wireframes et relier les écrans | Un prototype qui permet d'essayer la réservation |
| [Test et correction](/ux-ui/14-maquette-et-test/#tester-linscription) | Observer une personne utiliser le prototype, puis corriger un blocage | Les observations, la correction et le résultat du nouvel essai |

Les pages [Hiérarchie visuelle](/ux-ui/11-hierarchie-visuelle/) et [Typographie et couleurs](/ux-ui/12-typographie-et-couleurs/) expliquent les choix à faire pour la maquette. La page [User flow, séquence et UML](/ux-ui/10-user-flow-sequence-uml/) propose un atelier complémentaire pour vérifier les branches du parcours.

## Coder et présenter le projet

| Atelier | Ce que vous faites | Rendu |
| --- | --- | --- |
| 10. Coder et rendre accessible | Adapter la page `site/`, tester son accessibilité et corriger les problèmes | La page publiée et `audit.md` avec les observations avant et après correction |
| 11. Référencer | Écrire le `title` et la meta description, mesurer avec Lighthouse | `seo.md` avec les mesures et les modifications |
| [12. Présenter](/ux-ui/#presenter-le-projet) | Expliquer un choix de conception et montrer la page publiée | Une démonstration appuyée sur le prototype et les tests |

## Où rendre votre travail

Gardez vos travaux dans un seul fichier Figma ou Penpot et partagez son lien avec le formateur. Pour les schémas sur papier, ajoutez une photo au fichier.

Nommez les sections pour retrouver les rendus :

- « Roasting »
- « Audit UX »
- « 1–2. Préparer la réservation »
- « 3. Persona »
- « 4. Story map et user stories »
- « 5. Journey »
- « 6. Sitemap »
- « 7. Zoning et wireframes »
- « 8. UI et maquette »
- « 9. Test »

## Présenter le projet

Montrez un problème rencontré, votre solution et une correction issue d'un test. Appuyez-vous sur votre prototype et la page publiée.

Indiquez combien de personnes ont participé au test. Distinguez un objectif fixé au départ d'un résultat observé : n'annoncez pas de gain chiffré que vous n'avez pas mesuré.

## Le barème

| Évaluation | Points | Ce qui est vérifié |
| --- | --- | --- |
| UX | 25 | Persona, story map, stories et journey tirés des entretiens et du brief |
| UI | 10 | Maquette lisible, composants réutilisés, mêmes couleurs dans Figma et dans le CSS |
| Accessibilité | 30 | HTML correct, formulaire utilisable au clavier, `audit.md` rempli avec l'avant et l'après |
| SEO | 15 | `title` et description utiles, mesure Lighthouse avant et après |
| Compréhension | 20 | Épreuve et réponses pendant la démonstration |
