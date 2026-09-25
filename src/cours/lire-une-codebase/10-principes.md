---
title: 'Principes et méthodos'
order: 10
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Principes et méthodos

### DRY (Don't Repeat Yourself)

Chaque connaissance métier ou technique ne devrait être exprimée qu’à un seul endroit dans le code. La duplication augmente le risque d’incohérence : lorsqu’un comportement change, il faut penser à le modifier partout où il a été copié.

Le principe DRY est directement lié au code smell **Code dupliqué**. Le refactoring le plus courant consiste à extraire le comportement commun dans une fonction, une classe ou un composant réutilisable.

**Attention :** DRY ne signifie pas factoriser au moindre doublon. Attends plutôt la _règle de trois_ : quand un même code apparaît trois fois et représente le même concept, extrais-le.

### KISS (Keep It Simple, Stupid)

Choisis la solution la plus simple qui répond au besoin. Chaque niveau de complexité supplémentaire augmente le coût de lecture, de compréhension, de test et de maintenance.

La simplicité ne consiste pas à écrire le moins de code possible, mais à produire un code facile à comprendre et à faire évoluer.

Quelques indicateurs qu’un code est peut-être trop complexe :

- une fonction est difficile à résumer en une phrase ;
- plusieurs niveaux d’imbrication rendent la lecture difficile ;
- il faut relire plusieurs fois pour comprendre le comportement.

### YAGNI (You Aren't Gonna Need It)

N’implémente pas aujourd’hui des fonctionnalités dont tu pourrais avoir besoin demain. Développe ce qui répond au besoin actuel.

Le « au cas où » ajoute de la complexité, augmente le coût de maintenance et ralentit le développement, sans garantie que ce code serve un jour.

YAGNI n’interdit pas de penser à l’évolution du logiciel. Il demande de **concevoir un code facile à faire évoluer** au lieu de développer des fonctionnalités hypothétiques.

### SOLID

SOLID regroupe cinq principes de conception orientée objet décrits par Robert C. Martin et popularisés sous l’acronyme SOLID par Michael Feathers.

Ce cours se concentre sur le **Single Responsibility Principle (S)**, particulièrement utile dès les premiers projets. Les autres principes deviennent surtout pertinents lorsqu’on travaille avec des abstractions, des interfaces et des architectures orientées objet plus avancées.

### S, Single Responsibility Principle

Une classe ou une fonction ne devrait avoir qu’une seule responsabilité, c’est-à-dire une seule raison d’évoluer.

Quand une unité de code remplit plusieurs rôles, une modification pour l’un peut casser l’autre, alors qu’ils n’ont rien à voir. Séparer les responsabilités rend le code plus lisible, plus testable et plus facile à maintenir.

| Lettre | Principe | En une phrase |
| --- | --- | --- |
| O   | Open/Closed | Une entité devrait être extensible sans qu'on ait à modifier son code existant. |
| L   | Liskov Substitution | Un sous-type doit pouvoir remplacer son type parent sans casser le comportement attendu. |
| I   | Interface Segregation | Mieux vaut plusieurs interfaces spécifiques qu'une seule interface fourre-tout. |
| D   | Dependency Inversion | Le code métier dépend d'abstractions, pas d'implémentations concrètes. |

_Source : Robert C. Martin, « Design Principles and Design Patterns » (2000)._

---

### Références

- Andy Hunt, Dave Thomas, _The Pragmatic Programmer_ (1999) : DRY, orthogonalité.
- Martin Fowler, Kent Beck, _Refactoring_ (1999, rééd. 2018) : règle de trois, catalogue de refactorings.
- Robert C. Martin, _Design Principles and Design Patterns_ (2000) : les cinq principes SOLID.
- Kent Beck, _Extreme Programming Explained_ (1999) : YAGNI, simplicité incrémentale.
- Martin Fowler, [article « Yagni »](https://martinfowler.com/bliki/Yagni.html).
