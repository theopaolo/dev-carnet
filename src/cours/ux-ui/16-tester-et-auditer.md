---
title: 'Tester et documenter l’accessibilité'
order: 16
publishedAt: "2026-10-01"
updatedAt: "2026-10-01"
---

# Tester et documenter l’accessibilité

Un constat d’accessibilité doit permettre à quelqu’un de reproduire le problème et de le corriger. Indiquez la page, les étapes du test, la difficulté rencontrée et le résultat attendu.

<aside class="course-note">

**À garder pendant les tests**

**Tâche → manipulation → observation → impact → correction → nouveau test.** Notez les mots effectivement annoncés et les touches utilisées. Indiquez "non testé" si vous n’avez pas effectué le test.

</aside>

## Comparer des exemples

| Exemple | Ce que vous examinez | Ce que vous pouvez conclure |
| --- | --- | --- |
| [Ara](https://ara.numerique.gouv.fr/) et sa [déclaration](https://ara.numerique.gouv.fr/accessibilite) | Liens d’évitement (*skip links*), titres, navigation, formulaire de connexion sans envoyer de données | Déclaration à 100 % RGAA 4.1.2, mise à jour le 9 octobre 2025, consultée le 30 septembre 2026. Lire le périmètre et l’environnement de l’audit |
| [W3C, site avant correction](https://www.w3.org/WAI/demos/bad/before/home.html) et [après correction](https://www.w3.org/WAI/demos/bad/after/home.html) | Même contenu, structure et alternatives différentes. Comparer aussi les formulaires Survey | Démonstration pédagogique historique WCAG 2.0, pas certificat RGAA 2026 |
| [Grenoble Alpes Métropole](https://www.grenoblealpesmetropole.fr/635-un-site-web-accessible.htm) | Lire la déclaration et le défaut restant | 98,55 % annoncés lors de la consultation du 30 septembre 2026, avec des PDF non conformes. L’ancien taux de 100 % ne décrit plus le résultat actuel |
| [Ada Tech School](https://adatechschool.fr/) | Choisir une tâche et deux pages, observer réellement | Aucun verdict préétabli. Retenir seulement les résultats que vous avez reproduits |

Une déclaration qui annonce une conformité totale s’appuie sur un audit daté et un périmètre précis. Lisez les pages et les environnements testés. Le résultat ne couvre pas tous les usages possibles et peut évoluer avec le site.

## Lire les chiffres d’un audit

Le baromètre Contentsquare Foundation **2023** étudie 50 sites français, sur trois pages par site et une sélection de 11 critères RGAA parmi les plus bloquants. Les audits manuels ont été réalisés par Numérik-ea et Temesis.

| Secteur | Part des 11 critères respectés, en moyenne |
| --- | --- |
| Sites publics | 69 % |
| Banques | 61 % |
| Médias | 44 % |
| E-commerce | 36 % |

52 % des sites étudiés sont sous 50 %, et 64 % ne publient pas leur taux. Les sites publics, soumis à une obligation depuis 2005, arrivent en tête. Le graphique suivant détaille quatre familles de critères. Il sert à comparer les obstacles étudiés, pas à décrire l’état de tous les sites en 2026.

<figure class="course-figure">
<img src="/ressources/ux-ui/a11y/barometre-2023.webp" width="890" height="529" loading="lazy" alt="Baromètre 2023 : résultats par secteur et par famille de critères. Les valeurs sont disponibles dans le tableau suivant.">
<figcaption>Contentsquare Foundation, baromètre 2023. Les pourcentages concernent uniquement les critères sélectionnés.</figcaption>
</figure>

<details class="course-details">
<summary>Lire les valeurs du graphique en tableau</summary>

| Secteur | Mouvement | Alternatives médias | Espacement | Navigation clavier |
| --- | --- | --- | --- | --- |
| Public | 25 % | 40 % | 77 % | 78 % |
| Banque | 0 % | 32 % | 64 % | 78 % |
| Médias | 0 % | 23 % | 64 % | 48 % |
| E-commerce | 11 % | 17 % | 38 % | 47 % |

Dans cet échantillon, la catégorie e-commerce atteint 47 % pour les critères de navigation clavier sélectionnés. Ce chiffre ne signifie pas que 47 % des sites marchands sont entièrement accessibles.

La méthodologie du PDF (pages 45 à 48) précise que cette étude n’est pas un audit de conformité complet. Les entretiens (pages 30 à 37) donnent des pistes pour tester les cookies, les formulaires, les CAPTCHA, les fenêtres qui s’ouvrent par-dessus la page (pop-ups) et les contrastes. [Présentation de l’étude 2023 par Contentsquare](https://contentsquare.com/fr-fr/blog/actualite-digitale-novembre-2023/).

</details>

<aside class="course-note">

**Un résultat doit garder son périmètre**

Demandez toujours : quelle date, quelles pages, quels critères, quels outils et quels tests humains ? Un résultat sur 11 critères ne produit pas un taux de conformité RGAA sur 106 critères. Un seuil de 50 % ne suffit pas à rendre un service totalement conforme.

</aside>

<details class="course-details">
<summary>Que nous apprend une étude plus récente ?</summary>

L’étude e-commerce 2025 de Contentsquare Foundation signale des obstacles majeurs dans **94 % des sites audités**. Elle porte sur les parcours d’achat et utilise une autre méthode. On ne peut donc pas soustraire ce résultat aux pourcentages de 2023 pour mesurer une évolution.

Testez le parcours jusqu’à son résultat, y compris le panier, les erreurs et la confirmation. [Étude 2025 et périmètre](https://www.contentsquare-foundation.org/fr/presse/etude-l-exclusion-numerique-dans-le-e-commerce).

</details>

---

## Tester en cinq étapes

Avant de commencer, fixez le périmètre : une tâche, deux pages et les états à tester. Notez les URL, la date, le navigateur et les outils. Suivez ensuite ces étapes dans l’ordre.

1. Réalisez la tâche **au clavier**. Tab avance et Maj+Tab revient entre les éléments interactifs. Entrée active un lien ou un bouton. Espace active un bouton ou une case à cocher. Vérifiez l’ordre de tabulation (*tab order*), le focus visible et les menus. Repérez les pièges au clavier (*keyboard trap*, souvent appelé *focus trap*), où le focus reste bloqué. Dans une boîte de dialogue ouverte, garder le focus à l’intérieur est voulu, tant qu’Échap ou un bouton permet d’en sortir. Tab ne parcourt pas les paragraphes.
2. Testez avec un **lecteur d’écran** (*screen reader*). Repérez un titre, un champ et un bouton. Vérifiez les noms, les rôles, les états et les messages annoncés. Inspectez aussi le HTML et l’arbre d’accessibilité (*accessibility tree*) : titres, noms des liens, libellés, langue et alternatives des images.
3. Vérifiez l’**affichage et les médias**. Agrandissez le texte à 200 %, essayez une largeur de 320 px et mesurez les contrastes. Dans les DevTools de Chromium, ouvrez Rendering puis "Emulate vision deficiencies" pour examiner les couleurs. Vérifiez qu’une information reste compréhensible sans distinguer le rouge du vert. Coupez le son d’une vidéo et vérifiez que les sous-titres (*captions*) restituent la parole et les sons utiles.
4. Lancez une **analyse automatique** avec axe, WAVE ou Lighthouse. Examinez au moins un résultat dans la page. Les alertes "à vérifier" demandent votre analyse. Un score de 100 ne certifie pas le site.
5. **Documentez et retestez**. Notez le constat, sa preuve et la correction proposée. Après modification, refaites les mêmes manipulations.

Les outils ne jugent pas la pertinence de tous les textes et ne vérifient pas qu’une personne peut terminer le parcours. La part des problèmes détectés dépend de l’outil et de la page. [Évaluer l’accessibilité, W3C](https://www.w3.org/WAI/test-evaluate/).

<figure class="course-media">
<img src="/ressources/ux-ui/a11y/lecture-vocale-w3c.jpg" width="320" height="180" loading="lazy" alt="Un homme écoute un contenu avec des écouteurs, son appareil posé à côté de lui.">
<figcaption><strong>Écouter une page</strong><br>Un lecteur d’écran permet de parcourir les titres, les liens et les champs, puis d’en écouter le contenu. <a href="https://www.w3.org/WAI/perspective-videos/speech/fr">Vidéo W3C WAI sur la synthèse vocale, avec transcription</a>. Vignette © W3C, Web Accessibility Perspectives.</figcaption>
</figure>

## Essayer un lecteur d’écran

<aside class="course-note">

**Une première tâche courte**

Trouvez le titre de la page, puis le champ e-mail, le bouton d’aide et le bouton d’envoi. Dites ce que vous attendez avant d’activer chaque contrôle. Comparez ensuite avec ce que vous entendez.

</aside>

<details class="course-details">
<summary>Sur Mac : commandes de VoiceOver</summary>

Préparez VoiceOver avec le formateur. Dans les raccourcis suivants, **VO** désigne la combinaison Contrôle + Option par défaut.

| Action | Raccourci |
| --- | --- |
| Activer ou désactiver VoiceOver | Commande + F5, parfois avec Fn selon le clavier |
| Aller à l’élément suivant | VO + flèche droite |
| Activer l’élément | VO + Espace |
| Ouvrir le rotor | VO + U |
| Interrompre la parole | Contrôle |

Le **rotor** permet de parcourir la page par type d’élément. Choisissez par exemple Titres ou Contrôles de formulaire. [Guide Apple](https://support.apple.com/fr-fr/guide/voiceover/vo2682/mac).

</details>

<details class="course-details">
<summary>Sur Windows : commandes de NVDA</summary>

Dans les raccourcis suivants, **NVDA** désigne la touche Inser ou Verr. maj., selon votre configuration.

| Action | Raccourci |
| --- | --- |
| Aller au titre suivant, en mode navigation | H |
| Aller au champ suivant, en mode navigation | F |
| Ouvrir la liste d’éléments | NVDA + F7 |
| Changer de mode navigation/formulaire | NVDA + Espace |
| Quitter NVDA | NVDA + Q |

Le mode navigation (*browse mode*) sert à parcourir le contenu. Le mode formulaire (*focus mode*) permet de saisir ou d’agir dans les contrôles. Consultez le [guide NVDA](https://download.nvaccess.org/documentation/fr/userGuide.html).

</details>

Avant de déclarer un défaut clavier sur Mac, vérifiez que la navigation clavier de macOS et du navigateur permet d’atteindre tous les contrôles. Safari et Helium peuvent avoir des réglages différents. Notez le système, le navigateur et le lecteur d’écran utilisés. Ce premier essai ne couvre pas toutes les combinaisons à vérifier pour un audit.

Testez sur une page locale, avec des données fictives. Notez ce qui est réellement annoncé. L’arbre d’accessibilité aide à diagnostiquer, mais ne remplace pas la restitution du lecteur d’écran. Si le lecteur ne fonctionne pas, indiquez "non testé" et demandez une démonstration accompagnée.

## Lire un critère RGAA

Ouvrez les [critères et tests](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/). Pour une action impossible au clavier, cherchez **7.3**, puis son test **7.3.1**. Lisez les conditions du test et les cas particuliers, puis appliquez-le à la page. Expliquez ce que vous avez vérifié et le résultat observé.

Utilisez ces repères pour trouver le critère, puis lisez son test avant de conclure.

| Point à examiner | Critères RGAA |
| --- | --- |
| Images et alternatives | 1.1 à 1.3 |
| Couleur et contraste | 3.1 à 3.3 |
| Liens explicites | 6.1 |
| Composants pilotés par JavaScript | 7.1 et 7.3 |
| Messages de statut (*status messages*) | 7.5 |
| Langue et titre de la page | 8.3 et 8.5 |
| Hiérarchie des titres | 9.1 |
| Texte agrandi et focus visible | 10.4 et 10.7 |
| Étiquettes des champs (*labels*) | 11.1 et 11.2 |
| Intitulés des boutons | 11.9 |
| Erreurs de saisie | 11.10 et 11.11 |
| Ordre de tabulation (*tab order*) et piège au clavier (*keyboard trap*, *focus trap*) | 12.8 et 12.9 |

<details class="course-details">
<summary>Conforme, non conforme, non applicable, non testé</summary>

- **Conforme** : le critère applicable et ses tests sont satisfaits sur le périmètre contrôlé.
- **Non conforme** : au moins un test applicable échoue. Décrivez le cas.
- **Non applicable** : le critère ne s’applique pas à ce contenu, avec une justification. Une page sans vidéo ne permet pas de conclure que ses sous-titres sont conformes.
- **Non testé** : vous n’avez pas effectué les vérifications nécessaires. Ce statut de suivi pédagogique n’est ni une conformité ni une exemption.

Dans un audit complet, le taux dépend des critères applicables à l’échantillon et des règles de la méthode. Dans cet atelier, vous ne calculez aucun taux global. [RGAA, méthode de test](https://accessibilite.numerique.gouv.fr/methode/).

</details>

## Un constat utile

> Sur la page locale a-corriger.html, après le champ e-mail, Tab passe directement à Recommencer. L’action Recevoir les informations est un div cliquable absent du parcours clavier. Une personne utilisant uniquement le clavier ne peut pas déclencher cette demande. Je propose un bouton submit et un gestionnaire submit sur le formulaire. Je retesterai avec Tab puis Entrée, y compris avec une saisie invalide.

Une capture montre l’affichage à un instant donné. Pour expliquer le parcours du focus, ajoutez les touches utilisées et le résultat observé. Distinguez les corrections proposées sur un site externe de celles réalisées dans votre code.

Notez vos constats dans votre dossier. Ce diagnostic limité ne produit pas de taux de conformité. Un audit RGAA complet exige un échantillon et l’ensemble des critères applicables, avec la méthode prévue. [Méthode officielle](https://accessibilite.numerique.gouv.fr/methode/).

<details class="course-details">
<summary>Modèle : un ticket que quelqu’un peut reprendre</summary>

**Page et tâche** : `a-corriger.html`, demander les informations sur un atelier.

**Environnement** : date, système, navigateur et version, lecteur d’écran si utilisé.

**Étapes** : recharger, appuyer sur Tab jusqu’au champ e-mail, appuyer à nouveau sur Tab.

**Observé** : le focus arrive sur Recommencer et saute Recevoir les informations.

**Attendu et impact** : l’action d’envoi doit être atteignable et activable au clavier. La demande est actuellement impossible sans souris.

**Référence à vérifier** : RGAA 7.3, test 7.3.1 pour cette action scriptée, et parcours clavier selon le cas.

**Correction proposée** : remplacer le `div` par un bouton submit et traiter l’événement submit du formulaire.

**Retest** : refaire le parcours avec Tab et Entrée, puis tester une adresse invalide et une adresse valide. Consigner le résultat réel et les points restants.

</details>

<aside class="course-note">

**Ordre de traitement**

Traitez d’abord ce qui bloque la tâche, puis les difficultés qui la rendent pénible ou ambiguë. Indiquez aussi la fréquence et le périmètre. La priorité de correction et le statut de conformité sont deux informations distinctes.

</aside>

