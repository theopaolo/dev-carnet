---
title: "Atelier en équipe : MJC Tilleul"
order: 18
publishedAt: "2026-10-02"
updatedAt: "2026-10-02"
---

# Atelier en équipe : le site de la MJC Tilleul

En équipe, reprenez votre travail précédent et réalisez un parcours d’inscription en HTML, CSS et JavaScript. Utilisez des données fictives : l’inscription est une simulation.

La démonstration collective commence à **13 h**. L’après-midi sera consacré au SEO, le référencement dans les moteurs de recherche.

## Le parcours à réaliser

Choisissez une US (user story) de votre travail précédent : une phrase qui décrit le besoin d’un utilisateur.

Exemple : « En tant que parent, je souhaite inscrire mon enfant à une activité adaptée à son âge. »

Notez deux ou trois critères d’acceptation : des points à vérifier pour valider votre travail. Par exemple : « La fiche indique l’âge requis, les horaires et le tarif » et « Une adresse e-mail invalide affiche un message qui aide à la corriger ».

Reliez ces cinq pages :

1. Accueil (`index.html`).
2. Liste des activités.
3. Détail d’une activité.
4. Formulaire d’inscription.
5. Confirmation de l’inscription simulée.

Quelques activités fictives suffisent, avec une seule fiche détaillée. Si le formulaire est mal rempli, affichez une erreur qui explique comment corriger la saisie. Une fois le formulaire correctement rempli, affichez la confirmation.

## Les composants au choix

Ajoutez un ou plusieurs composants accessibles, là où ils aident l’utilisateur :

- Une modale : une fenêtre au-dessus de la page, par exemple une aide.
- Un accordéon : des sections que l’on ouvre et ferme, par exemple des questions fréquentes.
- Des onglets : plusieurs panneaux de contenu, dont un seul est affiché à la fois.

## Les vérifications avant 13 h

Gardez les 30 à 40 dernières minutes de la matinée pour tester et corriger le parcours complet.

- Faites le parcours sans souris : Tab et Maj+Tab pour vous déplacer, Entrée pour activer un lien, Entrée ou Espace pour un bouton. Le focus indique quel élément reçoit les actions du clavier : il doit avoir un repère visible. Testez aussi Échap pour fermer une modale ou les flèches pour changer d’onglet.
- Testez une erreur de formulaire, puis corrigez-la. Chaque champ doit avoir un libellé clair et l’erreur doit expliquer quoi corriger.
- Vérifiez les contrastes, le zoom à 200 % et l’affichage à 320 px de large. Tout doit rester lisible et utilisable.
- Avec un lecteur d’écran, comme VoiceOver ou NVDA, écoutez un champ, un bouton et le résultat du formulaire. Vérifiez les textes alternatifs des images utiles.
- Visez **100/100 en Accessibilité dans Lighthouse sur les cinq pages**. Utilisez un serveur local, comme Live Server. Ce score ne remplace pas les tests manuels.

Si vous n’avez pas terminé, indiquez ce qui fonctionne, ce qui reste à faire et les tests que vous n’avez pas pu effectuer.

## La démonstration à 13 h

Présentez votre US, le parcours au clavier, une erreur de formulaire et sa correction. Montrez le ou les composants choisis et expliquez vos tests et les difficultés restantes.

Chaque membre de l’équipe explique au moins un choix ou une correction qu’il a réalisé.

## La grille d’appréciation individuelle

Pour chaque équipe présentée, remplissez cette grille individuellement.

**Votre prénom : …

Équipe observée : …

Pour chaque ligne, choisissez un avis et ajoutez un exemple court :

- **Satisfaisant** : ce qui a été montré fonctionne et se comprend.
- **À améliorer** : vous avez observé une difficulté. Précisez laquelle.
- **Non observé** : le point n’a pas été montré ou testé.

| Critère | Questions pour vous guider | Votre avis | Exemple ou remarque |
| --- | --- | --- | --- |
| Objectif et parcours | Le parcours répond-il à l’US ? Les informations et les actions sont-elles faciles à trouver ? | | |
| Lisibilité et images | Les textes sont-ils lisibles et contrastés ? Les images utiles ont-elles un texte alternatif adapté ? | | |
| Navigation au clavier | Peut-on terminer le parcours sans souris ? Le focus est-il visible et se déplace-t-il dans un ordre logique ? | | |
| Formulaire | Les champs sont-ils clairement nommés ? Peut-on corriger une erreur et obtenir une confirmation ? | | |
| Composants choisis | Peut-on les utiliser au clavier ? Sait-on si une section est ouverte ou fermée, ou quel onglet est actif ? | | |
| Tests | L’équipe explique-t-elle les résultats de ses tests et les points encore à vérifier ? | | |
| Choix et travail en équipe | L’équipe explique-t-elle ses choix ? Chaque membre présente-t-il sa contribution ? | | |

Terminez par :

- Un point réussi, avec un exemple.
- Une amélioration prioritaire, son intérêt pour l’utilisateur et une proposition concrète.**

Exemple : « Les horaires et les tarifs sont faciles à trouver sur la fiche. Le bouton d’inscription est difficile à repérer. Augmenter son contraste aiderait les visiteurs à poursuivre leur inscription. »
