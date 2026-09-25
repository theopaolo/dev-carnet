---
title: 'Exercice : justifier ses choix'
order: 7
---

# Exercice : justifier ses choix techniques

> Objectif : représenter le projet, inventorier ses choix techniques, vérifier les arguments qui les soutiennent et documenter deux décisions dans des ADR.

## À produire

À la fin de l'exercice, conservez :

- une vue de contexte du système
- un inventaire des choix existants
- une fiche de stack indiquant le rôle de chaque technologie
- une liste séparant contraintes, critères, hypothèses et preuves
- un scénario de qualité mesurable
- une comparaison d'au moins deux options
- deux ADR

## 1\. Délimiter le système

Dessinez une vue de contexte avec le système, les personnes qui l'utilisent et les systèmes externes. N'ajoutez pas encore les frameworks ni la base de données. Cette vue fixe ce qui appartient au projet et ce qui dépend d'un tiers.

## 2\. Inventorier les choix existants

Listez les choix par niveau afin de ne pas mélanger une stratégie de déploiement avec une bibliothèque.

| Niveau | Exemples à chercher |
| --- | --- |
| système et déploiement | monolithe, applications séparées, hébergeur, base de données |
| rendu web et navigation | CSR, SSR, SSG, rendu hybride, SPA ou rechargement complet |
| organisation interne | couches, MVC, modules métier |
| interfaces | REST, format JSON, authentification, version des API |
| accès aux données | SQL direct, ORM, dépôt |
| dépendances | framework, bibliothèque HTTP, service tiers |

Pour chaque choix, notez son origine et la portée d'un changement.

| Choix | Origine | Parties concernées par un remplacement | Coût ou risque connu |
| --- | --- | --- | --- |
| SQLite | tutoriel initial | accès aux données, sauvegarde, déploiement | à mesurer |

Regroupez ensuite ces choix dans une fiche de stack. Précisez la technologie, sa version majeure, son rôle et les couches que la stack laisse ouvertes. Un acronyme comme MEAN ou TALL ne remplace pas cet inventaire.

## 3\. Classer les arguments

Reprenez chaque justification et classez ses affirmations.

| Décision argumentée | Préférence assumée | Choix par défaut non réexaminé |
| --- | --- | --- |
| des critères, un contexte et des conséquences existent | « j'aime bien », « j'avais envie d'apprendre » | copié d'un tutoriel, installé par réflexe |

Puis séparez les informations utilisées pour décider.

| Information | Formulation du projet | Vérification prévue |
| --- | --- | --- |
| Contrainte |     |     |
| Critère |     |     |
| Hypothèse |     |     |
| Preuve |     |     |

Une contrainte élimine une option. Un critère compare les options restantes. Une hypothèse demande une vérification. Une preuve cite une mesure, un document, un test ou une personne consultée.

## 4\. Écrire un scénario de qualité

Choisissez une qualité affectée par l'architecture, par exemple la performance, la disponibilité, la sécurité ou la maintenabilité. Décrivez la source, le stimulus, l'environnement, la partie concernée, la réponse et sa mesure.

```text
Source :
Stimulus :
Environnement :
Partie du système :
Réponse attendue :
Mesure :
```

Une mesure comme « moins de 300 ms » doit venir d'un besoin ou d'une expérience. Si elle n'est pas encore validée, marquez-la comme hypothèse et indiquez qui doit la confirmer.

## 5\. Comparer les options

Retirez d'abord les options qui ne respectent pas les contraintes. Comparez ensuite au moins deux options sur les mêmes critères. Pour chaque note ou appréciation, ajoutez une source ou le statut « hypothèse ».

Si une migration est proposée, décomposez son estimation : conversion des données, adaptation du code, tests, déploiement et retour arrière. Un essai limité peut remplacer une estimation fondée uniquement sur l'intuition.

## 6\. Rédiger deux ADR

1.  Confirmez un choix existant. Documentez son contexte, les alternatives considérées, les preuves disponibles, les hypothèses et au moins une conséquence négative.
2.  Proposez une alternative à un choix existant. Décrivez la migration, ses risques et les conditions qui feraient abandonner ou réexaminer la proposition.

## 7\. Relire avec une autre personne

Faites relire vos ADR par une personne qui ne connaît pas les discussions à l’origine des décisions. Elle utilise cette grille :

| Point de contrôle | Validé | À revoir | Commentaire |
| --- | --- | --- | --- |
| Le périmètre, les personnes et les systèmes externes sont identifiés. |     |     |     |
| Le choix affecte la structure, une qualité, une dépendance, une interface ou le déploiement. |     |     |     |
| Les contraintes sont séparées des critères. |     |     |     |
| Les hypothèses sont nommées et accompagnées d'une vérification prévue. |     |     |     |
| Les preuves indiquent leur source ou leur mesure. |     |     |     |
| Au moins deux options crédibles sont comparées sur les mêmes critères. |     |     |     |
| Un scénario de qualité contient une réponse mesurable. |     |     |     |
| Les conséquences positives et négatives sont décrites. |     |     |     |
| Le coût de migration est décomposé ou testé. |     |     |     |
| Le seuil de réexamen peut être observé. |     |     |     |
| Les vues et l'ADR décrivent les mêmes frontières et dépendances. |     |     |     |

La revue est terminée lorsque la personne qui relit peut expliquer la décision, identifier les incertitudes restantes et proposer une correction sans reprendre la discussion orale qui l'a précédée.
