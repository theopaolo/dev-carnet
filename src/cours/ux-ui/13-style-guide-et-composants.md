---
title: 'Le style guide et les composants'
order: 13
publishedAt: "2026-09-28"
updatedAt: "2026-09-28"
---

# Le style guide et les composants

Le style guide rassemble les polices, les couleurs et les espacements de l'interface. Les composants sont les éléments réutilisés sur les écrans : boutons, champs et cartes.

## Le style guide

Pour ce projet, rassemblez vos choix sur une planche :

| Partie | Ce qu'elle contient |
| --- | --- |
| Textes | Une police et quatre styles : titre de page, titre de section, texte courant, libellé |
| Couleurs | Des couleurs nommées selon leur rôle : texte, fond, action principale, erreur, confirmation |
| Espacements | Quelques valeurs régulières, par exemple 8, 16, 24 et 32 px |

Les tailles des textes viennent de votre [échelle typographique](/ux-ui/12-typographie-et-couleurs/#lechelle-typographique). Les espacements multiples de 8 se divisent facilement et s'alignent entre eux : 8 px entre un libellé et son champ, 16 px entre deux champs, 32 px entre deux sections.

Vérifiez ces choix avec les vrais contenus. Un titre d'atelier long et un message d'erreur doivent tenir sans se chevaucher.

Dans Figma, enregistrez les couleurs et les espacements comme variables, et les textes comme styles de texte. Modifier une variable met à jour les propriétés qui lui sont liées.

## Du style guide au CSS

Reprenez ces choix dans le code avec des propriétés personnalisées CSS. Donnez-leur des noms qui correspondent aux variables Figma : `color.action.primary` devient `--color-action-primary`.

Voici le style guide du snack, écrit en CSS :

```css
:root {
  --color-text-default: #1a1a1a;
  --color-background: #ffffff;
  --color-action-primary: #c2410c;
  --color-error: #b91c1c;
  --color-success: #15803d;
  --space-s: 0.5rem; /* 8 px */
  --space-m: 1rem; /* 16 px */
  --space-l: 2rem; /* 32 px */
}

.bouton {
  padding: var(--space-s) var(--space-m);
  color: #ffffff;
  background: var(--color-action-primary);
}
```

Des noms correspondants dans Figma et dans le CSS permettent de retrouver le rôle de chaque couleur. Le barème vérifie que les couleurs de la maquette et du CSS sont les mêmes.

## Choisir les styles

1. Choisissez une police et créez les quatre styles de texte : titre de page, titre de section, texte courant et libellé.
2. Définissez les couleurs de texte, de fond, d'action, d'erreur et de confirmation. Nommez-les selon leur rôle.
3. Choisissez vos valeurs d'espacement et appliquez-les à une carte d'atelier.
4. Mesurez le contraste du texte et vérifiez que le nom de l'atelier tient dans la carte.

Rendu : vos styles dans votre fichier de projet.

## Les composants

Un composant Figma est un élément que l'on réutilise. Chaque copie posée sur un écran est une instance. Modifier le composant principal met à jour les propriétés liées de ses instances. Chaque instance peut garder un contenu différent, comme son libellé. Des variantes décrivent ses différents états.

Le principe est le même qu'en code. Un bouton écrit en dur à 50 endroits demande 50 corrections quand sa couleur change. Une classe `.bouton` se corrige une fois.

| Ce qu'on voit dans Figma | Ce que ça donne |
| --- | --- |
| Un composant, trois instances | Le même bouton affiche « Réserver », « Voir la fiche » ou « S'inscrire ». Le texte change, le style reste. |
| Les variantes d'un bouton | Normal, focus, désactivé |
| Les variantes d'un champ | Normal. Erreur, avec le message « Indiquez votre âge. » sous le champ |

Pour le snack, une carte de menu garde sa structure quand le nom, le prix ou la disponibilité changent. Le formulaire réutilise le même champ pour plusieurs informations, avec un état normal et un état d'erreur.

### L'atomic design

Le designer Brad Frost range les composants en niveaux, du plus petit au plus grand. Il appelle cette méthode l'_atomic design_.

| Niveau | Ce que c'est | Pour le snack |
| --- | --- | --- |
| Atome | La plus petite brique | Un bouton, un champ, un libellé, un prix |
| Molécule | Quelques atomes assemblés | Une barre de recherche : un champ et un bouton |
| Organisme | Des molécules assemblées en une partie de page | L'en-tête : le logo, la recherche et le panier |

Pour cet atelier, créez les atomes et les molécules nécessaires à la réservation. Les organismes apparaîtront quand vous assemblerez les écrans.

### Créer un composant dans Figma

1. Dessinez l'élément avec du texte et des formes.
2. Ajoutez l'auto layout avec Maj + A. L'élément s'adapte alors à la longueur de son texte.
3. Créez le composant : sélectionnez l'élément, puis Ctrl + Alt + K, ou Cmd + Option + K sur Mac.
4. Ajoutez des variantes pour les états.
5. Nommez le composant et ses variantes clairement, par exemple « Bouton » avec une propriété « État » : normal, focus, désactivé.
6. Placez des instances sur un écran. Testez un texte plus long pour vérifier que l'élément s'adapte.

### Les états à prévoir

| État | Ce qu'il montre | À vérifier |
| --- | --- | --- |
| Normal | L'élément au repos | Il se reconnaît comme cliquable ou comme champ. |
| Survol | La souris passe dessus | Le changement est visible, sans tout bouleverser. |
| Focus | L'élément est atteint au clavier | Un contour épais et contrasté. Sans lui, une personne qui navigue au clavier ne sait pas où elle se trouve. |
| Sélectionné | Un choix est fait, par exemple un créneau | Le texte ou une coche l'indique, pas la couleur seule. |
| Désactivé | L'action n'est pas possible pour l'instant | La raison est expliquée à côté. |
| Erreur | La saisie pose problème | Le message dit quoi corriger, près du champ concerné. |

## Les parties à dessiner

Chaque partie de votre inscription réutilise vos composants de base : le bouton, le champ et la carte.

| Partie | Son contenu | Ses états |
| --- | --- | --- |
| Carte d'atelier | Nom, description courte, âge minimum, accès à la fiche | Séance disponible, séances complètes |
| Choix du créneau | Jour, horaire, disponibilité | Disponible, sélectionné, complet avec accès à la liste d'attente |
| Formulaire | Libellés, champs, aide sur l'accord parental, bouton de réservation | Saisie normale, information manquante, erreur expliquée |
| Message de résultat | Atelier, créneau, statut, prochaine étape | Réservation confirmée, liste d'attente, accord parental à fournir |

## Créer les composants

1. Créez un bouton, un champ de formulaire et une carte d'atelier avec vos styles.
2. Ajoutez les variantes utiles : normal, focus et désactivé pour le bouton, normal et erreur pour le champ, disponible et complet pour la carte.
3. Placez des instances sur un écran. Changez un libellé et le nom de l'atelier pour vérifier que les éléments s'adaptent.
4. Vérifiez que le focus est visible et que le message d'erreur explique quoi corriger.

Rendu : les composants dans votre fichier de projet.

## À lire

- [Guide des composants dans Figma](https://help.figma.com/hc/fr/articles/360038662654-Guide-des-composants-dans-Figma), aide de Figma.
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/), Brad Frost. En anglais.
- [Système de design de l'État](https://www.systeme-de-design.gouv.fr/), le style guide et les composants des sites publics français. Regardez comment chaque composant décrit ses états.

## Pour la discussion

- Quel composant avez-vous réutilisé le plus souvent ?
- Qu'est-ce qui a cassé quand vous avez testé un texte plus long ?
- Votre focus se voit-il sur toutes vos couleurs de fond ?
