---
title: 'Accessibilité, HTML et ARIA'
order: 15
publishedAt: "2026-10-01"
updatedAt: "2026-10-01"
---

# Accessibilité, HTML et ARIA

Pour la MJC, un parcours accessible permet de choisir une séance, de remplir le formulaire, de corriger une erreur et de comprendre le résultat. Vérifiez ces actions au clavier et avec un lecteur d’écran (*screen reader*), en plus de l’affichage.

<div class="course-intro">
<img src="/ressources/ux-ui/a11y/lecture.webp" alt="" width="528" height="488">
<div>

**Votre objectif**

Repérer ce qui empêche une personne d’utiliser la page, choisir le HTML adapté et tester la correction. Vous vérifierez aussi les informations reçues par les technologies d’assistance (*assistive technologies*), comme les lecteurs d’écran.

</div>
</div>

## Reconnaître une barrière

| Situation d’usage | Barrière | Amélioration à tester |
| --- | --- | --- |
| Navigation au clavier, au contacteur ou par commande vocale | Un élément réagit seulement au clic | Bouton natif, ordre logique, focus visible |
| Synthèse vocale ou plage braille | Le contrôle annonce seulement "bouton" | Nom compréhensible, rôle et état corrects |
| Basse vision, agrandissement du texte | Texte coupé ou trop peu contrasté | Contraste mesuré, mise en page qui se redistribue |
| Surdité ou malentendance | L’information n’existe que dans l’audio | Sous-titres synchronisés, transcription adaptée au média |
| Difficultés d’attention, de lecture ou de compréhension | Consigne longue, vocabulaire obscur, erreur imprécise | Étapes explicites, texte clair, erreur qui aide à corriger |

Un élément a le **focus** lorsqu’il reçoit les actions du clavier. Son contour visible permet de le repérer. Un **contacteur** (*switch*) est un dispositif qui permet de commander l’interface avec un geste adapté.

