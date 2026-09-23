---
title: 'Code smells'
order: 2
---

# Smells

**Selon une études faite sur 500 000 commits par -** Tufano et al. en 2015**, les smells sont introduits dès le départ** et pas au fil du temps. Ce que vous trouvez dans votre code c'est souvent une mauvaise décision de design prise le premier jour.

**La majorité des smells arrivent juste avant une deadline.** Le code rendu en fin de bloc, écrit en rush, accumule l'essentiel des problèmes.

Ce ne sont pas les débutant·es qui introduisent le plus de smells, mais les **propriétaires du fichier**, surtout sous forte charge et pression de deadline. Personne n'est immunisé, quelle que soit son expérience.

[When_and_Why_Your_Code_Starts_to_Smell_Bad.pdf](/ressources/lire-une-codebase/files/019e9794-0f45-74bf-bb08-7fa837ef486b/When_and_Why_Your_Code_Starts_to_Smell_Bad.pdf)

### 🟢 Les plus simple à repérer 👀

| Smell | Signal | Action |
| --- | --- | --- |
| Nom opaque | `data`, `temp`, `x`, `btn2` | Renommer |
| Fonction trop longue | plus de 30 lignes, fait plusieurs choses | Extraire en sous-fonctions nommées |
| Code dupliqué | même bloc copié-collé 2 fois | Extraire en une fonction commune |
| Commentaire qui dit "quoi" | `// boucle sur les items` | Supprimer et renommer pour que ça parle de soi |
| Variable morte | déclarée, jamais utilisée | Supprimer |

### 🟡 Nécessitent une lecture plus attentive 🔎

| Smell | Signal | Action |
| --- | --- | --- |
| Nombre magique | `if (x > 42)` sans explication | Extraire en constante nommée |
| Condition négative complexe | `if (!isNotValid && !isEmpty)` | Inverser, simplifier |
| Trop de paramètres | `function f(a, b, c, d, e)` | Regrouper en objet, revoir la responsabilité |
| Pas de gestion d'erreur | `fetch(url)` sans `.catch()` | Ajouter try/catch ou `.catch()` |

### 🔴 Vue architecture 🏗️

| Smell | Signal |
| --- | --- |
| Fichier fourre-tout | un fichier qui fait réseau + DOM + logique métier |
| Accessibilité absente | `<div onClick>` au lieu de `<button>`, inputs sans label |
| Couplage fort | changer une fonction casse plein d'autres choses sans raison apparente |

---

## Astuces pratiques

**Le test de la phrase.** Si vous ne pouvez pas expliquer ce que fait une fonction en une phrase, c'est un smell. La fonction fait probablement plusieurs choses. Cherchez où la couper.

**Le test du renommage.** Si trouver un nouveau nom pour une variable prend plus de 30 secondes, c'est souvent que la variable porte trop de responsabilités.

**Lire à voix haute.** Si une ligne de code se lit naturellement à voix haute, c'est bon signe. `if (user.isActive())` se lit bien. `if (!data[0].s !== false)` ne se lit pas.

**Le rubber duck.** Expliquer un bout de code à voix haute, même à personne, force la compréhension. Si vous butez sur une phrase, vous avez trouvé le problème.

**Commencer par les smells verts, pas les rouges.** Renommer des variables et extraire des fonctions doubles : c'est là que la valeur est la plus rapide. Les problèmes d'architecture se règlent après, si le temps le permet.

**Git comme filet de sécurité.** Commitez après chaque modification qui fonctionne, même petite. `git stash` avant d'essayer quelque chose d'incertain. Vous ne pouvez rien casser définitivement.

```bash
#Exemples de message explicite
git commit -m "renomme data en taskList, c'est un Container, pas une donnée générique"
git commit -m "extrait renderList, bloc dupliqué 3 fois dans handleClick, done et del"
git commit -m "remplace 42 par MAX_RETRY_COUNT, nombre magique sans contexte"
```

---

## Références

- [Felienne Hermans, _The Programmer's Brain_](https://github.com/Young1108/English-original/blob/main/The%20Programmers%20Brain%20What%20every%20programmer%20needs%20to%20know%20about%20cognition%20%28Felienne%20Hermans%29%20%28Z-Library%29.pdf) (2021, Manning)
    - https://yoan-thirion.gitbook.io/knowledge-base/software-craftsmanship/the-programmers-brain
- Martin Fowler et Kent Beck, _Refactoring: Improving the Design of Existing Code_ (1999, rééd. 2018)
- Michael Feathers, _Working Effectively with Legacy Code_ (2004, Prentice Hall)
- [Concept de code smell](https://en.wikipedia.org/wiki/Code_smell)
- https://dotnetcore.show/episode-96-the-programmers-brain-with-felienne-hermans/
- https://refactoring.guru/refactoring
