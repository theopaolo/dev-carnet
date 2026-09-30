## User stories et critères d'acceptation

Une user story découpe un scénario en unités de valeur livrables. Format canonique :

> **En tant que** \[persona\], **je veux** \[action\] **afin de** \[bénéfice\].

Une bonne story respecte les critères `INVEST` :

![Les critères INVEST : indépendante, négociable, valorisable, estimable, petite et testable.](/ressources/stories-backlog/files/019ebbbe-9594-73d0-abc5-9b52930f4bf8/33.jpg)

| Critère | Signification | Question test |
| --- | --- | --- |
| **I**ndépendante | Livrable sans attendre une autre story | "Je peux la coder seule ?" |
| **N**égociable | Le _comment_ reste ouvert | "Est-ce que je décris une solution ou un besoin ?" |
| **V**alorisable | Apporte quelque chose à l'utilisateur | "Qui s'en rend compte ?" |
| **E**stimable | On peut évaluer l'effort | "Je sais à peu près combien de temps ?" |
| **S**mall | Quelques jours max | "Livrable cette semaine ?" |
| **T**estable | On peut prouver qu'elle est finie | "Comment je démontre que c'est fait ?" |

Le critère Testable élimine le plus de mauvaises stories. Une story dont personne ne peut démontrer la fin reste "presque finie" pendant des semaines.

D'où les critères d'acceptation, au format [**Gherkin**](https://cucumber.io/docs/gherkin/reference) :

> **Étant donné** \[contexte\], **quand** \[action\], **alors** \[résultat observable\].

Exemple complet :

> **Story** : En tant qu'Inès (étudiante sans voiture), je veux voir les trajets partant de mon campus dans la prochaine heure, afin de rentrer chez moi sans attendre le bus.
> 
> **Critères d'acceptation :**
> 
> - Étant donné que je suis géolocalisée sur le campus, quand j'ouvre l'appli, alors je vois la liste des trajets partant dans les 60 prochaines minutes, triés par heure de départ.
> - Étant donné qu'aucun trajet n'est disponible, quand j'ouvre l'appli, alors je vois un message m'invitant à créer une alerte (et non un écran vide).

Le cas **vide** est un critère d'acceptation à part entière. Les stories bâclées se repèrent aux états vides, aux erreurs et aux limites.

![Exemple de critères d’acceptation pour une story sur la consultation de journaux d’erreurs.](/ressources/stories-backlog/files/019ebbbf-b271-76cc-8eb8-58b1bf889cdb/36.png)

Trois contre-exemples :

La story technique déguisée _\[en tant que développeur, je veux migrer la base de données\]_ : le développeur n'est pas votre utilisateur. Une tâche technique se rattache à une story qui livre de la valeur.

La story-épopée _\[en tant qu'utilisateur, je veux gérer mon compte\]_ : **gérer** cache six stories (créer, modifier l'email, supprimer, réinitialiser le mot de passe…). Découpez-la.

La story-solution _\[je veux un bouton rouge en haut à droite\]_ : elle donne le comment avant le pourquoi. Remontez au besoin.
