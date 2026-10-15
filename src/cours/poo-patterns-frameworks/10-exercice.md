---
title: "Départ de l'exercice TypeScript"
order: 10
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Départ de l'exercice TypeScript

Le programme gère des ateliers, leurs réservations, une capacité, un tarif unique et une annulation. Les notifications sont des messages en mémoire. Le code regroupe volontairement plusieurs responsabilités dans les opérations de réservation. Il fonctionne avant le refactoring.

## Exécuter le point de départ

1. Télécharger [ateliers.ts](/ressources/poo-patterns-frameworks/ateliers.ts) dans un dossier de travail.
2. Ouvrir un terminal dans ce dossier avec Node.js 24 disponible.
3. Exécuter le fichier.

```sh
node ateliers.ts
```

Le fichier n'installe aucune dépendance et n'utilise pas le réseau. Node retire les annotations TypeScript pour exécuter le code. Il ne vérifie pas les types.

Le résultat attendu est le suivant.

```text
Vérifications réussies.
Ateliers au catalogue : 2
Réservations actives : 2
Notifications en mémoire : 4
```

Une assertion qui échoue arrête le programme avec une erreur. Les vérifications couvrent notamment la capacité, les doublons, les entrées invalides, le montant et l'annulation.

## Cartographier avant de modifier

Repérez les données puis dessinez le trajet d'une réservation. Où vérifie-t-on les places ? Où calcule-t-on le montant ? Quand ajoute-t-on la notification ? Choisissez ensuite la [première situation](/poo-patterns-frameworks/09-situations/#situation-1-des-tarifs-qui-varient).

Conservez les assertions et relancez le fichier après chaque modification. Lors d'un refactoring, les montants et erreurs attendus restent identiques. Quand une contrainte ajoute une fonctionnalité, ajoutez d'abord un cas qui montre le nouveau comportement attendu.

## Contrats et limites

Une réservation refusée n'ajoute ni réservation ni notification. Une annulation libère une place et produit une seule notification. Un montant déjà enregistré reste inchangé. Les identifiants ne sont pas réutilisés après annulation.

Le fichier est une simulation sur un seul processus. Il perd les données à chaque exécution, ne traite ni concurrence ni paiement et effectue seulement une vérification de forme minimale de l'adresse courriel. Ces limites fournissent des questions pour la situation 2. Elles ne demandent pas de construire un backend pendant le cours.
