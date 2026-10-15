---
title: 'POO, design patterns et frameworks'
order: 4
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# POO, design patterns et frameworks

Les décisions d'architecture organisent les responsabilités et les dépendances d'une application. Leur intérêt dépend des règles à préserver et des changements attendus. Un calcul de prix, un stockage et un affichage n'évoluent pas pour les mêmes raisons.

La programmation orientée objet organise le code autour d'objets qui associent un état et des opérations. Un design pattern décrit une organisation réutilisable face à un problème récurrent. Un framework organise une partie de l'application et de son exécution.

Les exemples utilisent TypeScript. Savoir lire des fonctions, des objets et des tableaux suffit pour commencer. Les fondations expliquent les classes et les interfaces.

## Un parcours de lecture

Les [fondations](/poo-patterns-frameworks/01-fondations/) posent les notions de POO, de contrat et de responsabilité. Les six fiches suivantes décrivent des mécanismes précis. Le chapitre [Frameworks et inversion de contrôle](/poo-patterns-frameworks/08-frameworks/) les relie au cycle d'une interface.

Les [trois études de cas](/poo-patterns-frameworks/09-situations/) montrent comment comparer des choix d'architecture. L'[exercice TypeScript](/poo-patterns-frameworks/10-exercice/) fournit une application fonctionnelle à faire évoluer. Chaque chapitre peut aussi se consulter séparément pour réviser une notion.

## Quel problème cherche-t-on à résoudre ?

| Problème observé | Mécanisme à examiner | Famille et portée |
| --- | --- | --- |
| Plusieurs règles de calcul varient indépendamment de l'opération qui les utilise. | [Strategy](/poo-patterns-frameworks/02-strategy/) | Pattern comportemental du catalogue GoF. |
| Plusieurs destinataires réagissent au même changement. | [Observer](/poo-patterns-frameworks/03-observer/) | Pattern comportemental GoF. |
| La création ou la sélection des objets se répète. | [Factory](/poo-patterns-frameworks/04-factory/) | Terme général. La fabrique simple se distingue de Factory Method et Abstract Factory, patterns de création GoF. |
| Un service existant expose un contrat différent de celui attendu. | [Adapter](/poo-patterns-frameworks/05-adapter/) | Pattern structurel GoF. |
| Un comportement doit entourer une opération en conservant son contrat. | [Decorator](/poo-patterns-frameworks/06-decorator/) | Pattern structurel GoF. |
| Le métier doit manipuler une collection d'objets persistants sans connaître les requêtes de stockage. | [Repository](/poo-patterns-frameworks/07-repository/) | Pattern d'architecture d'entreprise, hors du catalogue GoF. |

Une condition locale ou un appel direct peut suffire. Une abstraction se justifie par le changement qu'elle permet de contenir. Elle ajoute un contrat et du code à maintenir.

La [bibliographie commentée](/poo-patterns-frameworks/11-ressources/) rassemble les références par sujet. Le catalogue *Design Patterns* de Gamma, Helm, Johnson et Vlissides, souvent appelé GoF, décrit 23 patterns orientés objet. Les fiches présentent aussi des formes fonctionnelles adaptées aux exemples TypeScript.
