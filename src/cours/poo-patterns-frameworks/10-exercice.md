---
title: "Faire évoluer une application TypeScript"
order: 10
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Faire évoluer une application TypeScript

Le programme gère des ateliers, les réservations, la capacité, un tarif unique et les annulations. L'exercice consiste à identifier ses responsabilités puis à modifier leur organisation selon un changement de contrainte.

## Exécuter le point de départ

1. Télécharger <a href="/ressources/poo-patterns-frameworks/ateliers.ts" download="ateliers.ts">ateliers.ts</a> dans un dossier de travail.
2. Ouvrir un terminal dans ce dossier avec Node.js 24 disponible.
3. Exécuter le fichier.

```sh
node ateliers.ts
```

Le fichier fonctionne sans dépendance ni réseau. Node.js retire les annotations TypeScript. Cette exécution [ne vérifie pas les types](https://nodejs.org/docs/latest-v24.x/api/typescript.html).

Le programme affiche exactement les quatre lignes suivantes si ses assertions réussissent.

```text
Vérifications réussies.
Ateliers au catalogue : 2
Réservations actives : 2
Notifications en mémoire : 4
```

Ces nombres résultent des opérations exécutées par les assertions. Une assertion qui échoue arrête le programme.

## Lire les règles avant de changer la structure

Repérez le catalogue, les réservations et les notifications. Suivez ensuite `reserver` depuis la recherche de l'atelier jusqu'au message de confirmation. Un schéma peut séparer la validation de l'adresse, la règle de capacité, le montant et l'enregistrement.

Les critères suivants décrivent le comportement à préserver.

- Une réservation refusée n'ajoute ni réservation ni notification.
- Une adresse normalisée ne permet pas de réserver deux fois le même atelier.
- La capacité n'est pas dépassée dans cette simulation séquentielle.
- Un montant enregistré reste inchangé après une modification du prix au catalogue.
- Une annulation libère une place et produit une notification.
- Les identifiants ne sont pas réutilisés après une annulation.

Les assertions rendent ces comportements observables avant et après refactoring.

## Introduire une variation

Commencez par l'[étude des tarifs](/poo-patterns-frameworks/09-situations/#situation-1-des-tarifs-qui-varient). Dessinez une condition locale et une règle fournie à la réservation. Notez ce qui change dans les appels, les données enregistrées et les vérifications.

Ajoutez un cas qui attend 1 001 centimes pour un prix de 2 001 centimes au tarif solidaire. Modifiez ensuite le calcul pour satisfaire ce cas sans casser les précédents. Le montant final reste enregistré dans la réservation.

Les autres [études de cas](/poo-patterns-frameworks/09-situations/) se traitent avec des réponses et pannes simulées. Un mini ADR conserve la décision.

## Limites de la simulation

Les données disparaissent à chaque exécution. Les notifications sont des chaînes stockées en mémoire, aucun courriel n'est envoyé. La vérification d'adresse contrôle une forme minimale, pas l'existence de la boîte. Le programme ne gère ni paiement, ni appels concurrents, ni transactions distribuées.

Le succès des assertions confirme les comportements couverts dans ce processus. Il ne démontre pas qu'un stockage distant préserverait les mêmes garanties. Cette différence fait partie de l'analyse d'architecture.
