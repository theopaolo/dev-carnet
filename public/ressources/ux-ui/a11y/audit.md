# Diagnostic d’accessibilité

Prénom :
Date :
Site et URL des pages testées :
Tâche choisie :
Navigateur et version :
Système, lecteur d’écran et version :
Outil automatique et version :

Ce travail est un diagnostic pédagogique limité. Il ne produit pas de taux de conformité RGAA du site.

## Les tests réalisés

Indiquez pour chaque contrôle : "réussi sur l’élément testé", "échec observé", "non applicable" avec justification, ou "non testé". Un essai réussi ne valide pas à lui seul un critère sur toute la page.

| Contrôle | Élément, page et état testés | Manipulation exacte | Résultat et preuve |
| --- | --- | --- | --- |
| Clavier, ordre de tabulation (*tab order*) et absence de piège au clavier (*focus trap*) (7.3, 12.8, 12.9) | | | |
| Focus visible (10.7) | | | |
| Libellés et noms accessibles (11.1, 11.2, 11.9 ou 7.1 selon le contrôle) | | | |
| Formulaire en erreur (11.10, 11.11) | | | |
| Titres et structure (9.1, 9.2) | | | |
| Images et alternatives (1.1, 1.2, 1.3) | | | |
| Couleur et contraste (3.1, 3.2, 3.3) | | | |
| Texte agrandi à 200 % et redistribution (*reflow*) à 320 px (10.4, 10.11) | | | |
| Lecture d’un contrôle et de son état au lecteur d’écran (7.1) | | | |
| Analyse automatique et vérification d’un résultat | | | |

## Trois constats documentés

Dupliquez cette fiche pour chaque constat. Un constat conforme bien prouvé est utile. Ne fabriquez pas de défaut pour remplir le tableau.

- Page, élément et état :
- Étapes pour reproduire :
- Attendu et observé :
- Personne ou usage gêné, conséquence sur la tâche :
- Critère RGAA, test précis et lien :
- Preuve (capture annotée, HTML ou description reproductible) :
- Proposition concrète :
- Priorité et raison : blocage de la tâche, difficulté importante, gêne limitée.
- Retest prévu ou résultat réel :

Exemple : le "bouton" Recevoir les informations est un `div` avec `onclick`. Après Tab depuis le champ, il est sauté. Une personne au clavier ne peut pas envoyer la demande. Vérifier le critère 7.3, test 7.3.1. Remplacer par un bouton natif dans le formulaire, puis refaire le parcours avec Tab et Entrée. Une capture seule ne prouve pas l’échec clavier.

## Corrections locales

| Problème avant | Changement de code | Même test après | Reste à vérifier |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |

## Mon composant

- Fonction, nom accessible et source de ce nom :
- Pourquoi `aria-label` est utile ici, ou pourquoi je ne l’utilise pas :
- Touches utilisées et comportement attendu :
- États à annoncer :
- Manipulations et résultat du test :

## Limites et usage de l’IA

- Pages, états ou technologies non testés :
- Proposition de l’IA vérifiée et correction éventuelle :
- Ce que je peux démontrer moi-même :
