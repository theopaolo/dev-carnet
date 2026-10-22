---
title: "Démarrer, lire une application qui fonctionne"
order: 1
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---

# Démarrer, lire une application qui fonctionne

Lancez un programme d'inscription à des ateliers, puis suivez une réservation dans son code. Il utilise un tarif unique, garde les données en mémoire et simule les notifications. Vous le ferez évoluer dans les séances suivantes.

## Exécuter le point de départ

1. Téléchargez <a href="/ressources/poo-patterns-frameworks/ateliers.ts" download="ateliers.ts">ateliers.ts</a> dans un dossier de travail.
2. Ouvrez un terminal dans ce dossier et assurez-vous que Node.js 24 est installé.
3. Exécutez le fichier.

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

Le programme repose sur une classe, `Inscriptions`. Son constructeur reçoit le catalogue des ateliers, et ses champs privés conservent les réservations, les notifications et le prochain identifiant. Le code extérieur passe par ses méthodes publiques. Les assertions lisent l'état avec deux getters, des accesseurs qui exécutent du code lors de la lecture d'une propriété. Ceux du programme renvoient des copies, si bien que modifier les valeurs reçues ne change pas les réservations et les notifications internes.

Repérez d'abord les données à l'aide du tableau suivant, puis lisez les opérations qui les utilisent :

| Élément du fichier | Ce qu'il représente |
| --- | --- |
| `ateliers` | Le catalogue, avec les capacités et les prix, transmis au constructeur. |
| `#reservations` | Les inscriptions actives et leur montant enregistré. Le getter `reservations` en renvoie une copie. |
| `#notifications` | Des messages conservés en mémoire pour observer les confirmations et annulations. Le getter `notifications` en renvoie une copie. |
| `#prochainId` | Le compteur qui attribue les identifiants. |
| `reserver()` | La recherche de l'atelier, les contrôles, puis l'ajout d'une réservation. |
| `annuler()` | Le retrait d'une réservation et l'ajout d'un message. |
| `listerAteliers()` | Le calcul du nombre de places encore disponibles. |

Le tableau `ateliers` reste partagé entre le programme et l'objet `inscriptions`. Quand les assertions modifient un prix au catalogue, la classe voit ce nouveau prix pour les réservations suivantes.

Retrouvez l'appel `inscriptions.reserver(1, " Lea@example.test ")`, puis suivez la valeur de l'adresse jusqu'à son enregistrement. Repérez ensuite les lignes qui peuvent modifier une réservation ou une notification. Remarquez que les contrôles provoquant un refus arrivent avant ces modifications.

Trois questions pour suivre le code :

1. Pourquoi une seconde inscription avec `LEA@example.test` est-elle refusée ?
2. Où trouve-t-on le nombre de places restantes ? Est-ce une donnée mémorisée ou un calcul ?
3. Que devient le montant d'une ancienne réservation quand le prix de l'atelier change ?

Le programme retire les espaces autour de l'adresse et la convertit en minuscules. Cette normalisation lui permet de reconnaître le doublon malgré les différences d'écriture. Le nombre de places disponibles se calcule dans la méthode `listerAteliers`. Quant au montant, il est enregistré dans la réservation lors de sa création et n'est pas recalculé depuis le catalogue à chaque lecture.

## Les règles de réservation

Le programme respecte les règles suivantes, appelées **invariants**.

- Une réservation refusée n'ajoute ni réservation ni notification.
- Une adresse normalisée ne permet pas de réserver deux fois le même atelier.
- La capacité n'est pas dépassée dans cette simulation séquentielle, où les réservations sont traitées l'une après l'autre.
- Un montant enregistré reste inchangé après une modification du prix au catalogue.
- Une annulation libère une place et produit une notification.
- Les identifiants ne sont pas réutilisés après une annulation.

Les assertions vérifient ces comportements avant et après une refactorisation, c'est-à-dire une réorganisation du code qui conserve son comportement observable.

## Le modèle en objets

Le fichier représente le participant par son adresse de courriel. Les ateliers et les réservations sont de simples objets de données, et seule `Inscriptions` est une classe. Le [modèle UML d'ateliers et de réservations](/poo-patterns-frameworks/01-uml/#dessiner-son-premier-modele) montre une autre représentation de ces mêmes notions, avec trois classes.

## Introduire une variation

Essayez d'[ajouter un tarif avec Strategy](/poo-patterns-frameworks/02-strategy/), puis relancez `node ateliers.ts` pour vérifier le résultat. Les [mises en situation](/poo-patterns-frameworks/09-situations/) proposent les évolutions suivantes. Repartez du programme initial pour chaque séance.

## Limites de la simulation

Les données restent en mémoire et ne sont pas conservées entre deux exécutions. De même, les notifications sont des chaînes de caractères enregistrées en mémoire pour observer le résultat des opérations. Aucun courriel n'est réellement envoyé.
