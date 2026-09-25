---
title: "Documenter son projet web"
order: 0
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Documenter son projet web

Ce cours t'aide à documenter un projet web que tu as déjà développé. L'objectif est qu'une autre personne puisse le lancer, le comprendre et le modifier sans tes explications à l'oral.

Tu peux travailler sur ton projet ou sur la démonstration fournie. Prépare un éditeur et un lecteur Markdown. Les schémas sont fournis en SVG, avec leurs sources textuelles Mermaid ou Mocodo. Le kit exécutable utilise Node.js 24. La génération complète du site utilise aussi Python 3.12.

## L'exemple suivi dans le cours

**Réserve ta place** est une application fictive pour une association qui organise des ateliers de poterie. L'organisateur publie les dates et le nombre de places. Les participants choisissent un atelier et réservent une place.

Un « atelier » désigne une séance à une date précise. Une « réservation » relie une personne à cette séance.

Le [kit de démonstration](/documentation/10-demonstration/) fournit les règles de réservation en JavaScript, des tests et des scénarios BDD. Il fonctionne en mémoire. L’interface web, PostgreSQL et l’envoi de courriels des exemples d’architecture restent fictifs. Les commandes du kit sont exécutables depuis la racine de ce dossier. Les exemples concernant ton application sont à adapter.

## Parcours

Chaque chapitre explique une méthode, l'illustre et propose un exercice sur ton projet.

| Chapitre | Ce que tu apprendras à faire |
| --- | --- |
| [1. Pourquoi documenter](/documentation/01-pourquoi-documenter/) | Repérer les informations qui manquent à une personne qui découvre le projet |
| [2. Organiser les contenus](/documentation/02-organiser-les-contenus/) | Choisir où placer une procédure, une règle ou une explication |
| [3. Écrire clairement](/documentation/03-ecrire-clairement/) | Remplacer les phrases vagues par des informations précises |
| [4. README et guides pratiques](/documentation/04-readme-et-guides-pratiques/) | Présenter le projet et décrire les étapes d'une tâche |
| [5. Architecture avec C4](/documentation/05-architecture-c4/) | Montrer les applications, les stockages et leurs échanges |
| [6. Données et Merise](/documentation/06-donnees-et-merise/) | Expliquer les données et vérifier leur organisation dans la base |
| [7. Décisions et code](/documentation/07-decisions-et-code/) | Conserver les raisons d'un choix et documenter ce que le code n'explique pas |
| [8. Vérifier et maintenir](/documentation/08-verifier-et-maintenir/) | Faire tester la documentation et la mettre à jour avec le projet |
| [9. Documentation vivante et BDD](/documentation/09-documentation-vivante/) | Décrire un comportement avec le métier, l’exécuter et publier les connaissances du projet |

Tu peux aussi consulter un chapitre seul. Pour améliorer l'installation, commence par le chapitre 4. Pour expliquer le trajet d'une demande entre le navigateur et la base, ouvre le chapitre 5.

## Ce que tu conserveras à la fin

Les exercices te feront travailler le README, les guides, les schémas, les données et les décisions. Tu écriras aussi un scénario métier et observeras son exécution. Améliore les documents existants lorsqu'ils répondent déjà au besoin.

Les [exemples et corrigés](/documentation/11-exemples/) rassemblent les résultats attendus et les fichiers de code. La [sélection d’outils et de sources](/documentation/14-outils-et-sources/) précise quoi générer, avec quelles limites. Les photographies, captures et schémas ont leurs [crédits](/documentation/16-credits/).

Vérifie que chaque document répond à la question annoncée dans son titre. Signale les commandes non testées et les informations que tu n'as pas pu confirmer.

Les essais se font sur des ressources locales ou de test. Les références figurent dans les chapitres concernés.
