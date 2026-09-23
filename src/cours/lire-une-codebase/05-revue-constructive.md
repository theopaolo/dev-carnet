---
title: 'Faire une revue de code constructive'
order: 5
---

# Faire une revue de code constructive

> Une bonne review est autant une compétence technique qu’une compétence de communication.

Une revue de code n’a pas pour objectif de trouver des fautes. Elle sert à améliorer collectivement la qualité du logiciel et à partager la connaissance de la codebase.

## Critère principaux

### Lisibilité

Est-ce que je comprends rapidement ce que fait ce code ? On vas vérifier si les noms sont explicites, les fonctions courtes, comprends des commentaires utiles, as une structure logique.

`const d = get()` vs `const pendingInvoices = getPendingInvoices()`

### Cohérence

> Est-ce que ce code ressemble au reste du projet ?

On s’assure des conventions de nommage, l’organisation des fichiers, le style ( aider par des linters ), patterns déjà utilisé, vocabulaire métier.

Si toutes l’app dis `customer` on ne vas pas changer à `client`

### Maintenabillité

> Dans six mois, sera-t-il facile de modifier ce code ?

Duplication, smells, responsabilités, dépendance, méthodes trop longues etc

### Sécurité

Injection sql, XSS, secrets, gestion d’erreur manquante, du styler fetch(url) sans try{…} catch{…}

Se fier aussi aux conseil de [**l’OWASP**](https://owasp.org/Top10/2025/), à des [CI/CD](https://app.notion.com/p/theogoedert/Toolbox-CI-outils-d-analyse-3283324cc3d780b08dead90f02e7a24c?source=copy_link) et des outils comme dépendaBot.

[Ressources sécurité](https://app.notion.com/p/theogoedert/Ressources-3283324cc3d78060a867e0b2727fc150?source=copy_link)

### Rédaction du bonne review

On vas éviter des termes comme, tu aurais du, c’est pas top, ce n’est pas propre et favoriser des phrases construite comme : Je ne comprends pas ce que représente cette variable. Peut-on utiliser le vocabulaire métier ici ? Est-ce qu’on pourrait simplifier cette condition ? Je me demande si cette fonction ne fait pas deux responsabilités.

> On parle du code, pas du développeur ( attentions aux sensibilités des autres et à sont propre égo )

**Donner du contexte,** plutôt que dire : _renommer cette variable_, donner du contexte : `data` _semble représenter une liste de commandes en attente. Un nom plus spécifique aiderait les prochains lecteurs._

**Féliciter** aussi ça fait du bien : J’aime bien l’extraction de cette fonction, Le nom est beaucoup plus clair, Bonne gestion des erreurs.

## Conventional Comments

> Une review est plus utile lorsque le lecteur comprend immédiatement l’intention du commentaire.

Toutes les remarques n’ont pas le même poids, certaines doivent rapidement être corrigées et d’autres sont de simples suggestions. Sans le contexte un développeur ne peux pas savoir si c’est quelque chose de bloquant, une suggestion, une préférence, une question.

Le [conventional comment](https://conventionalcomments.org/) arrive pour répondre à ce besoins avec un standard de formatage pour les commentaires de review, il est facile à comprendre et à retrouver par recherche.

```plaintext
# Format de coventional comment
<label> [decorations]: <subject>
[discussion]
```

- **label** indique le type de commentaire (obligatoire)
- **decorations** donne des précisions entre parenthèses, séparées par virgules (optionnel)
- **subject** le message principal
- **discussion** est une contexte, justification, "pourquoi" (optionnel)

### Les principaux labels conseillé :

| Label | Usage |
| --- | --- |
| `praise:` | Souligne un point positif. À utiliser sincèrement, pas en façade. |
| `nitpick:` | Préférence stylistique triviale, non-bloquant par nature. |
| `suggestion:` | Propose une amélioration. Être explicite sur le _quoi_ et le _pourquoi_. |
| `issue:` | Problème avéré (fonctionnel ou UX). Idéalement accompagné d'une `suggestion`. |
| `todo:` | Changement nécessaire mais trivial. |
| `question:` | Doute pas encore tranché, invite à investiguer. |
| `thought:` | Idée qui a émergé pendant la review, non-bloquante mais utile. |
| `chore:` | Tâche de process (lancer un CI, mettre à jour un changelog...). |
| `note:` | Info à noter, toujours non-bloquant. |

### Exemples

issue: Cette fonction ne valide jamais les entrées utilisateur.  
issue: Cette requête SQL est vulnérable à une injection.

suggestion: On pourrait extraire cette logique dans une fonction `formatPrice()`.

question: Pourquoi avoir choisi un tableau plutôt qu'une Map ici ?

praise: J'aime beaucoup l'utilisation du langage métier dans cette API.

nitpick: On pourrait harmoniser le nom avec le reste du projet `customer` plutôt que `client`).

On peux aussi compléter les labels par des précisions comme

issue (security)  
suggestion (readability)  
question (domain)  
nitpick (style)  
praise (simplicity)  
issue (accessibility)  
suggestion (performance)  
issue (maintainability)

---

En plus des grande catégories il y as aussi les décorations

- `(blocking)` bloque l'acceptation tant que non résolu
- `(non-blocking)` n'empêche pas le merge
- `(if-minor)` à corriger seulement si le changement reste mineur

Une seule décoration par commentaire en général, sinon ça devient illisible.

### Pourquoi ça existe

Le problème que ça résout : un commentaire du style _"ce n'est pas formulé correctement"_ laisse le·la relecteur·rice deviner si c'est bloquant, une préférence perso, ou une vraie erreur. Le label et le subject sont les champs obligatoires, décorations et discussion restent optionnels, ça force à trancher l'intention avant d'écrire, ce qui réduit les allers-retours et les malentendus. Bénéfice secondaire : c'est **grep-able** et parsable automatiquement (un `issue (blocking)` peut être extrait par un script de reporting). [Aaron Bos](https://aaronbos.dev/posts/case-for-conventional-comments)

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
| Ai-je compris ce code sans demander d’explication ? | □   | □   |     |

**Atelier en binômes** : review croisée de code avec une grille fournie


**Une bonne revue de code ne cherche pas à montrer qu’un développeur s’est trompé. Elle cherche à rendre le code plus facile à comprendre, plus sûr et plus simple à faire évoluer.** Une excellente review améliore autant le logiciel que les personnes qui collaborent à son développement.
