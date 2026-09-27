---
title: "L'UI et la maquette"
order: 11
publishedAt: "2026-09-27"
updatedAt: "2026-09-27"
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

Reprenez vos wireframes dans le fichier d'équipe. Choisissez les contenus de vos ateliers à partir du brief et des réponses du client. Utilisez des coordonnées fictives dans les formulaires.

### Choisir les styles

En équipe, 30 minutes.

1. Posez côte à côte vos trois wireframes : liste des ateliers, fiche d'un atelier et réservation.
2. Créez la planche de styles. Essayez-les sur une carte d'atelier avant de les appliquer partout.
3. Vérifiez que le nom, l'âge minimum, le créneau et la gratuité de l'essai se lisent sans zoomer au format prévu.

### Dessiner les parties de l'interface

En équipe, 1 heure. Répartissez-vous ces éléments, puis assemblez-les.

| Partie à dessiner | Contenu | États à prévoir |
| --- | --- | --- |
| Carte d'atelier | Nom, description courte, âge minimum, accès à la fiche | Atelier avec séance disponible, atelier dont les séances sont complètes |
| Choix du créneau | Jour, horaire et disponibilité | Disponible, sélectionné, complet avec accès à la liste d'attente |
| Formulaire | Libellés, champs nécessaires, aide sur l'accord parental et bouton de réservation | Saisie normale, information manquante, erreur expliquée |
| Message de résultat | Atelier, créneau, statut et prochaine étape | Réservation confirmée, inscription en liste d'attente, accord parental à fournir si le brief le prévoit |

1. Créez les composants de base : bouton, champ et carte. Réutilisez-les dans ces quatre parties.
2. Ajoutez les états qui changent leur apparence ou leur texte. Pour une erreur, indiquez ce qui manque et comment le corriger.
3. Prévoyez un état de focus visible pour les éléments interactifs. Il servira lors de l'intégration au clavier.
4. Comparez les réalisations : mêmes styles de texte, mêmes espacements, mêmes boutons pour les mêmes actions.

### Assembler la maquette

En équipe, 45 minutes.

1. Dupliquez vos wireframes pour conserver la version en gris.
2. Appliquez les styles et remplacez les éléments répétés par les instances de vos composants.
3. Ajoutez les variantes d'écran prévues le matin : séance complète, erreur, accord parental et confirmation.
4. Reliez les écrans dans le mode Prototype pour simuler le choix d'un atelier, d'un créneau et la réservation. Les états du formulaire peuvent être simulés par des écrans préparés.
5. Relisez vos critères d'acceptation. Vérifiez où chacun apparaît dans le prototype.

Rendu : la planche de styles, les composants et la maquette reliée, dans la section « 8. UI et maquette ».

## Tester l'inscription

En équipe, 45 minutes. Une personne d'une autre équipe teste, une personne observe et une autre prend des notes. Présentez le contexte sans montrer les boutons à utiliser :

> Tu veux essayer une activité à la MJC des Tilleuls. Choisis un atelier qui correspond à ton âge et à tes disponibilités, puis réserve une séance d'essai. À la fin, dis ce que tu as réservé et ce qu'il te reste à faire avant de venir.

1. Laissez la personne avancer sans la guider. Notez où elle hésite, ce qu'elle comprend et les questions qu'elle pose.
2. Faites-lui ensuite essayer une séance complète, puis le cas d'une personne mineure. Vérifiez qu'elle distingue réservation confirmée, liste d'attente et accord parental à fournir.
3. Pour chaque blocage, notez l'écran, l'action tentée et ce qui s'est passé. Distinguez une difficulté de l'interface d'une interaction que votre prototype ne simule pas.
4. Corrigez le blocage le plus gênant et faites réessayer la partie concernée.
5. Reliez cette correction à un besoin relevé en entretien ou à une contrainte du brief. Notez si le nouvel essai résout le blocage observé.

Rendu : les observations, le besoin ou la contrainte concernés, le critère d'acceptation, la correction avant/après et le résultat du nouvel essai, dans la section « 9. Test ».

Le prototype permet de tester les libellés, la compréhension et l'enchaînement des écrans. Le fonctionnement au clavier, les lecteurs d'écran et l'envoi réel du formulaire seront vérifiés sur la page codée.

## Pour la discussion

- Quel choix UI aide votre persona à décider de s'inscrire ?
- Quel état manquait dans vos wireframes ?
- Qu'avez-vous changé après avoir vu quelqu'un utiliser la maquette ?
