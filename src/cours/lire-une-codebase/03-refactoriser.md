---
title: 'Refactoriser'
order: 3
---

# Refactoriser

## Quand refactoriser

_Traduction de :_ [_https://refactoring.guru/refactoring/when_](https://refactoring.guru/refactoring/when)

**La règle de trois**

1.  La première fois que tu fais quelque chose, fais-le simplement fonctionner.
2.  La deuxième fois que tu fais quelque chose de similaire, tu râles intérieurement de devoir te répéter, mais tu fais quand même pareil.
3.  La troisième fois que tu fais encore la même chose, commence à refactoriser.

### Quand tu ajoutes une fonctionnalité

Le refactoring t’aide à comprendre le code des autres. Si tu dois travailler avec du code sale écrit par quelqu’un d’autre, essaie d’abord de le refactoriser. Un code propre est beaucoup plus facile à comprendre. Tu l’améliores non seulement pour toi, mais aussi pour celles et ceux qui l’utiliseront après toi.

Le refactoring facilite l’ajout de nouvelles fonctionnalités. Il est beaucoup plus simple de faire évoluer un code propre.

### Quand tu corriges un bug

Les bugs dans le code se comportent comme les insectes dans la vraie vie : ils vivent dans les endroits les plus sombres et les plus sales du code. Nettoie ton code, et les erreurs finiront presque par se révéler d’elles-mêmes.

Les managers apprécient le refactoring proactif, parce qu’il évite d’avoir à prévoir des tâches de refactoring spécifiques plus tard. Des responsables contents font des développeurs contents !

### Pendant une code review

La code review est parfois la dernière occasion de remettre le code au propre avant qu’il ne soit rendu public.

L’idéal est de faire ce type de review en binôme avec l’auteur ou l’autrice du code. Cela permet de corriger rapidement les problèmes simples et d’estimer le temps nécessaire pour traiter les plus complexes.

[Faire une revue de code constructive](/lire-une-codebase/05-revue-constructive/)

### Conseils génériques

**Ne pas tout réparer,** face à beaucoup de problèmes, en choisir un, fixer, commit, recommencer.

**Cartographier,** lire le code dans le désordre sans avoir cartographié la structure d'abord génère de la confusion inutile.

**Vérifier ses modification,** avant chaque changement : comment vous saurez que ça fonctionne toujours ? Testez manuellement le cas d'usage avant et après.
