---
title: 'Faire une revue de code constructive'
order: 5
---

# Faire une revue de code constructive

> Une bonne review demande autant de compétences en communication qu'en technique.

Une revue de code ne sert pas à trouver des fautes. Elle sert à améliorer la qualité du logiciel à plusieurs et à partager la connaissance de la codebase.

## Critères principaux

### Lisibilité

> Est-ce que je comprends vite ce que fait ce code ?

Vérifie que les noms sont explicites, que les fonctions sont courtes, que les commentaires sont utiles et que la structure suit une logique.

`const d = get()` contre `const pendingInvoices = getPendingInvoices()`

### Cohérence

> Est-ce que ce code ressemble au reste du projet ?

Vérifie les conventions de nommage, l'organisation des fichiers, le style (les linters aident), les patterns déjà utilisés et le vocabulaire métier.

Si toute l'app dit `customer`, on ne passe pas à `client`.

### Maintenabilité

> Dans six mois, sera-t-il facile de modifier ce code ?

Cherche la duplication, les smells, les responsabilités mélangées, les dépendances inutiles, les méthodes trop longues.

### Sécurité

Cherche les injections SQL, les failles XSS, les secrets en clair, la gestion d'erreur manquante, par exemple un `fetch(url)` sans `try { … } catch { … }`.

Appuie-toi aussi sur le [Top 10 de l'OWASP](https://owasp.org/Top10/2025/), sur la [CI/CD](https://app.notion.com/p/theogoedert/Toolbox-CI-outils-d-analyse-3283324cc3d780b08dead90f02e7a24c?source=copy_link) et sur des outils comme Dependabot.

[Ressources sécurité](https://app.notion.com/p/theogoedert/Ressources-3283324cc3d78060a867e0b2727fc150?source=copy_link)

### Rédiger une bonne review

Évite les formules comme « tu aurais dû », « c'est pas top », « ce n'est pas propre ». Préfère des phrases qui décrivent ce que tu observes ou ce que tu proposes :

- Je ne comprends pas ce que représente cette variable.
- Peut-on utiliser le vocabulaire métier ici ?
- Est-ce qu'on pourrait simplifier cette condition ?
- Je me demande si cette fonction n'a pas deux responsabilités.

> On parle du code, pas de la personne. Attention aux sensibilités des autres et à ton propre ego.

**Donner du contexte.** Au lieu d'écrire _renomme cette variable_, explique : `data` _semble représenter une liste de commandes en attente. Un nom plus précis aiderait les prochains lecteurs._

**Féliciter aussi.** « J'aime bien l'extraction de cette fonction », « Le nom est beaucoup plus clair », « Bonne gestion des erreurs ».

## Conventional Comments

> Une review est plus utile quand le lecteur comprend tout de suite l'intention du commentaire.

Les remarques n'ont pas toutes le même poids. Certaines doivent être corrigées vite, d'autres sont de simples suggestions. Sans indication, l'auteur·rice ne sait pas si la remarque est bloquante, une suggestion, une préférence ou une question.

Les [Conventional Comments](https://conventionalcomments.org/) répondent à ce besoin avec un format standard pour les commentaires de review. Il se comprend vite et se retrouve par recherche.

```plaintext
# Format d'un conventional comment
<label> [decorations]: <subject>
[discussion]
```

- **label** : le type de commentaire (obligatoire)
- **decorations** : des précisions entre parenthèses, séparées par des virgules (optionnel)
- **subject** : le message principal
- **discussion** : le contexte, la justification, le « pourquoi » (optionnel)

### Les principaux labels

| Label | Usage |
| --- | --- |
| `praise:` | Souligne un point positif. À utiliser sincèrement, pas par politesse. |
| `nitpick:` | Préférence de style mineure, non bloquante par nature. |
| `suggestion:` | Propose une amélioration. Précise le _quoi_ et le _pourquoi_. |
| `issue:` | Problème avéré (fonctionnel ou UX). Idéalement accompagné d'une `suggestion`. |
| `todo:` | Changement nécessaire mais simple. |
| `question:` | Doute pas encore tranché, invite à vérifier. |
| `thought:` | Idée venue pendant la review, non bloquante mais utile. |
| `chore:` | Tâche de process (lancer la CI, mettre à jour le changelog…). |
| `note:` | Information à retenir, toujours non bloquante. |

### Exemples

issue: Cette fonction ne valide jamais les entrées utilisateur.  
issue: Cette requête SQL est vulnérable à une injection.

suggestion: On pourrait extraire cette logique dans une fonction `formatPrice()`.

question: Pourquoi avoir choisi un tableau plutôt qu'une Map ici ?

praise: J'aime beaucoup l'utilisation du langage métier dans cette API.

nitpick: On pourrait harmoniser le nom avec le reste du projet (`customer` plutôt que `client`).

### Les décorations

Les décorations précisent le poids d'une remarque :

- `(blocking)` : bloque l'acceptation tant que ce n'est pas résolu
- `(non-blocking)` : n'empêche pas le merge
- `(if-minor)` : à corriger seulement si le changement reste mineur.

Elles peuvent aussi indiquer le domaine concerné :

issue (security)  
suggestion (readability)  
question (domain)  
nitpick (style)  
praise (simplicity)  
issue (accessibility)  
suggestion (performance)  
issue (maintainability)

Les deux se combinent, par exemple `issue (security, blocking)`. Au-delà de deux décorations, le commentaire devient difficile à lire.

### Pourquoi ce format

Un commentaire comme _« ce n'est pas formulé correctement »_ laisse l'auteur·rice deviner s'il s'agit d'un point bloquant, d'une préférence ou d'une vraie erreur. Le label et le sujet sont obligatoires. Ils obligent à trancher l'intention avant d'écrire, ce qui réduit les allers-retours et les malentendus. Le format se cherche aussi avec `grep` : un script peut extraire tous les `issue (blocking)` d'une review ([Aaron Bos](https://aaronbos.dev/posts/case-for-conventional-comments)).

### Grille de review

| **Question** | **Oui** | **Non** | **Commentaire** |
| --- | --- | --- | --- |
| Les noms sont-ils explicites ? | □   | □   |     |
| Le vocabulaire métier est-il cohérent ? | □   | □   |     |
| Une fonction fait-elle une seule chose ? | □   | □   |     |
| Y a-t-il du code dupliqué ? | □   | □   |     |
| Les erreurs sont-elles gérées ? | □   | □   |     |
| Les entrées sont-elles validées ? | □   | □   |     |
| Le code est-il facile à modifier ? | □   | □   |     |
| Les commentaires expliquent-ils pourquoi plutôt que quoi ? | □   | □   |     |
| Le code respecte-t-il les conventions du projet ? | □   | □   |     |
| Ai-je compris ce code sans demander d'explication ? | □   | □   |     |

Utilise cette grille pour relire un changement de code, seul ou avec une autre personne.

Une revue de code ne cherche pas à montrer qu'un développeur s'est trompé. Elle rend le code plus facile à comprendre, plus sûr et plus simple à faire évoluer, et l'équipe en sort avec une meilleure connaissance du projet.
