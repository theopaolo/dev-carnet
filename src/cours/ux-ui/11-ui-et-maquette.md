---
title: "L'UI et la maquette"
order: 11
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
---

# L'UI et la maquette

La maquette reprend les contenus et l'ordre des wireframes. Elle précise la typographie, les couleurs, les espacements et les états des éléments interactifs.

## Du wireframe au design

Dans l'appli du snack, Inès cherche un repas à moins de 7 €. Les choix visuels doivent lui permettre de comparer les menus et de comprendre si sa commande est partie.

| Élément | Choix UI | Ce qu'Inès doit comprendre |
| --- | --- | --- |
| Carte d'un menu | Nom et prix lisibles, même place sur chaque carte | Ce qu'elle peut commander avec son budget |
| Bouton « Commander » | Action principale visible, distincte du lien de retour | Comment valider son choix |
| Champ du formulaire | Libellé visible et message près du champ concerné | Quelle information saisir ou corriger |
| Confirmation | Message explicite et récapitulatif de la commande | Que la commande est reçue et ce qui se passe ensuite |

Une couleur seule ne suffit pas à expliquer un état. Écrivez « Indisponible » ou « Commande confirmée » et gardez le texte lisible sur son fond.

## Le style guide

Le style guide rassemble les choix visuels réutilisés sur les écrans. Pour ce projet, une planche suffit :

- Une police et des styles de texte pour le titre de page, les titres de section, le texte courant et les libellés.
- Des couleurs nommées selon leur rôle : texte, fond, action principale, erreur et confirmation.
- Quelques espacements réguliers pour séparer les éléments d'une carte et les sections d'une page.

Vérifiez ces choix avec les vrais contenus. Un titre d'atelier long et un message d'erreur doivent tenir sans se chevaucher.

## Les composants

Un composant Figma est un élément que l'on réutilise à travers des instances. Une modification du composant se répercute sur ses instances. Des variantes décrivent ses différents états.

Pour le snack, une carte de menu conserve sa structure quand le nom, le prix ou la disponibilité changent. Le formulaire réutilise le même champ pour plusieurs informations, avec un état normal et un état d'erreur.

Dans Figma, composez l'élément avec du texte et des formes, organisez son contenu avec l'auto layout, puis créez un composant. Placez des instances dans la maquette. Testez un texte plus long pour vérifier que l'élément s'adapte.

## Atelier UI de la MJC

Reprenez vos wireframes dans le fichier d'équipe. Choisissez les contenus de vos ateliers à partir du brief et du cadre « 1–2. Préparer la réservation ». Utilisez des coordonnées fictives dans les formulaires.

### Choisir les styles

En équipe, 20 minutes.

Choisissez une police, quelques couleurs et des espacements réguliers. Essayez-les sur une carte d'atelier et vérifiez sa lisibilité.

### Créer les composants

En équipe, 40 minutes.

Créez un bouton, un champ de formulaire et une carte d'atelier réutilisables. Prévoyez un focus visible et un message d'erreur compréhensible.

### Assembler la maquette

En équipe, 1 heure.

Appliquez vos styles et composants aux trois wireframes. Gardez une copie de la version en gris. Reliez les écrans pour pouvoir essayer une réservation.

Conservez les états prévus : erreur, confirmation, séance complète et accord parental. Vérifiez les critères de votre story de réservation.

Rendu : la maquette cliquable dans votre fichier d'équipe, avec les styles et composants utilisés.

## Tester l'inscription

En équipe, 30 minutes.

Demandez à une personne qui n'a pas conçu la maquette de réserver une séance. Laissez-la essayer sans la guider et notez ce qui la bloque.

> Tu veux essayer une activité à la MJC. Choisis un atelier et réserve une séance. Explique ensuite ce que tu as réservé et ce qu'il te reste à faire avant de venir.

Corrigez le principal problème, puis faites réessayer. Vérifiez aussi que les messages de séance complète et d'accord parental sont compréhensibles.

Rendu : quelques notes sur le problème observé, votre correction et le résultat du nouvel essai.

Le prototype sert à vérifier la compréhension et le parcours. Le clavier et le fonctionnement réel du formulaire seront testés sur la page codée.

## Pour la discussion

- Quel choix UI aide votre persona à décider de s'inscrire ?
- Quel état manquait dans vos wireframes ?
- Qu'avez-vous changé après avoir vu quelqu'un utiliser la maquette ?
