---
title: "Démarrer, lire une application qui fonctionne"
order: 1
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Démarrer, lire une application qui fonctionne

Vous allez exécuter un programme d'inscription à des ateliers, puis suivre une réservation dans son code. Ce fichier est le point de départ commun des séances. Il fonctionne avec un tarif unique, des données en mémoire et des notifications simulées.

## Exécuter le point de départ

1. Télécharger <a href="/ressources/poo-patterns-frameworks/ateliers.ts" download="ateliers.ts">ateliers.ts</a> dans un dossier de travail.
2. Ouvrir un terminal dans ce dossier avec Node.js 24 disponible.
3. Exécuter le fichier.

```sh
node ateliers.ts
```

Le programme affiche exactement les quatre lignes suivantes si ses assertions réussissent.

```text
Vérifications réussies.
Ateliers au catalogue : 2
Réservations actives : 2
Notifications en mémoire : 4
```

Ces nombres résultent des opérations exécutées par les assertions en fin de fichier. Une **assertion** compare un résultat à ce qui est attendu. Si elle échoue, le programme s'arrête.

## Suivre une réservation dans le code

Lire d'abord les données, puis les opérations qui les utilisent :

| Élément du fichier | Ce qu'il représente |
| --- | --- |
| `ateliers` | Le catalogue, avec les capacités et les prix. |
| `reservations` | Les inscriptions actives et leur montant enregistré. |
| `notifications` | Des messages conservés en mémoire pour observer les confirmations et annulations. |
| `reserver` | La recherche de l'atelier, les contrôles, puis l'ajout d'une réservation. |
| `annuler` | Le retrait d'une réservation et l'ajout d'un message. |
| `listerAteliers` | Le calcul du nombre de places encore disponibles. |

Retrouver l'appel `reserver(1, " Lea@example.test ")`. Suivre la valeur de l'adresse jusqu'à son enregistrement. Repérer ensuite les lignes qui pourraient modifier une réservation ou une notification. Les refus arrivent avant ces modifications.

Pour vérifier cette lecture, répondre aux questions suivantes avant de modifier le fichier :

1. Pourquoi une seconde inscription avec `LEA@example.test` est-elle refusée ?
2. Où trouve-t-on le nombre de places restantes ? Est-ce une donnée mémorisée ou un calcul ?
3. Que devient le montant d'une ancienne réservation quand le prix de l'atelier change ?

La normalisation de l'adresse permet de repérer le doublon. Les places se calculent dans `listerAteliers`. Le montant appartient à la réservation créée ; le programme ne le recalcule pas depuis le catalogue à chaque lecture.

## Lire les règles avant de changer la structure

Repérez le catalogue, les réservations et les notifications. Suivez ensuite `reserver` depuis la recherche de l'atelier jusqu'au message de confirmation. Un schéma peut séparer la validation de l'adresse, la règle de capacité, le montant et l'enregistrement.

Les critères suivants sont des **invariants**, des règles qui doivent rester vraies pendant les évolutions du programme.

- Une réservation refusée n'ajoute ni réservation ni notification.
- Une adresse normalisée ne permet pas de réserver deux fois le même atelier.
- La capacité n'est pas dépassée dans cette simulation séquentielle.
- Un montant enregistré reste inchangé après une modification du prix au catalogue.
- Une annulation libère une place et produit une notification.
- Les identifiants ne sont pas réutilisés après une annulation.

Les assertions rendent ces comportements observables avant et après refactoring.

## Dessiner le modèle avant de le modifier

Reprendre le [modèle UML d'ateliers et de réservations](/poo-patterns-frameworks/01-uml/#dessiner-son-premier-modele). Retrouver ses données dans le fichier TypeScript, puis tracer le lien entre un atelier et ses réservations. Ajouter les multiplicités et lire la relation dans les deux sens.

Le fichier représente le participant par son adresse de courriel. Le modèle à trois classes du chapitre UML fait un autre choix pour discuter des relations. Représenter le programme tel qu'il est avant de proposer une nouvelle organisation. Le diagramme n'oblige pas à transformer tous ses objets en classes.

## Introduire une variation

Lire les [trois demandes d'évolution](/poo-patterns-frameworks/09-situations/), puis commencer par [ajouter un tarif avec Strategy](/poo-patterns-frameworks/02-strategy/). La séance propose de comparer une condition et une règle fournie à la réservation.

Pour chaque demande, prévoir le résultat avant d'écrire le changement. Ajouter une vérification de ce résultat, modifier le code, puis relancer les assertions déjà présentes. Garder une copie du point de départ pour pouvoir comparer les deux versions.

Le travail attendu comprend le code modifié, ses vérifications, un schéma utile et une décision de quelques phrases. Le [carnet des situations](/poo-patterns-frameworks/09-situations/#garder-la-raison-dune-decision-avec-un-adr) aide à noter les raisons de cette décision.

## Limites de la simulation

Les données disparaissent à chaque exécution. Les notifications sont des chaînes stockées en mémoire, aucun courriel n'est envoyé.
