---
title: 'La maquette et le test'
order: 14
publishedAt: "2026-09-27"
updatedAt: "2026-09-29"
---

# La maquette et le test

Transformez vos wireframes en maquettes, puis reliez les écrans pour créer un prototype. Faites tester la réservation et corrigez les difficultés observées. Chaque personne conçoit, corrige et rend son propre fichier.

## De la maquette au prototype

La maquette, ou *mockup*, ajoute aux wireframes les styles et les composants choisis. Ajustez la mise en page si un titre déborde ou si une information passe inaperçue.

Le prototype relie les écrans pour essayer le parcours : choisir une séance, remplir le formulaire et voir la confirmation. Il peut utiliser des [wireframes en gris](/ux-ui/09-zoning-et-wireframes/#le-prototype) ou, comme ici, des maquettes avec leurs styles.

Précisez à la personne qui teste que la réservation est simulée : aucune place n'est enregistrée et aucun e-mail n'est envoyé.

Pour relier les écrans dans Figma :

1. Ouvrez l'onglet Prototype, dans le panneau de droite.
2. Sélectionnez le bouton, puis tirez la flèche vers l'écran qui doit s'afficher.
3. Gardez l'interaction « Au clic » et l'action « Naviguer vers ».
4. Lancez le prototype avec le bouton de présentation, en haut à droite.

Penpot a un mode Prototype qui fonctionne de la même façon.

## Une page en mobile et en desktop

Créez le parcours mobile dans un cadre (frame) de 390 px de large. Adaptez ensuite la fiche atelier à un cadre de 1280 px pour l'ordinateur. Si vous avez le temps, essayez-la aussi à 320 px. Ces largeurs servent à tester la mise en page. Elles n'imposent pas les seuils de changement de disposition dans le code.

Vérifiez les titres longs, les boutons, les messages d'erreur et l'ordre des informations. Sur grand écran, limitez la largeur du texte. Sur petit écran, empilez les éléments et laissez le texte passer à la ligne.

Notez deux règles pour le code, par exemple : « les cartes passent en une colonne quand elles ne tiennent plus » et « le bouton occupe la largeur disponible sur téléphone ». Adaptez la disposition au lieu de réduire une capture. Vous vérifierez ces règles dans le navigateur une fois la page codée.

## Les informations utiles pour coder

Près de votre maquette, indiquez :

- Les styles, les tokens et les composants utilisés.
- Ce qui varie dans chaque composant : texte, disponibilité, sélection, erreur.
- Les réactions attendues au clavier et les messages à annoncer.
- Le [schéma d'enchaînement](/ux-ui/10-user-flow-sequence-uml/#atelier--le-schema-denchainement) et les règles d'adaptation aux largeurs.

Décrivez aussi un composant en deux phrases simples en anglais. Exemple : « The button label describes the action. Keyboard focus is shown with a visible outline. » Vous vous entraînez ainsi à expliquer votre travail en anglais.

### Données, sécurité et éco-conception

Utilisez des données fictives et les champs du brief. Justifiez tout champ ajouté. Prévoyez près du formulaire une explication sur l'usage des données et un lien vers les informations de confidentialité. Pour un vrai service, il faut préciser qui est responsable, pourquoi les données sont collectées, sur quelle base légale, combien de temps elles sont conservées et comment exercer ses droits. N'inventez pas ces informations pour la MJC fictive. [Informer les personnes, CNIL](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence).

Notez les contrôles à faire côté serveur : saisies, âges autorisés et places disponibles. Les contrôles dans Figma ou le navigateur ne suffisent pas. Prévoyez des messages distincts pour une réservation confirmée, une demande en attente et un échec d'envoi.

Expliquez un choix d'éco-conception : utiliser une police système, réduire la taille des images ou éviter les vidéos automatiques pour limiter les téléchargements. Vous mesurerez le poids des pages et le nombre de requêtes sur le site codé. [Référentiel général d'écoconception des services numériques](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/).

### Avant de faire tester

- Les écrans affichent les noms d'ateliers, les libellés et les messages prévus pour le site.
- Les cas d'erreur, de confirmation, de séance complète et d'accord parental ont chacun un écran ou un message.
- Le parcours permet de vérifier les critères de votre story de réservation.
- Le texte courant atteint le contraste minimal de 4,5:1.
- Un titre d'atelier long tient dans sa carte.

## Assembler la maquette

Après la démonstration, travaillez dans votre fichier de projet.

1. Gardez une copie de vos trois wireframes en gris.
2. Choisissez les contenus à partir du brief et du cadre « 1–2. Préparer la réservation ».
3. Appliquez vos styles et composants, puis reliez les écrans.
4. Vérifiez les points de la liste « Avant de faire tester ».

Rendez le prototype avec les trois écrans et les états du brief, son schéma d'enchaînement, la fiche atelier en mobile et en desktop, les règles pour le code et une note sur les données et l'éco-conception.

Si vous manquez de temps, terminez d'abord la fiche dans les deux formats, le formulaire et la confirmation. La liste peut rester en wireframe. Dessinez les messages d'erreur et de liste d'attente. Signalez les interactions manquantes : elles restent à terminer et à tester.

## Le test d'utilisabilité

Un test d'utilisabilité consiste à observer une personne qui essaie d'accomplir une tâche avec le prototype.

| Étape | Ce que vous faites |
| --- | --- |
| 1. Donner une tâche | « Choisis un atelier pour ton âge, puis réserve une séance d'essai. » |
| 2. Demander de penser à voix haute | Invitez la personne à dire ce qu'elle cherche et ce qu'elle s'attend à obtenir en cliquant. |
| 3. Observer sans guider | Laissez-la choisir ses actions. Si elle demande où cliquer, demandez-lui ce qu'elle essaierait. |
| 4. Prendre des notes | Relevez les hésitations, les blocages et le résultat de la tâche. |

En cas de blocage, notez ce que la personne cherchait et ce que l'écran affichait. Cherchez ce qui peut être amélioré dans l'interface.

La consigne « Réserve une séance » permet de vérifier si la personne trouve comment faire. « Clique sur Réserver » lui indique déjà où agir.

Un seul essai peut révéler une difficulté, mais ne suffit pas à repérer tous les problèmes.

## Tester l'inscription

Faites tester votre prototype par un camarade ou le formateur, qui n'a pas participé à sa conception. Si vous travaillez à deux, échangez les rôles. Donnez cette tâche, puis observez sans guider :

> Tu veux essayer une activité à la MJC des Tilleuls. Choisis un atelier qui correspond à ton âge et à tes disponibilités, puis réserve une séance d'essai. À la fin, dis ce que tu as réservé et ce qu'il te reste à faire avant de venir.

Corrigez le principal problème, puis faites réessayer. Vérifiez aussi que les messages de séance complète et d'accord parental sont compréhensibles.

Notez dans votre rendu la tâche donnée, une action ou une hésitation observée, votre correction et le résultat du nouvel essai. Si vous n'avez pas pu refaire l'essai, indiquez « à retester » et le résultat attendu. Sans test, indiquez « non testé » et préparez la tâche à donner. N'inventez pas de retour utilisateur.

Ce test porte sur la compréhension des écrans et du parcours. Vérifiez ensuite la navigation au clavier et le fonctionnement réel du formulaire sur la page codée.

## Vérifier votre rendu individuel

À la fin de l'atelier, ouvrez votre fichier et montrez :

- Une variable appliquée et sa correspondance CSS.
- Un composant, deux instances et leurs états.
- Le parcours cliquable et son schéma.
- La fiche atelier en mobile et en desktop, avec un contraste mesuré.
- Votre observation de test, la correction et ce qui reste à vérifier.

Ce rendu permet d'évaluer votre travail de maquettage. Le dossier du titre DWWM demandera aussi des réalisations codées, sécurisées et testées.

## À lire

- [Guide de prototypage dans Figma](https://help.figma.com/hc/fr/articles/360040314193-Guide-de-prototypage-dans-Figma), aide de Figma.
- [Thinking Aloud: The #1 Usability Tool](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/), Nielsen Norman Group, sur le test où la personne pense à voix haute. En anglais.

## Pour la discussion

- Quel choix UI aide votre persona à décider de s'inscrire ?
- Quel état manquait dans vos wireframes ?
- Qu'avez-vous changé après avoir vu quelqu'un utiliser la maquette ?
