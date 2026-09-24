---
title: 'Refactoriser'
order: 3
---

# Refactoriser

## Quand refactoriser

_Traduit et adapté de [Refactoring.Guru](https://refactoring.guru/refactoring/when)._

**La règle de trois**

1.  La première fois que tu fais quelque chose, fais-le simplement fonctionner.
2.  La deuxième fois que tu fais quelque chose de similaire, tu râles intérieurement de devoir te répéter, mais tu fais quand même pareil.
3.  La troisième fois que tu fais encore la même chose, commence à refactoriser.

### Quand tu ajoutes une fonctionnalité

Le refactoring t’aide à comprendre le code des autres. Si tu dois travailler avec du code sale écrit par quelqu’un d’autre, essaie d’abord de le refactoriser. Un code propre se comprend plus vite. Tu l’améliores pour toi et pour les personnes qui l’utiliseront après toi.

Le refactoring facilite aussi l’ajout de nouvelles fonctionnalités.

### Quand tu corriges un bug

Les bugs dans le code se comportent comme les insectes dans la vraie vie : ils vivent dans les endroits les plus sombres et les plus sales du code. Nettoie ton code, et les erreurs finiront presque par se révéler d’elles-mêmes.

Les managers apprécient le refactoring proactif, parce qu’il évite d’avoir à prévoir des tâches de refactoring spécifiques plus tard.

### Pendant une code review

La code review est parfois la dernière occasion de remettre le code au propre avant qu’il ne soit rendu public.

L’idéal est de faire ce type de review en binôme avec l’auteur ou l’autrice du code. Cela permet de corriger rapidement les problèmes simples et d’estimer le temps nécessaire pour traiter les plus complexes.

[Faire une revue de code constructive](/lire-une-codebase/05-revue-constructive/)

### Conseils génériques

**Ne pas tout réparer.** Face à beaucoup de problèmes, choisis-en un, corrige-le, commite, recommence.

**Cartographier d'abord.** Lire le code dans le désordre, sans avoir vu la structure, t'embrouille pour rien.

**Vérifier ses modifications.** Avant chaque changement, demande-toi comment tu sauras que ça fonctionne toujours. Teste le cas d'usage à la main avant et après.
