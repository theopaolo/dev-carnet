---
title: 'Style guide, tokens et composants'
order: 13
publishedAt: "2026-09-28"
updatedAt: "2026-10-01"
---

# Style guide, tokens et composants

Dans Figma, vous allez définir les couleurs, les styles de texte et les espacements du projet, puis créer des boutons et des champs réutilisables. Vous pourrez ainsi les modifier sur plusieurs écrans à la fois.

## Le style guide

Le style guide documente les règles visuelles de l'interface : polices, couleurs, espacements et exemples d'utilisation. Il traduit la charte graphique du projet pour les écrans.

Ces règles donnent les mêmes repères d'un écran à l'autre : présentation des boutons, libellés et erreurs. Le **focus** indique quel élément reçoit les actions du clavier. Vérifiez que vos choix permettent d'accomplir les tâches des user stories et respectent le brief.

| Notion | Ce qu'elle contient | Exemple pour la MJC |
| --- | --- | --- |
| Charte graphique | Les règles de l'identité visuelle à respecter | La police et la couleur de la MJC |
| Style guide | Les règles visuelles appliquées à l'interface | Les styles de texte, les couleurs par rôle et les espacements |
| Design token | Une décision de design nommée, avec une valeur | `color.action.primary` vaut `#c2410c` |
| Variable Figma | Une valeur réutilisable, liée à des propriétés du dessin | `color/action/primary` appliquée au fond de deux boutons |
| Composant | Une structure réutilisable avec du contenu et des états | Un bouton avec un libellé et un état focus |
| Design system | Des règles, des composants de design et de code, leur documentation et leur suivi | Une bibliothèque de boutons et de champs avec leurs usages, leurs états et leurs versions |

Un token peut se retrouver dans une variable Figma et une variable CSS. Les variables peuvent aussi contenir d'autres valeurs, comme les données fictives d'un prototype.

## Les design tokens

Un design token est une valeur de design associée à un nom : couleur, espacement ou taille de texte. Par exemple, `color.action.primary` nomme la couleur de l'action principale. Le nom reste le même quand vous changez la couleur.

| Token | Valeur de départ | Usage |
| --- | --- | --- |
| `color.text.default` | `#1a1a1a` | Texte courant |
| `color.background` | `#ffffff` | Fond de page |
| `color.action.primary` | `#c2410c` | Action principale |
| `color.text.on-action` | `#ffffff` | Texte sur l'action principale |
| `color.error` | `#b91c1c` | Message d'erreur, avec un texte explicite |
| `color.success` | `#15803d` | Confirmation, avec un texte explicite |
| `space.s` | `8 px` | Entre un libellé et son champ |
| `space.m` | `16 px` | Entre deux champs |
| `space.l` | `24 px` | Padding d'une carte |
| `space.xl` | `32 px` | Entre deux sections |

