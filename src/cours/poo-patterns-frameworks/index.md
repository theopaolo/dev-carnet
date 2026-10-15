---
title: 'POO, design patterns et frameworks'
order: 4
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# POO, design patterns et frameworks

Ada Tech School, M3. Vendredis **16 et 23 octobre 2026, de 9h30 à 16h**.

Une application fonctionne. Quelles décisions permettent de la faire évoluer sans compliquer chaque changement ? Pendant ces deux journées, nous lisons du TypeScript, dessinons des alternatives et justifions nos choix. Les patterns sont des outils à consulter, pas une liste à placer dans chaque projet.

## Objectif

À la fin du module, tu sais repérer les responsabilités d'une application, comparer deux organisations du code et expliquer le coût d'une abstraction. Tu sais aussi suivre qui appelle qui dans un framework frontend.

Prérequis utiles, sans maîtrise préalable des patterns. Lire des fonctions et objets TypeScript, comprendre un tableau, un événement DOM et une interface. La [fiche fondations](/poo-patterns-frameworks/01-fondations/) fournit les repères de POO.

## J1, faire évoluer une application existante

Le 16 octobre, nous travaillons sur une application de réservation d'ateliers déjà fonctionnelle.

| Horaire | Travail |
| --- | --- |
| 9h30–12h30 | Exécuter et cartographier l'existant. Introduire des tarifs variables. Dessiner deux options et prendre une première décision. |
| 12h30–13h30 | Repas. |
| 13h30–16h | Introduire une API externe puis plusieurs notifications. Comparer les conséquences, rédiger un mini ADR et, si utile, refactoriser une petite partie. |

## J2, concevoir un micro-framework UI

Le 23 octobre, nous reprenons le même domaine pour afficher les ateliers et les places disponibles.

| Horaire | Travail |
| --- | --- |
| 9h30–12h30 | Reconstituer le cycle événement, état, notification et rendu. Concevoir ensemble une API publique et dessiner qui appelle qui. |
| 12h30–13h30 | Repas. |
| 13h30–16h | Simuler une réservation puis le retrait d'une vue. Éprouver l'API, éventuellement coder un seul mécanisme et présenter les décisions. |

Les pauses sont libres dans chaque grand bloc. Le programme privilégie une discussion aboutie à une série de tâches terminées trop vite.

## Consignes et livrables

Travaillez en petits groupes. Avant de nommer un pattern, formulez le problème. Dessinez les responsabilités dans des boîtes, nommez les flèches et distinguez appels et données. Pour chaque contrainte, comparez deux options, dont la plus directe.

Conservez un schéma avant et après, un mini ADR par situation discutée et les preuves que les règles de réservation tiennent toujours. Pour J2, ajoutez l'API proposée et le cycle complet d'une action utilisateur. Le code reste facultatif après l'exécution du point de départ. Une décision argumentée de ne pas ajouter d'abstraction est recevable.

## Supports à garder ouverts

- [Départ de l'exercice et fichier TypeScript](/poo-patterns-frameworks/10-exercice/).
- [Trois situations progressives](/poo-patterns-frameworks/09-situations/).
- [POO, SOLID et responsabilités](/poo-patterns-frameworks/01-fondations/).
- [Strategy](/poo-patterns-frameworks/02-strategy/), [Observer](/poo-patterns-frameworks/03-observer/), [Factory](/poo-patterns-frameworks/04-factory/), [Adapter](/poo-patterns-frameworks/05-adapter/), [Decorator](/poo-patterns-frameworks/06-decorator/) et [Repository](/poo-patterns-frameworks/07-repository/).
- [Frameworks et inversion de contrôle](/poo-patterns-frameworks/08-frameworks/).
- [Fiche enseignant, conduite et adaptation](/poo-patterns-frameworks/11-enseignant/).

Les supports existants [Refactoriser](/lire-une-codebase/03-refactoriser/), [DRY, KISS et YAGNI](/lire-une-codebase/10-principes/) et [ADR](/architecture-logicielle/06-adr/) complètent ce module.