Ces situations peuvent se combiner. Un simulateur montre un effet visuel, sans reproduire l’expérience complète d’une personne. Lors d’un test utilisateur, observez les obstacles du produit sans demander aux participants de révéler un handicap. [Exemples d’usages, W3C](https://www.w3.org/WAI/perspective-videos/fr).

> "Je passe parfois 1 heure à remplir un questionnaire et, arrivée à la fin, je ne peux pas cocher la case de consentement qui n’est pas accessible au clavier."
>
> Virginie, 49 ans, comédienne, malvoyante de naissance. [Baromètre de l’accessibilité numérique 2023](https://contentsquare.com/fr-fr/blog/actualite-digitale-novembre-2023/), page 22.

Une seule case que Tab n’atteint pas suffit à bloquer toute la démarche.

<details class="course-details">
<summary>Handicap permanent, limitation temporaire, contexte d’usage</summary>

Une personne qui utilise un contacteur, une personne avec une main immobilisée et un parent qui porte un enfant peuvent rencontrer un obstacle similaire face à une interaction qui exige un geste précis. Leurs expériences restent différentes.

Un lecteur d’écran peut produire de la parole ou alimenter une plage braille (*braille display*). Une personne malvoyante peut utiliser le zoom, des couleurs personnalisées ou plusieurs outils à la fois. La commande vocale (*voice control*) permet de piloter l’interface par la voix. Elle ne joue pas le même rôle que la synthèse vocale (*text-to-speech*).

Pour comprendre un besoin, observez une tâche avec les personnes concernées. Un filtre de daltonisme aide à examiner une palette, mais ne remplace ni la mesure du contraste ni un test utilisateur. [Microsoft, conception inclusive](https://inclusive.microsoft.design/) et [W3C, outils et techniques](https://www.w3.org/WAI/people-use-web/tools-techniques/).

</details>

<details class="course-details">
<summary>Des chiffres à lire avec leur définition</summary>

Dans le monde, l’OMS estime que **1,3 milliard de personnes**, soit une personne sur six, vivent avec un handicap important. [OMS, 2023](https://www.who.int/news-room/fact-sheets/detail/disability-and-health).

Le WebAIM Million 2026 teste automatiquement les pages d’accueil du million de sites les plus visités : **95,9 %** ont au moins une erreur détectable. Les six erreurs les plus fréquentes sont le contraste trop faible (84 % des pages), l’image sans alternative (53 %), le champ sans étiquette (51 %), le lien vide (46 %), le bouton vide (31 %) et la langue absente (14 %). L’analyse automatique ne repère qu’une partie des problèmes possibles. Ces résultats ne constituent pas un audit complet. [WebAIM Million](https://webaim.org/projects/million/).

En France, la DREES indique qu’en 2022, **14,5 millions de personnes de 15 ans ou plus vivant à domicile en France métropolitaine** déclarent au moins une limitation fonctionnelle sévère. Pour les fortes restrictions dans les activités essentielles du quotidien, le nombre est de **5,4 millions**. Ces indicateurs décrivent des réalités différentes.

Les infographies "12 millions" ou "80 % invisibles" ne suffisent donc pas à elles seules : il faut connaître leur source, leur date, la population et la définition du handicap retenue. [DREES, Le handicap en chiffres, édition 2024](https://www.drees.solidarites-sante.gouv.fr/publications-communique-de-presse-documents-de-reference/panoramas-de-la-drees/241128_Panorama_Handicap2024).

</details>

---

## WCAG et RGAA

Les **WCAG** (*Web Content Accessibility Guidelines*) sont les recommandations du W3C pour l’accessibilité des contenus web. Elles reposent sur quatre principes : perceptible, utilisable, compréhensible et robuste.

Les niveaux A, AA et AAA regroupent des exigences. Pour atteindre AA, il faut aussi satisfaire celles du niveau A. Un score Lighthouse ne mesure pas ces niveaux.

Le **RGAA**, Référentiel général d’amélioration de l’accessibilité, fournit la méthode française de contrôle. Sa version **4.1.2** comprend 106 critères répartis en 13 thèmes, avec leurs tests et cas particuliers. Elle s’appuie sur WCAG 2.1 A et AA. WCAG 2.2 existe, mais ses nouveaux critères ne deviennent pas automatiquement des critères RGAA 4.1.2. Au 30 septembre 2026, RGAA 5 est annoncé pour fin 2026. [Référentiel officiel](https://accessibilite.numerique.gouv.fr/).

<details class="course-details">
<summary>Cadre légal : à quels services les obligations s’appliquent-elles ?</summary>

L’obligation dépend de l’organisme et du service. L’article 47 concerne notamment le secteur public et certaines entreprises privées. Depuis le 28 juin 2025, d’autres exigences couvrent certains produits et services, dont le commerce électronique, avec des exceptions. "Tous les sites de plus de dix salariés" est une simplification incorrecte. Les micro-entreprises sont exemptées pour leurs services.

L’Arcom peut sanctionner un service public non conforme jusqu’à 50 000 €, et jusqu’à 25 000 € pour les obligations de publication : mention, déclaration d’accessibilité, schéma pluriannuel. La sanction est renouvelable tous les six mois. Cherchez la déclaration d’accessibilité en bas de page d’un site. [Access42, contrôles de l’Arcom](https://access42.net/arcom-autorite-controle-accessibilite-numerique-missions-controles-sanctions/).

Consultez le [champ d’application RGAA](https://accessibilite.numerique.gouv.fr/obligations/) et les [explications de la DGCCRF](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/professionnels-vos-produits-et-services-doivent-etre-conformes-la-directive-accessibilite).

</details>

| Principe | Question à poser sur la réservation |
| --- | --- |
| Perceptible | Les places disponibles sont-elles indiquées autrement que par la couleur ? |
| Utilisable | Puis-je choisir et réserver sans souris ? |
| Compréhensible | Le formulaire explique-t-il comment corriger mon erreur ? |
| Robuste | Le champ et le bouton exposent-ils un nom, un rôle et les états attendus ? |

<aside class="course-note">

**Le réflexe à garder**

Utilisez d’abord les éléments HTML adaptés : bouton, lien, champ. Le navigateur fournit leur comportement **natif**, c’est-à-dire intégré. CSS règle leur apparence. Les attributs **ARIA** complètent, si nécessaire, les informations transmises aux technologies d’assistance. Ils n’ajoutent pas de comportement.

</aside>

## Commencer par le HTML

```html
<!-- Une destination -->
<a href="ateliers.html">Voir les ateliers</a>

<!-- Une action -->
<button type="submit">Réserver ma séance</button>

<!-- Un champ nommé -->
<label for="email">Adresse e-mail (obligatoire)</label>
<input id="email" name="email" type="email" required>
```

Pour choisir entre lien et bouton, demandez-vous si l’on va quelque part. Un lien mène à une page ou à un fichier. Un bouton déclenche une action : envoyer, ouvrir une aide, supprimer. Un `<a href="#" onclick="supprimer()">` est annoncé "lien" et ne réagit pas à Espace. Un bouton qui change de page avec `location.href` ne s’ouvre pas dans un nouvel onglet.

Un `div onclick="..."` ne fournit pas le comportement clavier d’un bouton. Ajouter `role="button"` décrit un rôle, mais ne programme ni l’activation ni le focus. Un `tabindex="0"` le rend atteignable, mais ne suffit toujours pas. Utilisez le bouton natif.

Structurez la page avec des titres `h1` à `h6`, des listes et des régions (*landmarks*) comme `main` et `nav`. Agrandir un paragraphe `p` ne le transforme pas en titre pour un lecteur d’écran. Pour notre page, gardez un seul `h1`. C’est une convention de l’exercice, pas une obligation universelle du RGAA.

Un lien s’active avec Entrée. Un bouton natif s’active avec Entrée ou Espace. Tab parcourt les éléments interactifs, pas tous les textes. Évitez les `tabindex` positifs, qui modifient artificiellement l’ordre de tabulation (*tab order*). [Comportement des boutons, W3C](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

<figure class="course-media">
<img src="/ressources/ux-ui/a11y/clavier-w3c.jpg" width="320" height="180" loading="lazy" alt="Un homme utilise son ordinateur avec une commande actionnée par la bouche.">
<figcaption><strong>Un parcours qui fonctionne sans souris</strong><br>Dans cette vidéo, le choix d’une date bloque lorsque le site impose la souris. <a href="https://www.w3.org/WAI/perspective-videos/keyboard/fr">Voir la vidéo W3C WAI et sa transcription en français</a>. Vignette © W3C, Web Accessibility Perspectives.</figcaption>
</figure>

<details class="course-details">
<summary>À vous de repérer le problème : un faux titre et un faux bouton</summary>

```html
<p class="grand-titre">Réserver un atelier</p>
<div role="button" tabindex="0" onclick="reserver()">Réserver</div>
```

Le paragraphe ne figure pas dans la liste des titres. Le `div` reçoit le focus et expose un rôle, mais son gestionnaire de clic seul ne lui donne pas le comportement clavier d’un bouton. Un `h1` et un `button` répondent à ces besoins. Le bouton doit ensuite déclencher la bonne action et restituer son résultat.

```html
<h1>Réserver un atelier</h1>
<button type="submit">Réserver</button>
```

Ce bouton `submit` appartient au formulaire de réservation. Si l’action n’envoie pas un formulaire, choisissez `type="button"`. [W3C, hiérarchie des titres](https://www.w3.org/WAI/tutorials/page-structure/headings/).

</details>

---

## Nom, rôle, état

Pour utiliser un contrôle, une personne doit pouvoir connaître son **nom** (*accessible name*), son **rôle** et les **états** utiles. Les WCAG en font le critère 4.1.2, *Name, Role, Value*. Avec `<button aria-expanded="false">Afficher l’aide</button>`, le lecteur d’écran peut annoncer "Afficher l’aide, bouton, réduit". Les mots et leur ordre varient selon le lecteur d’écran et ses réglages.

- Le nom "Afficher l’aide" vient du texte visible.
- Le rôle "bouton" vient de la balise `button`.
- L’état fermé vient de `aria-expanded="false"`.

Une **description** ajoute une précision, comme le format attendu ou une erreur. Le navigateur regroupe ces informations dans son **arbre d’accessibilité** (*accessibility tree*), une représentation de la page destinée aux technologies d’assistance. Inspectez cet arbre, puis testez ce que le lecteur d’écran annonce.

```html
<label for="courriel">Adresse e-mail</label>
<input id="courriel" type="email" aria-describedby="aide-email">
<p id="aide-email">Exemple : prenom@exemple.fr</p>
```

Ici, le nom est "Adresse e-mail". Le format est une description. `aria-describedby` ne remplace pas un `label`.

### Quand utiliser aria-label

Privilégiez le texte visible et les associations HTML natives. Un bouton textuel clair n’a généralement pas besoin d’ARIA. Un bouton composé uniquement d’une icône peut avoir un `aria-label` qui décrit son action.

```html
<button type="button" aria-label="Fermer l’aide">
  <span aria-hidden="true">×</span>
</button>
```

Le rôle bouton est déjà fourni par HTML. Il est inutile d’écrire "bouton Fermer l’aide". Une icône ambiguë peut aussi nécessiter un texte visible pour aider les personnes qui voient l’écran.

Si une image est le seul contenu du bouton et qu’aucun attribut ARIA ne remplace son nom, son `alt` fournit le nom du bouton. Écrivez l’action, `alt="Rechercher"`, pas le dessin, `alt="Loupe"`. [RGAA, critère 11.9](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.9).

### Le piège à repérer

```html
<button aria-label="Supprimer">Recommencer</button>
```

<details class="course-details">
<summary>Afficher la réponse et la correction</summary>

Le nom annoncé est "Supprimer", alors que l’écran affiche "Recommencer". La personne qui commande à la voix utilise les mots visibles. Corrigez en supprimant cet attribut et en conservant le texte du bouton. Le nom accessible doit contenir le libellé visible. [Label in Name, W3C](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name).


```html
<button type="button">Recommencer</button>
```

</details>

<aside class="course-note">

**Avant d’ajouter aria-label**

Un texte visible clair nomme déjà votre bouton. Pour une icône seule, fournissez un nom qui décrit l’action. Si du texte est visible, le nom accessible doit le contenir. Vérifiez le résultat dans l’arbre d’accessibilité.

</aside>

<details class="course-details">
<summary>Aller plus loin : aria-labelledby et les sources du nom</summary>

`aria-labelledby` désigne, par leur `id`, les éléments dont le texte fournit le nom accessible. Sur les contrôles qui acceptent un nom, il est généralement prioritaire sur `aria-label`, lui-même prioritaire sur le nom fourni par HTML. Le résultat dépend toutefois de l’élément et des références valides. Utilisez une seule source de nom quand elle suffit, puis vérifiez le résultat.

N’ajoutez pas `aria-label` à tous les paragraphes ou `div`. Certains rôles interdisent le nommage. Ne masquez pas au lecteur d’écran un contrôle utilisable au clavier avec `aria-hidden="true"`. [Noms et descriptions, W3C](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/).


```html
<h2 id="titre-contact">Contacter la MJC</h2>
<form aria-labelledby="titre-contact">
  <!-- Champs avec leurs propres labels -->
</form>
```

Le formulaire réutilise un titre visible pour son nom. Cela ne nomme pas automatiquement ses champs. Chaque champ conserve son propre `label`.

| Besoin | Solution habituelle |
| --- | --- |
| Nommer un champ | `label` associé avec `for` et `id` |
| Nommer un bouton texte | Son contenu visible |
| Nommer un bouton icône | `aria-label`, si aucun texte associé ne convient |
| Réutiliser un texte existant comme nom | `aria-labelledby` avec des identifiants valides |
| Ajouter une aide ou une erreur | `aria-describedby` |
| Donner l’état ouvert ou fermé d’un disclosure | `aria-expanded` |

</details>

### Un état qui change

ARIA décrit l’état. Votre JavaScript doit le mettre à jour à chaque clic.

```html
<button type="button" aria-expanded="false"
  aria-controls="aide">
  Aide sur l’adresse e-mail
</button>
<p id="aide" hidden>Exemple : prenom@exemple.fr</p>
```

```js
bouton.addEventListener('click', () => {
  const ouvert = bouton.getAttribute('aria-expanded') === 'true';
  bouton.setAttribute('aria-expanded', String(!ouvert));
  aide.hidden = ouvert;
});
```

`aria-expanded` doit toujours correspondre à ce qui est affiché. `aria-controls` pointe vers l’identifiant du panneau. `hidden` cache le panneau à tout le monde. Sans JavaScript, `<details>` et `<summary>` gèrent cet état à votre place. [Motif disclosure, W3C](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

## Images, couleurs et zoom

Le **texte alternatif** (*alt text*), porté par l’attribut `alt`, dépend du rôle de l’image dans la page :

- Une image informative demande un texte qui transmet l’information utile.
- Une décoration utilise `alt=""` pour être ignorée par les lecteurs d’écran.
- Une image seule dans un lien ou un bouton doit en décrire la destination ou l’action.
- Un graphique demande souvent une description détaillée ou un tableau en complément.

La même photo peut être informative dans une page et décorative dans une autre. Vérifiez le sens de son alternative, pas seulement sa présence. [Images, W3C](https://www.w3.org/WAI/tutorials/images/).

Mesurez le contraste : au moins 4,5:1 pour le texte courant et 3:1 pour le grand texte, soit au moins 24 px CSS, ou environ 18,7 px en gras. Les composants et informations graphiques nécessaires ont aussi des exigences de contraste, généralement 3:1. La couleur seule ne doit pas porter une information nécessaire. Les exceptions se lisent dans le critère. [Contraste du texte](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [RGAA, thème 3](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#3).

Faites deux tests : agrandissez le texte à 200 %, puis réduisez la largeur d’affichage à 320 px CSS. Le contenu doit se réorganiser sans perte d’information ni défilement à la fois horizontal et vertical. Certains contenus, comme les tableaux, peuvent nécessiter deux directions de défilement.

Cette réorganisation s’appelle le *reflow*. Vous pouvez aussi la tester avec un zoom navigateur à 400 % sur une fenêtre de 1280 px. [Reflow, W3C](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html).

44 × 44 px est un objectif de confort pour nos boutons. Ce n’est pas le minimum universel de RGAA 4.1.2. WCAG 2.2 AA fixe une taille de cible (*target size*) de 24 × 24 px, ou certaines alternatives, avec exceptions. [Taille des cibles, W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

<details class="course-details">
<summary>Écrire un alt selon la fonction de l’image</summary>

```html
<!-- Illustration décorative, information déjà présente dans le texte -->
<img src="illustration.webp" alt="">

<!-- L’image est le seul contenu du lien -->
<a href="/ateliers/photo/">
  <img src="photo.webp" alt="Découvrir l’atelier photo">
</a>
```

Pour un graphique, donnez une alternative courte qui identifie son sujet, puis les valeurs et la conclusion utile dans le texte ou un tableau. Une capture de code ne remplace pas un bloc de code sélectionnable. L’absence de `alt` et `alt=""` n’expriment pas la même intention. [W3C, choisir l’alternative d’une image](https://www.w3.org/WAI/tutorials/images/decision-tree/).

</details>

---

## Formulaires et messages

Gardez des libellés visibles, des consignes avant la saisie et des erreurs écrites qui expliquent la correction. Le `placeholder` ne remplace pas le `label` : il disparaît dès qu’on tape et il est souvent trop pâle. Il peut seulement ajouter un exemple.

Un contour rouge seul ne suffit pas. Associez l’erreur au champ, signalez l’état invalide quand il existe et retirez cet état après correction.

```html
<label for="email">Adresse e-mail</label>
<input id="email" type="email" autocomplete="email"
  aria-invalid="true" aria-describedby="email-err">
<p id="email-err">Il manque le @. Exemple : prenom@exemple.fr</p>
```

En arrivant sur le champ, vérifiez que le lecteur d’écran restitue "Adresse e-mail", l’état invalide et le message. L’ordre et les mots employés peuvent varier selon l’outil. `autocomplete="email"` permet le remplissage automatique. [RGAA, critères 11.1, 11.10 et 11.11](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11).

Pour une confirmation ajoutée sans recharger la page, prévoyez une zone `role="status"` avant d’y insérer le message. C’est une **région live** (*live region*) : ses mises à jour peuvent être annoncées sans déplacer le focus. Avec ce rôle, l’annonce attend généralement que le lecteur d’écran ait fini de parler (`polite`).

Réservez `role="alert"` aux messages urgents, susceptibles d’interrompre la lecture (`assertive`). Évitez une annonce à chaque frappe. `aria-live="off"` désactive ce mode d’annonce automatique, sans masquer le contenu au lecteur d’écran. [Messages de statut](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html), [Erreurs de formulaire](https://www.w3.org/WAI/tutorials/forms/notifications/).

Pour un disclosure, un bouton qui affiche et masque un contenu, commencez par `<details><summary>…</summary>…</details>`. Pour une boîte de dialogue (*dialog*, ou modale), étudiez `<dialog>` avant de réinventer un composant. ARIA renseigne la sémantique, il ne crée pas les interactions. [Principes ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).

<details class="course-details">
<summary>Exemple : un groupe de choix et son intitulé</summary>

```html
<fieldset>
  <legend>Votre séance</legend>
  <label><input type="radio" name="seance" value="mercredi"> Mercredi à 14 h</label>
  <label><input type="radio" name="seance" value="samedi"> Samedi à 10 h</label>
</fieldset>
```

`legend` décrit le groupe. Chaque choix a aussi son libellé. L’attribut `name="seance"` commun aux deux boutons radio permet un choix unique. Les flèches du clavier changent le choix dans le groupe natif. [W3C, regrouper les contrôles](https://www.w3.org/WAI/tutorials/forms/grouping/).

</details>

<details class="course-details">
<summary>Exemple : un disclosure sans JavaScript</summary>

```html
<details>
  <summary>Que faut-il apporter à l’atelier photo ?</summary>
  <p>Votre téléphone suffit. La MJC prête le reste du matériel.</p>
</details>
```

Le navigateur gère l’ouverture, la fermeture et l’état exposé. Testez avec Tab, Entrée ou Espace. Conservez un intitulé compréhensible quand le panneau est fermé. Les consignes indispensables avant la saisie restent visibles, même si les explications complémentaires sont repliées.

</details>

## Médias, mouvement et compréhension

Une vidéo de cours doit pouvoir être comprise sans entendre sa bande-son. Les sous-titres (*captions*) restituent la parole et les sons utiles. Une transcription (*transcript*) permet de relire le contenu. Si une information nécessaire n’existe qu’à l’image, décrivez-la à l’oral ou prévoyez l’alternative adaptée au média. Les exigences précises dépendent du type de média, du direct ou du préenregistré et des exceptions. [W3C, rendre les médias accessibles](https://www.w3.org/WAI/media/av/).

Évitez les animations automatiques qui concurrencent la lecture. Quand un contenu défile ou se met à jour, vérifiez les moyens de l’arrêter et les exigences du [thème 13 du RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#13). Respecter `prefers-reduced-motion` est utile, mais ne suffit pas à vérifier tous les critères liés au mouvement.

Pour réduire l’effort de compréhension, donnez une consigne par étape, utilisez des libellés stables et écrivez des erreurs qui indiquent quoi corriger. Gardez les consignes indispensables visibles. Réservez les disclosures aux explications complémentaires.

<aside class="course-note">

**À savoir expliquer sans votre éditeur**

Pourquoi un bouton natif ? D’où vient son nom ? Comment tester son état ? Quelle personne rencontre une barrière si le contrôle est mal construit ? Passez ensuite à la [méthode de test](/ux-ui/16-tester-et-auditer/).

</aside>
