---
title: "Guide d'animation"
order: 15
hidden: true
---

# Préparer et animer l’atelier

Le parcours de cinq heures fait produire une petite documentation que les collègues peuvent essayer et discuter. Prépare d’abord la démonstration complète. Pendant la séance, sélectionne les manipulations ci-dessous plutôt que de lire les neuf chapitres à voix haute.

## Ce que tu dois savoir expliquer

| Notion | Explication à maîtriser | Preuve à préparer |
| --- | --- | --- |
| Diátaxis | La forme d’une page dépend de la tâche du lecteur | Classer quatre documents sans citer leur outil |
| C4 | Le contexte montre les acteurs, les conteneurs montrent les applications et stockages | Expliquer les deux vues du chapitre 5 |
| Merise | Les règles métier conduisent au MCD, puis au modèle relationnel | Lire une cardinalité et justifier une clé étrangère |
| ADR | Une décision garde ses raisons, options et conséquences | Expliquer pourquoi l’ADR 001 refuse une seconde création |
| BDD | Le groupe découvre un comportement avec des exemples puis choisit lesquels automatiser | Animer une discussion avant de montrer Gherkin |
| Documentation vivante | Chaque information a une source et un moyen adapté de la maintenir | Modifier une règle et suivre ses conséquences |
| Documentation-driven design | Écrire un usage proposé aide à concevoir sa réalisation | Faire relire la règle de réactivation avant de coder |
| Génération | L’outil transforme ou extrait une information identifiée | Distinguer JSDoc, imports extraits et Mermaid écrit à la main |

BDD ne signifie pas « base de données » dans ce cours. QA désigne la perspective qualité et la recherche des cas limites. Un ADR concerne une décision structurante. Une liste de tâches d’implémentation peut être utile sans devenir un ADR.

## Préparation personnelle en trois séances

Prévoir deux à trois heures la première fois, plus le temps de téléchargement. Ce travail précède les cinq heures avec les collègues.

1. Pendant 45 minutes, lire les chapitres 1 à 4 et exécuter les deux commandes de base du [kit](/documentation/10-demonstration/). Faire expliquer le README par une autre personne.
2. Pendant 45 minutes, lire les chapitres 5 à 7. Modifier un libellé Mermaid, régénérer les dessins et comparer MCD et modèle relationnel. Lire l’ADR rempli, puis retrouver le test correspondant.
3. Pendant 60 minutes, lire les chapitres 8 et 9. Exécuter les scénarios BDD, ouvrir leur rapport, lancer la régression préparée et construire le site. S’entraîner à expliquer chaque résultat en deux phrases.

Avant la séance, installer les dépendances sur la machine de démonstration. Conserver les SVG, le site construit et le rapport BDD pour une lecture hors connexion. Les deux commandes de base utilisent seulement Node.js. L’installation de Cucumber et des générateurs peut être faite à l’avance sur les postes.

Préparer un écran partagé, un éditeur avec une police lisible, des cartes portant les mots Besoin, Règle, Exemple et Question, et une copie du kit par groupe. Annoncer que les schémas web sont fictifs et que le programme manipule seulement une liste en mémoire.

## Déroulé de cinq heures, pauses comprises

| Temps | Activité | Production attendue |
| --- | --- | --- |
| 0:00–0:15 | Poser les besoins, chapitre 1 | Trois questions de lecteurs |
| 0:15–0:40 | Classer puis réécrire, chapitres 2 et 3 | Quatre pages classées et une consigne testable |
| 0:40–1:10 | Essayer le README en binôme, chapitre 4 | Un blocage observé et sa correction |
| 1:10–1:20 | Pause | |
| 1:20–1:50 | Lire et modifier une vue C4, chapitre 5 | Un acteur et ses échanges correctement nommés |
| 1:50–2:20 | Lire le MCD et discuter une règle, chapitre 6 | Une cardinalité justifiée et une contrainte d’unicité |
| 2:20–2:45 | Comparer les options d’un ADR, chapitre 7 | Une conséquence comprise par le groupe |
| 2:45–2:55 | Pause | |
| 2:55–3:30 | Example Mapping, chapitre 9 | Une règle, deux exemples et une question ouverte |
| 3:30–4:10 | Relier Gherkin au programme | Une exécution BDD et une assertion expliquée |
| 4:10–4:35 | Montrer la régression et le site, chapitres 8 et 9 | Un défaut détecté et une page reliée à sa source |
| 4:35–5:00 | Transmission et plan d’application | Une tâche réussie sans aide et deux améliorations à reprendre |

