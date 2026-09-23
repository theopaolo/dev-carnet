---
title: 'Préparer et recevoir une review'
order: 4
---

# Préparer et recevoir une review

> La qualité d'une review dépend aussi de comment le changement est présenté. Ça, c'est le travail de l'auteur·rice, avant celui du·de la relecteur·rice.

## Côté auteur·rice : rendre sa PR relisible

### Une PR = une intention

Si tu ne peux pas résumer ta PR en une phrase, c'est qu'elle en fait plusieurs, et il faut la découper. (C'est le même test de la phrase que pour une fonction.)

Une PR qui mélange « je corrige un bug », « je renomme trois variables » et « j'ajoute une feature » est impossible à relire proprement : le·la relecteur·rice ne sait plus ce qui est le cœur du changement et ce qui est du bruit. Un diff qu'on peut tenir en tête d'un coup se review bien ; un diff de 800 lignes se review mal, ou pas du tout. Si ta PR dépasse ce que tu peux relire toi-même en une passe, elle est trop grosse.

### Se relire avant de faire relire

Avant de demander une review, lis ton propre diff comme si c'était celui de quelqu'un d'autre. Tu attraperas la moitié des `nitpick` toi-même : le `console.log` oublié, la variable `tmp` jamais renommée, le commentaire mort. C'est l'exercice de « relire son vieux code », mais à chaud.

Ça respecte le temps de l'autre, et ça évite de faire porter à la review un travail que tu pouvais faire seul·e.

### Décrire la PR

Un titre clair, et une description qui répond à trois choses : ce que change la PR (en une phrase), pourquoi (le contexte, le ticket, la décision, car le pourquoi ne se lit pas dans le diff), et comment la tester (le cas d'usage concret à vérifier).

Template minimal :

```markdown
## Quoi
Extrait la logique de formatage de prix dans `formatPrice()`.

## Pourquoi
Le bloc était dupliqué 3 fois (panier, facture, email). Ticket #142.

## Comment tester
Ajouter un article au panier, vérifier que le prix s'affiche formaté
à l'identique dans les trois écrans.
```

### Baliser son propre code

Tu peux utiliser les conventional comments sur ta propre PR pour guider la relecture. C'est un usage du format qu'on oublie souvent :

- `thought: pas sûr de ce choix d'implémentation, un avis est bienvenu`
- `note: le TODO ici part dans un ticket séparé, pas dans cette PR`
- `question: est-ce que ce nom colle au vocabulaire métier ?`

Tu diriges l'attention là où elle est utile, et tu réduis les allers-retours : le·la relecteur·rice n'a pas à deviner tes doutes, tu les as déjà pointés.

### Checklist avant d'ouvrir la PR

- \[ \] Je peux résumer cette PR en une phrase.
- \[ \] Je l'ai relue moi-même en entier.
- \[ \] La description dit quoi / pourquoi / comment tester.
- \[ \] J'ai balisé mes propres zones de doute.
- \[ \] Pas de code mort, pas de `console.log`, pas de secret en clair.

## Côté auteur·rice : recevoir une review

### Le code n'est pas toi

C'est le pendant de « on parle du code, pas du·de la développeur·se », et ça marche dans les deux sens : quand on relit le tien, une remarque sur ton code n'est pas une remarque sur toi. La review sert à rendre le code plus clair et plus sûr, pas à établir qui a raison.

Si une remarque te pique, c'est souvent le signe qu'il y a quelque chose à regarder, parfois dans le code, parfois juste dans la façon dont elle est formulée, relis-la à froid avant de répondre.

### Répondre selon le label

Le format conventional comments te dit quoi faire de chaque remarque :

| Label reçu | Ce que tu en fais |
| --- | --- |
| `issue (blocking)` | À traiter avant merge, ou à argumenter explicitement si tu n'es pas d'accord. |
| `issue (non-blocking)` / `suggestion` | Tu es libre de décliner, à condition de dire pourquoi. |
| `nitpick` | Tu peux prendre ou laisser. Si tu laisses, un mot suffit. |
| `question` | Tu réponds. Souvent la réponse mérite d'atterrir dans le code ou la doc, pas juste dans le fil. |
| `praise` | Tu accuses réception. C'est de l'info utile : tu sais ce qui a marché. |

### Cloturer une pr

Une remarque traitée se clôt : un commit qui répond, ou une réponse argumentée si tu déclines. Ne laisse pas un fil ouvert sans réponse, c'est ce qui fait traîner une review sur des jours.

Décliner une suggestion est légitime : « je garde comme ça parce que X » est une réponse valable.