Ces valeurs et les [quatre styles de texte](/ux-ui/12-typographie-et-couleurs/#quatre-styles-pour-la-mjc) forment la mini-charte de l'exercice. Si vous avez déjà une charte, conservez-la et vérifiez ses contrastes.

### Token primitif, token sémantique et alias

Un token primitif nomme une valeur, par exemple `color.orange.700 = #c2410c`. Un token sémantique nomme son usage, par exemple `color.action.primary`. Un **alias** fait référence à un autre token au lieu de recopier sa valeur.

```text
color.orange.700 = #c2410c
color.action.primary = référence à color.orange.700
color.banner.background = référence à color.orange.700
```

Si les boutons doivent devenir bleus et la bannière rester orange, changez seulement la référence de `color.action.primary`. Deux rôles peuvent partager une couleur aujourd'hui et évoluer séparément demain.

Pour cet exercice, donnez directement une valeur à chaque token de rôle. Les alias et les modes clair ou sombre sont facultatifs.

## Les variables et les styles dans Figma

Une variable contient une valeur d'un type donné, par exemple une couleur ou un nombre. Un style de texte rassemble plusieurs réglages : police, taille, graisse et interligne. Un style peut lui-même utiliser des variables. [L'aide de Figma détaille cette distinction](https://help.figma.com/hc/en-us/articles/15871097384471-The-difference-between-variables-and-styles).

### Créer et appliquer les variables

1. Ouvrez **Variables** dans la navigation de gauche. Dans une ancienne interface, désélectionnez les éléments et cherchez **Local variables** dans le panneau de droite.
2. Créez une collection nommée `MJC`. Ajoutez les couleurs avec le type **Color** et les espacements avec le type **Number**.
3. Dans Figma, utilisez `/` pour regrouper les noms : `color/action/primary`, `space/m`. La notation avec des points dans ce cours désigne le même choix.
4. Sélectionnez le fond du bouton. Dans **Fill**, ouvrez le sélecteur des styles et variables et choisissez `color/action/primary`.
5. Dans le padding (espace intérieur) ou le gap (espace entre les éléments) d'un auto layout, utilisez **Apply variable** pour choisir `space/m`. Selon le champ, l'option apparaît au survol ou dans son menu contextuel.

Modifier la valeur d'une variable met à jour les propriétés qui lui sont liées. Taper la même couleur hexadécimale à deux endroits ne crée aucun lien. [Créer des variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) et [les appliquer](https://help.figma.com/hc/en-us/articles/15343107263511-Apply-variables-to-designs), aide officielle de Figma.

### Enregistrer les styles de texte

Sélectionnez un texte, réglez sa police, sa taille, sa graisse et son interligne. Ouvrez le sélecteur de styles de **Typography**, puis créez un style. Nommez les styles `text/page-title`, `text/section-title`, `text/body` et `text/label`. Appliquez-les aux textes de votre écran.

### Pourquoi réutiliser les styles

Si les libellés de dix champs sont réglés séparément, corriger leur interligne demande dix modifications et peut laisser des écarts entre les écrans. Un style partagé permet de corriger ce réglage pour les textes qui lui restent liés. Les variables jouent le même rôle pour leurs valeurs, comme une couleur ou un espacement.

Un style partagé reproduit aussi ses défauts, comme un contraste insuffisant. Testez-le sur la fiche, le formulaire et la confirmation, puis reportez les corrections dans le code.

### Vérifier que le lien fonctionne

Appliquez la variable d'action à deux boutons. Changez-la temporairement de `#c2410c` à `#1d4ed8` : les deux fonds doivent devenir bleus. Un élément qui reste orange utilise peut-être une valeur saisie directement. Retrouvez la propriété concernée, puis rétablissez la valeur prévue par la charte.

Faites le même essai avec `space/m`, de 16 à 20, puis revenez à 16. Le padding lié doit suivre.

## Du style guide au CSS

Dans cet exercice, nous nommons les propriétés personnalisées CSS (souvent appelées variables CSS) en remplaçant les points ou les `/` par des tirets, avec `--` au début.

| Token | Variable Figma | Propriété CSS |
| --- | --- | --- |
| `color.action.primary` | `color/action/primary` | `--color-action-primary` |
| `space.m` | `space/m` | `--space-m` |

```css
:root {
  --color-action-primary: #c2410c;
  --color-text-on-action: #ffffff;
  --space-s: 0.5rem;
  --space-m: 1rem;
}

.bouton {
  padding: var(--space-s) var(--space-m);
  color: var(--color-text-on-action);
  background: var(--color-action-primary);
}
```

Avec une taille racine de 16 px, `0.5rem` correspond à 8 px et `1rem` à 16 px. Conservez les unités dans la documentation.

Reportez les valeurs de Figma dans le CSS. Leur synchronisation nécessite un outil configuré pour le projet.

## Choisir les styles

**Travail individuel, après la démonstration.**

1. Reprenez la mini-charte fournie, ou votre charte déjà validée. Créez les quatre styles de texte et les variables de couleur et d'espacement.
2. Appliquez-les à une carte d'atelier et à un bouton. Utilisez le vrai nom de l'atelier.
3. Mesurez le contraste du texte sur le fond et du texte sur le bouton. Notez les deux couples de couleurs et leurs rapports.
4. Faites l'essai de modification d'une couleur et d'un espacement sur deux éléments liés, puis rétablissez la charte.

Rendu : votre planche de styles, les variables et une carte qui les utilise, dans la section "8. UI et maquette" de votre fichier personnel.

## Les composants

Un composant Figma est un modèle réutilisable. Les exemplaires placés sur les écrans sont ses **instances**, qui conservent un lien avec le composant principal (*main component*).

| Décision | Dans Figma | Dans le code |
| --- | --- | --- |
| Une structure commune | Un composant principal "Bouton" | Un élément HTML stylé ou un composant de l'application |
| Du contenu variable | Une propriété texte "Libellé" | Le texte ou une propriété du composant |
| Un état prévu | Des variantes normal, focus, désactivé | `:focus-visible`, `disabled` ou l'état de l'application |
| Plusieurs utilisations | Des instances | Plusieurs boutons construits avec les mêmes règles |

"Réserver" et "Rejoindre la liste d'attente" peuvent utiliser le même composant avec des libellés différents. La logique métier décide quelle action déclencher. Créer un composant Figma ne génère pas cette logique.

### Propriétés, variantes et surcharges

Une propriété texte modifie un contenu. Une variante décrit une version prévue du composant, comme l'état désactivé. Une **surcharge**, ou *override*, remplace localement une propriété d'une instance.

Une instance dont vous changez le libellé continue de suivre les couleurs du composant principal. Si vous changez aussi sa couleur, elle garde cette valeur locale. Réinitialisez cette propriété pour reprendre la couleur du composant principal.

Évitez de détacher une instance pour changer son texte : elle perdrait alors son lien avec le composant principal.

### Créer un composant dans Figma

1. Dessinez un bouton avec un libellé et ajoutez l'auto layout avec `Maj + A`. Réglez la largeur sur **Hug**, le padding avec vos variables et le texte avec votre style de libellé.
2. Créez le composant avec `Ctrl + Alt + K`, ou `Cmd + Option + K` sur Mac.
3. Dans les propriétés du composant, exposez le libellé comme propriété texte si possible. Vous pouvez aussi modifier le texte à l'intérieur de l'instance.
4. Ajoutez les variantes et nommez leur propriété `État` : normal, focus, désactivé.
5. Placez deux instances depuis **Assets**, avec des libellés différents. Modifiez le composant principal et observez les changements sur les deux instances.

Un bouton en **Hug** s'adapte à son contenu. **Fill** lui fait occuper la largeur disponible dans son parent en auto layout.

### Les états à prévoir

| État | Ce qu'il montre | À vérifier |
| --- | --- | --- |
| Normal | L'élément au repos | Son rôle reste reconnaissable. |
| Survol (*hover*) | Le pointeur passe dessus | Le changement ne déplace pas les éléments voisins. |
| Focus | L'élément reçoit les actions du clavier | Un contour visible permet de le repérer. |
| Sélectionné | La personne a fait un choix | Un texte ou une coche accompagne la couleur. |
| Désactivé | Une action est indisponible | La raison et la suite possible sont compréhensibles. |
| Erreur | Une saisie doit être corrigée | Un message près du champ explique quoi faire. |

## Créer les composants

**Démonstration, puis travail individuel.**

Créez un bouton et un champ réutilisables, puis placez des instances avec des contenus différents. Préparez les états normal, focus et désactivé du bouton. Si ces éléments fonctionnent, transformez aussi votre carte d'atelier en composant.

Modifiez le padding du composant principal : les deux instances doivent suivre. Vérifiez ensuite qu'un libellé long tient sur un écran étroit.

## Le design system

Un design system rassemble les styles visuels, les composants réutilisables et leurs règles d’usage. Il peut inclure une bibliothèque Figma, du code, des exemples et des consignes d’accessibilité.

Avant de créer un élément, vérifiez s’il existe déjà dans le projet. Consultez ses usages, ses états et ses limites, puis réutilisez-le s’il convient.

Le [DSFR, système de design de l’État](https://github.com/GouvernementFR/dsfr#readme), est un exemple à consulter : il propose du code et une documentation pour l’utiliser et y contribuer. Sa réutilisation dépend de ses conditions d’usage.

Dans cet atelier, vous créez une petite bibliothèque documentée. Pour l’utiliser comme design system sur plusieurs projets, il faudrait aussi du code, des tests et une personne chargée de gérer les changements et de publier les versions.

### L’atomic design, pour approfondir

Brad Frost propose de décomposer une interface en atomes, molécules, organismes, templates et pages. Pour cet atelier, aucun classement à mémoriser : expliquez simplement quels éléments vous réutilisez et ce qui change d’un usage à l’autre.

## Vérifier votre compréhension

1. Vous changez `color/action/primary`, mais un bouton garde son ancienne couleur. Quelle propriété vérifiez-vous ?
2. Deux boutons ont des libellés différents. Faut-il deux composants principaux ?
3. Le fichier Figma contient des couleurs et des boutons. Que manque-t-il pour guider leur utilisation dans une application ?

<details>
<summary>Comparer avec les réponses</summary>

1. Vérifiez si le fond utilise la variable ou une couleur saisie directement. Sur une instance, cherchez aussi une surcharge.
2. Un composant et deux instances suffisent si la structure et les règles sont communes. Le libellé est un contenu variable.
3. Il faut notamment décrire les usages et les états, fournir ou désigner les composants de code et organiser leurs changements.

</details>

## À lire

- [Guide des composants dans Figma](https://help.figma.com/hc/fr/articles/360038662654-Guide-des-composants-dans-Figma).
- [Design tokens](https://www.figma.com/resource-library/design-tokens/), Figma, en anglais.
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/), Brad Frost, en anglais.