Les chapitres servent aussi de lecture après la séance. L’écriture d’un nouveau comportement complet, l’intégration à une base réelle et la configuration de CI constituent des prolongements. Ne promets pas leur maîtrise complète dans ces cinq heures.

## Manipulation 1 : découvrir une règle avec le groupe

Former des groupes de trois perspectives : métier, développement et recherche des cas limites. Chacun peut prendre un rôle différent de son métier habituel.

Présenter : « Une personne veut réserver un atelier qui possède une capacité limitée. » Ne pas montrer immédiatement le code.

Faire produire pendant dix minutes :

- une règle générale : seules les réservations confirmées occupent une place,
- un exemple accepté : capacité un, Bob a annulé, Alice réserve,
- un exemple refusé : capacité un, Bob est confirmé, Alice réserve,
- une question : Alice peut-elle revenir après avoir annulé ?

Demander qui peut trancher la question et noter la décision proposée. Comparer ensuite avec la règle restrictive du kit. Le groupe peut choisir une autre règle pour son produit. La réussite des tests du kit ne donne pas raison au choix métier.

Pour un public non développeur, conserver les phrases et les exemples dans la page publiée. Accompagner l’édition dans le dépôt si nécessaire. Demander à une personne du support d’expliquer le refus à un utilisateur.

## Manipulation 2 : lire une exécution BDD

Exécuter depuis la racine :

~~~sh
npm run test:bdd
~~~

Attendre quatre scénarios et 23 étapes réussies. Ouvrir le rapport local .build/bdd.html ou son intégration au site. Montrer successivement le scénario, la définition de son action et la fonction reserver.

Faire pointer l’assertion qui garantit que l’historique n’a pas grandi après un refus. Éviter de commenter chaque ligne. La question à poser est : « Si la fonction ajoutait quand même une réservation avant de refuser, le scénario le verrait-il ? » Dans cet exemple, oui, grâce au contrôle de la taille de l’historique.

Expliquer qu’un test réussi prouve seulement ce qui a été exécuté et vérifié dans cet environnement. Aucun accès simultané à PostgreSQL n’est testé ici.

## Manipulation 3 : ajouter un test de comportement

Faire une copie de travail. Ajouter ce test à demo/tests/reservations.test.mjs, qui importe déjà test, assert, reserver et annuler :

~~~javascript
test('annuler deux fois conserve une seule réservation annulée', () => {
  const historique = [];
  const reservation = reserver(historique, {
    personne: 'alice', atelier: 'poterie', capacite: 1
  });
  annuler(reservation);
  annuler(reservation);
  assert.equal(reservation.statut, 'annulee');
  assert.equal(historique.length, 1);
});
~~~

Résultat attendu : sept tests réussis dans cette copie. Aucune modification de la fonction n’est nécessaire. Demander si ce comportement doit aussi apparaître dans les scénarios lus par le métier. Automatiser deux fois le même exemple n’est pas une obligation.

Cette manipulation apprend à vérifier un comportement, pas à pratiquer le cycle échec puis réussite. Pour voir un défaut, utiliser la suivante.

## Manipulation 4 : observer une régression

~~~sh
npm run demo:regression
~~~

Le script prépare une copie temporaire, remplace occupees >= capacite par occupees > capacite puis exécute les tests. Deux tests échouent dans cette copie. Le script confirme ensuite que le défaut a été détecté.

Demander de prévoir les résultats avant l’exécution : la demande suivante après la dernière place est acceptée à tort, et une capacité nulle laisse passer une première réservation. La correction consiste à rétablir la comparaison >= dans l’exemple modifié. Le script ne touche pas au code de travail.

## Manipulation 5 : écrire avant de coder

Présenter la proposition : « Une personne peut réactiver sa réservation annulée si une place est disponible. »

Écrire d’abord un court guide d’usage portant le statut Proposition. Demander ce qui arrive si l’atelier est complet, si la réservation est déjà confirmée et si quelqu’un tente de modifier celle d’une autre personne.

Pour un prolongement technique, ajouter une fonction reactiver dans une copie du kit et écrire les tests avant l’implémentation :

| État initial | Action | Attendu |
| --- | --- | --- |
| Alice annulée, une place libre | Réactiver Alice | Même objet de réservation, statut confirmé, une place occupée |
| Alice annulée, Bob occupe la seule place | Réactiver Alice | Refus Atelier complet, Alice reste annulée |
| Alice déjà confirmée | Réactiver Alice | Comportement à décider explicitement, par exemple aucune modification |

