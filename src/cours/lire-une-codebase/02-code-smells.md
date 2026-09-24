---
title: 'Code smells'
order: 2
---

# Smells

Tufano et al. ont étudié l'historique de 200 projets open source, soit environ 500 000 commits ([« When and Why Your Code Starts to Smell Bad »](https://doi.org/10.1109/ICSE.2015.59), ICSE 2015). La plupart des smells sont présents **dès la création du fichier**. Ils n'apparaissent pas peu à peu. Le smell que tu trouves dans ton code vient souvent d'une décision de design prise le premier jour.

Une bonne partie des smells apparaît aussi **juste avant une échéance**. Le code écrit en fin de sprint, dans l'urgence, en accumule le plus.

Les débutant·es n'en introduisent pas le plus. Ce sont les **propriétaires du fichier**, surtout sous forte charge de travail et avant une échéance. L'expérience ne protège pas.

### 🟢 Les plus simples à repérer

| Smell | Signal | Action |
| --- | --- | --- |
| Nom opaque | `data`, `temp`, `x`, `btn2` | Renommer |
| Fonction trop longue | plus de 30 lignes, fait plusieurs choses | Extraire en sous-fonctions nommées |
| Code dupliqué | même bloc copié-collé 2 fois | Extraire en une fonction commune |
| Commentaire qui dit "quoi" | `// boucle sur les items` | Supprimer le commentaire et renommer pour que le code se lise seul |
| Variable morte | déclarée, jamais utilisée | Supprimer |

### 🟡 Demandent une lecture plus attentive

| Smell | Signal | Action |
| --- | --- | --- |
| Nombre magique | `if (x > 42)` sans explication | Extraire en constante nommée |
| Condition négative complexe | `if (!isNotValid && !isEmpty)` | Inverser, simplifier |
| Trop de paramètres | `function f(a, b, c, d, e)` | Regrouper en objet, revoir la responsabilité |
| Pas de gestion d'erreur | `fetch(url)` sans `.catch()` | Ajouter try/catch ou `.catch()` |

### 🔴 Au niveau de l'architecture

| Smell | Signal |
| --- | --- |
| Fichier fourre-tout | un fichier qui fait réseau + DOM + logique métier |
| Accessibilité absente | `<div onClick>` au lieu de `<button>`, inputs sans label |
| Couplage fort | changer une fonction casse plein d'autres choses sans raison apparente |

---

## Astuces pratiques

**Le test de la phrase.** Si tu ne peux pas expliquer ce que fait une fonction en une phrase, elle fait probablement plusieurs choses. Cherche où la couper.

**Le test du renommage.** Si trouver un nouveau nom pour une variable prend plus de 30 secondes, c'est souvent que la variable porte trop de responsabilités.

**Lire à voix haute.** Une ligne qui se lit naturellement à voix haute est en général claire. `if (user.isActive())` se lit bien. `if (!data[0].s !== false)` ne se lit pas.

**Le canard en caoutchouc.** Explique un bout de code à voix haute, même à personne. L'endroit où tu butes est souvent l'endroit du problème.

**Commencer par les smells verts.** Renommer des variables et extraire les blocs dupliqués prend peu de temps et rend vite le code plus lisible. Les problèmes d'architecture viennent après, si le temps le permet.

**Git comme filet de sécurité.** Commite après chaque modification qui fonctionne, même petite. Fais un `git stash` avant d'essayer quelque chose d'incertain. Tant que ton travail est commité, tu peux y revenir.

```bash
# Exemples de messages explicites
git commit -m "renomme data en taskList, c'est un Container, pas une donnée générique"
git commit -m "extrait renderList, bloc dupliqué 3 fois dans handleClick, done et del"
git commit -m "remplace 42 par MAX_RETRY_COUNT, nombre magique sans contexte"
```

---

## Références

- Felienne Hermans, [_The Programmer's Brain_](https://www.manning.com/books/the-programmers-brain) (2021, Manning)
    - [Résumé du livre par Yoan Thirion](https://yoan-thirion.gitbook.io/knowledge-base/software-craftsmanship/the-programmers-brain)
- Martin Fowler et Kent Beck, _Refactoring: Improving the Design of Existing Code_ (1999, rééd. 2018)
- Michael Feathers, _Working Effectively with Legacy Code_ (2004, Prentice Hall)
- [Concept de code smell](https://en.wikipedia.org/wiki/Code_smell)
- [The .NET Core Podcast, épisode 96 avec Felienne Hermans](https://dotnetcore.show/episode-96-the-programmers-brain-with-felienne-hermans/)
- [Refactoring.Guru](https://refactoring.guru/refactoring)
