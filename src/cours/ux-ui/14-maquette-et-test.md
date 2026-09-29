---
title: 'La maquette et le test'
order: 14
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
---

# La maquette et le test

Appliquez vos styles et vos composants aux wireframes, puis reliez les écrans pour obtenir un prototype. Faites essayer la réservation à une personne qui n'a pas conçu les écrans. Ses hésitations vous aideront à repérer ce qu'il faut corriger.

## De la maquette au prototype

La maquette graphique, aussi appelée *mockup*, reprend les contenus des wireframes avec les styles et les composants choisis. Si un titre déborde ou si une information passe inaperçue, ajustez la mise en page.

Le prototype permet d'essayer le parcours : choisir une séance, passer au formulaire et afficher une confirmation. On peut le construire à partir de [wireframes en gris](/ux-ui/09-zoning-et-wireframes/#le-prototype). Ici, vous utiliserez les maquettes avec leurs styles.

Le formulaire simule une réservation : il affiche une confirmation, sans enregistrer de place ni envoyer d'e-mail. Précisez-le à la personne qui teste.

Pour relier les écrans dans Figma :

1. Ouvrez l'onglet Prototype, dans le panneau de droite.
2. Sélectionnez le bouton, puis tirez la flèche vers l'écran qui doit s'afficher.
3. Gardez l'interaction « Au clic » et l'action « Naviguer vers ».
4. Lancez le prototype avec le bouton de présentation, en haut à droite.

Penpot a un mode Prototype qui fonctionne de la même façon.

Pour ce test, reliez les étapes de la réservation et prévoyez les cas à essayer : erreur de saisie, séance complète et confirmation.

### Avant de faire tester

- Les écrans affichent les noms d'ateliers, les libellés et les messages prévus pour le site.
- Les cas d'erreur, de confirmation, de séance complète et d'accord parental ont chacun un écran ou un message.
- Le parcours permet de vérifier les critères de votre story de réservation.
- Le texte courant atteint le contraste minimal de 4,5:1.
- Un titre d'atelier long tient dans sa carte.

## Assembler la maquette

Reprenez vos wireframes dans le fichier de projet. Choisissez les contenus de vos ateliers à partir du brief et du cadre « 1–2. Préparer la réservation ». Utilisez des coordonnées fictives dans les formulaires.

Appliquez vos styles et composants aux trois wireframes. Gardez une copie de la version en gris. Reliez les écrans pour pouvoir essayer une réservation.

Conservez les états prévus : erreur, confirmation, séance complète et accord parental. Vérifiez les critères de votre story de réservation.

Rendu : le prototype dans votre fichier de projet, avec les styles et les composants utilisés.

## Le test d'utilisabilité

Pendant un test d'utilisabilité, une personne essaie d'accomplir une tâche avec le prototype. Vous observez ses actions et notez ce qu'elle comprend, cherche ou ne trouve pas.

| Étape | Ce que vous faites |
| --- | --- |
| 1. Donner une tâche | « Choisis un atelier pour ton âge, puis réserve une séance d'essai. » |
| 2. Demander de penser à voix haute | Invitez la personne à dire ce qu'elle cherche et ce qu'elle s'attend à obtenir en cliquant. |
| 3. Observer sans guider | Laissez-la choisir ses actions. Si elle demande où cliquer, demandez-lui ce qu'elle essaierait. |
| 4. Prendre des notes | Relevez les hésitations, les blocages et le résultat de la tâche. |

Quand la personne bloque, notez ce qu'elle cherchait et ce que l'interface lui montrait. Examinez ce qui peut être corrigé sans attribuer le blocage à un manque d'attention.

La consigne « Réserve une séance » permet de vérifier si la personne trouve comment faire. « Clique sur Réserver » lui indique déjà où agir.

Un essai peut révéler une difficulté, sans couvrir tous les problèmes du parcours. Corrigez le blocage observé, puis faites réessayer pour vérifier l'effet de la correction.

## Tester l'inscription

Demandez à une personne qui n'a pas conçu la maquette de réserver une séance. Laissez-la essayer sans la guider et notez ce qui la bloque.

> Tu veux essayer une activité à la MJC des Tilleuls. Choisis un atelier qui correspond à ton âge et à tes disponibilités, puis réserve une séance d'essai. À la fin, dis ce que tu as réservé et ce qu'il te reste à faire avant de venir.

Corrigez le principal problème, puis faites réessayer. Vérifiez aussi que les messages de séance complète et d'accord parental sont compréhensibles.

Rendu : quelques notes sur le problème observé, votre correction et le résultat du nouvel essai.

Ce test porte sur la compréhension des écrans et du parcours. Vérifiez ensuite la navigation au clavier et le fonctionnement réel du formulaire sur la page codée.

## À lire

- [Guide de prototypage dans Figma](https://help.figma.com/hc/fr/articles/360040314193-Guide-de-prototypage-dans-Figma), aide de Figma.
- [Thinking Aloud: The #1 Usability Tool](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/), Nielsen Norman Group, sur le test où la personne pense à voix haute. En anglais.

## Pour la discussion

- Quel choix UI aide votre persona à décider de s'inscrire ?
- Quel état manquait dans vos wireframes ?
- Qu'avez-vous changé après avoir vu quelqu'un utiliser la maquette ?