Le kit n’a pas d’utilisateurs authentifiés. Les permissions restent une question pour l’application réelle, à ne pas faire passer pour une propriété testée. Après accord, remplacer l’ADR 001 par un nouvel ADR lié au précédent, mettre à jour la vue des états courants et conserver la vue historique.

## Manipulation 6 : générer et repérer les limites

Exécuter les commandes du README pour la référence JSDoc, le graphe des imports et le site. Montrer le [hook MkDocs](https://github.com/theopaolo/cours-documentation-web/blob/main/scripts/mkdocs_hook.py) et la page [Exemples](/documentation/11-exemples/).

Changer un commentaire dans une copie, reconstruire et constater que la référence change sans modifier le résultat de la fonction. Modifier ensuite le code et constater que les exemples inclus dans le site sont actualisés. La fraîcheur d’une page générée et l’exactitude de son explication sont deux contrôles distincts.

Pour la CI, lire le [workflow fourni](https://github.com/theopaolo/cours-documentation-web/blob/main/scripts/documentation-workflow.yml) de haut en bas. Demander ce qui bloque la construction et ce qui nécessite encore une relecture humaine. L’artefact doit correspondre à l’exécution et au commit examinés.

## Manipulation 7 : retrouver le contexte avec Git

Le kit peut être fourni sans historique. Pour répéter cette manipulation, créer un dossier de démonstration indépendant, y copier seulement le fichier à étudier et l’ADR, puis initialiser un dépôt local. Ne pas initialiser Git dans un dossier contenant d’autres projets.

Créer un premier commit avec l’identité Git habituelle. Modifier ensuite une phrase de l’ADR ou une règle dans cette copie, puis créer un second commit avec un message expliquant le changement.

~~~sh
git log --oneline
git blame -w -- reservations.mjs
git log -p -- reservations.mjs
~~~

Ouvrir une révision avec git show et son identifiant. Une modification de l’ADR seule n’apparaîtra pas dans le blame du fichier JavaScript. C’est une occasion de montrer pourquoi les liens entre documents et code comptent. Aucun dépôt ni commit n’est nécessaire pour les autres manipulations.

## Évaluer la transmission

Donner une tâche au binôme qui n’a pas écrit le document. Observer sans compléter la procédure à l’oral.

| Critère | Signe observable |
| --- | --- |
| La procédure est utilisable | Le binôme lance le programme et reconnaît le résultat |
| La règle est comprise | Il explique le refus après annulation |
| Le dessin répond à une question | Il retrouve les utilisateurs ou le stockage sans confondre les niveaux |
| La décision est traçable | Il retrouve une option écartée et une conséquence |
| L’automatisation est comprise | Il sait nommer ce que le test vérifie et une limite |
| La maintenance est prévue | Il identifie la source à modifier pour le prochain changement |

Si un critère manque, corriger une seule chose puis refaire l’essai. Terminer en choisissant deux changements à appliquer au projet de l’équipe, avec une personne responsable et un moment de revue.

## Prolongements à choisir selon l’équipe

Prévoir quinze minutes pour la [manipulation de documentation dans l’éditeur](/documentation/12-documentation-editeur/). Survoler une fonction importée, lire ses paramètres, provoquer un diagnostic avec une chaîne à la place d’un nombre, puis générer la variante TypeDoc. Faire distinguer trois résultats : information affichée, erreur de type détectée et comportement réellement testé. Le déroulé de cinq heures peut accueillir cette activité à la place d’une autre démonstration, ou après la séance.

Pour TypeScript, remplacer la référence JSDoc par TypeDoc dans un exercice séparé. Pour Python, examiner mkdocstrings. Pour une base relationnelle existante, explorer un schéma extrait avec SchemaSpy et le comparer aux règles métier. Pour une API HTTP, ajouter un contrat OpenAPI et des exemples de requêtes testés.

Si l’équipe emploie des agents IA, leur donner les procédures de vérification et les décisions applicables, puis relire leurs changements comme les autres. Le [retour d’expérience de Samuel Rozé](https://medium.com/@sroze/our-top-code-contributor-is-an-ai-agent-our-learnings-so-far-d3a5e866c53c) fournit une discussion utile sur les boucles de test et la préparation du travail. Il ne remplace pas une mesure de qualité propre à l’équipe.
