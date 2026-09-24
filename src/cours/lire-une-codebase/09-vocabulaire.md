---
title: 'Vocabulaire'
order: 9
---

# Vocabulaire

**Beacon** (balise) : un élément du programme, souvent un nom, qui aide à comprendre ce que fait le code. Il sert à confirmer ou infirmer une hypothèse sur le code. La notion est plus précise que « cherche les noms explicites ».

**Refactoring** : modifier le code pour l'améliorer sans changer son comportement. L'appli doit fonctionner pareil avant et après chaque modification.

**Dette technique** : chaque raccourci pris en codant accumule une dette. Plus elle grossit, plus chaque modification devient lente et risquée. Refactoriser rembourse une partie de cette dette.

**Code smell** : un signal dans le code qui suggère un problème possible, à regarder de plus près.

**Charge cognitive** : lire du code inconnu est exigeant parce qu'il faut comprendre la syntaxe et l'intention en même temps. C'est normal que ce soit difficile.

## Clean code

_Traduit et adapté de [Refactoring.Guru](https://refactoring.guru/refactoring/what-is-refactoring)._

Le principal objectif du refactoring est de lutter contre la dette technique. Il transforme un code brouillon en un code propre et une conception simple.

Quelques caractéristiques du code propre :

**Le code propre est évident pour les autres développeurs.**  
Le problème vient rarement d'algorithmes sophistiqués. Des variables mal nommées, des classes et méthodes surchargées, des nombres magiques rendent le code confus et difficile à suivre.

**Le code propre ne contient pas de duplication.**  
Chaque fois que tu modifies du code dupliqué, tu dois répercuter le même changement partout ailleurs. Cela augmente la charge cognitive et ralentit la progression.

**Le code propre contient un nombre minimal de classes et d'autres éléments mobiles.**  
Moins de code veut dire moins de choses à garder en tête, moins de maintenance et moins de bugs. Le code est un passif : garde-le court et simple.

**Le code propre passe tous les tests.**  
Si seulement 95 % de tes tests passent, ton code a un problème. Si ta couverture de tests est de 0 %, tu ne sais même pas lequel.

**Le code propre coûte moins cher à maintenir.**

## Dette technique

_Traduit et adapté de [Refactoring.Guru](https://refactoring.guru/refactoring/technical-debt)._

Presque personne n'écrit du code sale exprès. Le code propre se dégrade pourtant, pour des raisons listées plus bas.

La métaphore de la « dette technique » appliquée au code sale a été proposée à l'origine par _Ward Cunningham_.

Un prêt bancaire permet d'acheter plus tôt. En échange, tu rembourses le capital et des intérêts. Les intérêts peuvent s'accumuler au point de dépasser tes revenus et rendre le remboursement impossible.

Le code fonctionne pareil. Tu peux aller plus vite un temps en n'écrivant pas de tests pour de nouvelles fonctionnalités. Chaque jour, cette absence te ralentit un peu plus, jusqu'à ce que tu rembourses la dette en écrivant les tests.

**Causes de la dette technique**

**Pression commerciale**  
Le contexte commercial force parfois à déployer des fonctionnalités inachevées. Des rustines apparaissent alors dans le code pour masquer les parties manquantes.

**Manque de compréhension des conséquences de la dette technique**  
La direction ne voit pas toujours que la dette technique produit des « intérêts » : elle ralentit le développement à mesure qu'elle s'accumule. Obtenir du temps pour refactoriser devient alors difficile.

**Couplage fort entre les composants**  
Le projet forme un bloc au lieu d'être découpé en modules. Toute modification d'une partie touche les autres. Le travail en équipe devient difficile, car on ne peut plus isoler le travail de chaque personne.

**Manque de tests**  
Sans retour immédiat, on bricole des contournements rapides et risqués. Au pire, ces modifications partent en production sans aucun test. Un correctif anodin peut alors envoyer un e-mail de test à des milliers de clients, ou vider une base de données.

**Manque de documentation**  
L'arrivée de nouvelles personnes prend plus de temps, et le développement peut s'arrêter si des personnes clés partent.

**Manque d'interaction entre les membres de l'équipe**  
Si la connaissance ne circule pas, chacun travaille avec une vision dépassée du projet. Le problème s'aggrave quand les développeurs juniors sont mal accompagnés.

**Développement simultané prolongé sur plusieurs branches**  
La dette s'accumule sur chaque branche et grossit encore au moment de la fusion. Plus les modifications restent isolées longtemps, plus la dette totale est lourde.

**Refactoring retardé**  
Les exigences évoluent. Certaines parties du code deviennent obsolètes et doivent être repensées.

Pendant ce temps, l'équipe écrit chaque jour du code qui dépend de ces parties. Plus le refactoring attend, plus il y a de code à reprendre ensuite.

**Manque de contrôle de conformité**  
Chaque personne écrit le code à sa façon, souvent comme sur son projet précédent.

**Incompétence**  
Le développeur ne sait pas encore écrire ce code correctement.
