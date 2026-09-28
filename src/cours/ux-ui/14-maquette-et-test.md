---
title: 'La maquette et le test'
order: 14
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
---

# La maquette et le test

Vous assemblez vos styles et vos composants sur les wireframes, puis vous reliez les écrans pour obtenir un prototype. Une personne extérieure essaie ensuite de réserver une séance, et vous corrigez ce qui la bloque.

## De la maquette au prototype

La maquette applique le style guide et les composants aux wireframes. Elle garde leurs contenus et leur ordre. Le prototype est la maquette rendue cliquable : on passe d'un écran à l'autre comme sur le vrai site.

Pour relier les écrans dans Figma :

1. Ouvrez l'onglet Prototype, dans le panneau de droite.
2. Sélectionnez le bouton, puis tirez la flèche vers l'écran qui doit s'afficher.
3. Gardez l'interaction « Au clic » et l'action « Naviguer vers ».
4. Lancez le prototype avec le bouton de présentation, en haut à droite.

Penpot a un mode Prototype qui fonctionne de la même façon.

Un prototype n'a pas besoin de tout relier. Reliez le chemin de la réservation, et les écrans d'erreur, de séance complète et de confirmation.

### Avant de faire tester

- Les textes sont les vrais : noms d'ateliers, libellés, messages.
- Les états prévus existent : erreur, confirmation, séance complète, accord parental.
- Les critères de votre story de réservation sont visibles sur les écrans.
- Le texte courant atteint le contraste minimal de 4,5:1.
- Un titre d'atelier long tient dans sa carte.

## Assembler la maquette

Reprenez vos wireframes dans le fichier de projet. Choisissez les contenus de vos ateliers à partir du brief et du cadre « 1–2. Préparer la réservation ». Utilisez des coordonnées fictives dans les formulaires.

Appliquez vos styles et composants aux trois wireframes. Gardez une copie de la version en gris. Reliez les écrans pour pouvoir essayer une réservation.

Conservez les états prévus : erreur, confirmation, séance complète et accord parental. Vérifiez les critères de votre story de réservation.

Rendu : la maquette cliquable dans votre fichier de projet, avec les styles et composants utilisés.

## Le test d'utilisabilité

Un test d'utilisabilité consiste à regarder une vraie personne utiliser la maquette pour faire une tâche. On note où elle hésite et où elle bloque.

| Étape | Ce que vous faites |
| --- | --- |
| 1. Donner une tâche | « Choisis un atelier pour ton âge, puis réserve une séance d'essai. » |
| 2. Laisser faire | La personne dit à voix haute ce qu'elle pense et où elle cliquerait. |
| 3. Se taire | Pas d'aide, pas d'explication. Si elle pose une question, répondez « Que ferais-tu ? ». |
| 4. Noter | Où elle hésite, où elle bloque, si elle réussit. |

Quand la personne bloque, notez ce qu'elle cherchait et ce que l'interface lui montrait. Examinez ce qui peut être corrigé sans attribuer le blocage à un manque d'attention.

Donnez une tâche, pas un mode d'emploi. « Clique sur Réserver » donne la réponse. « Réserve une séance » vérifie que la personne trouve le bouton seule.

Un essai peut révéler une difficulté, sans couvrir tous les problèmes du parcours. Corrigez le blocage observé, puis faites réessayer pour vérifier l'effet de la correction.

## Tester l'inscription

Demandez à une personne qui n'a pas conçu la maquette de réserver une séance. Laissez-la essayer sans la guider et notez ce qui la bloque.

> Tu veux essayer une activité à la MJC des Tilleuls. Choisis un atelier qui correspond à ton âge et à tes disponibilités, puis réserve une séance d'essai. À la fin, dis ce que tu as réservé et ce qu'il te reste à faire avant de venir.

Corrigez le principal problème, puis faites réessayer. Vérifiez aussi que les messages de séance complète et d'accord parental sont compréhensibles.

Rendu : quelques notes sur le problème observé, votre correction et le résultat du nouvel essai.

Le prototype sert à vérifier la compréhension et le parcours. Le clavier et le fonctionnement réel du formulaire seront testés sur la page codée.

## À lire

- [Guide de prototypage dans Figma](https://help.figma.com/hc/fr/articles/360040314193-Guide-de-prototypage-dans-Figma), aide de Figma.
- [Thinking Aloud: The #1 Usability Tool](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/), Nielsen Norman Group, sur le test où la personne pense à voix haute. En anglais.

## Pour la discussion

- Quel choix UI aide votre persona à décider de s'inscrire ?
- Quel état manquait dans vos wireframes ?
- Qu'avez-vous changé après avoir vu quelqu'un utiliser la maquette ?
