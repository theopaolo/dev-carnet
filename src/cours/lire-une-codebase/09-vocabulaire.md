---
title: 'Vocabulaire'
order: 9
---

# Vocabulaire

**Beacon** : Ce sont des parties du programme qui aident à comprendre ce que le code fait. Ils fonctionnent comme des déclencheurs pour confirmer ou infirmer des hypothèses sur le code. Le concept est plus précis que "cherchez les noms explicites".

**Refactoring** : modifier le code pour l'améliorer sans changer son comportement. L'appli doit fonctionner pareil avant et après chaque modification.

**Dette technique** : chaque raccourci pris en codant accumule une dette. Plus elle grossit, plus tout devient lent et cassant. La refacto, c'est rembourser.

**Code smell** : un signal dans le code qui suggère qu'il y a peut-être un problème, quelque chose à regarder de plus près.

**Charge cognitive** : lire du code inconnu est exigeant parce qu'il faut comprendre la syntaxe et l'intention en même temps. C'est normal que ce soit difficile.

## Clean code

_Traduction de :_ [_https://refactoring.guru/refactoring/what-is-refactoring_](https://refactoring.guru/refactoring/what-is-refactoring)

Le principal objectif du refactoring est de lutter contre la dette technique. Il transforme un code brouillon en un code propre et une conception simple.

Bien ! Mais qu'est-ce que du code propre, au juste ? Voici quelques-unes de ses caractéristiques :

**Le code propre est évident pour les autres développeurs.**  
Et je ne parle pas d'algorithmes ultra-sophistiqués. Un mauvais nommage des variables, des classes et méthodes surchargées, des nombres magiques — la liste est longue — tout cela rend le code confus et difficile à appréhender.

**Le code propre ne contient pas de duplication.**  
Chaque fois que vous devez modifier du code dupliqué, vous devez penser à répercuter le même changement partout ailleurs. Cela augmente la charge cognitive et ralentit la progression.

**Le code propre contient un nombre minimal de classes et d'autres éléments mobiles.**  
Moins de code, c'est moins de choses à garder en tête. Moins de code, c'est moins de maintenance. Moins de code, c'est moins de bugs. Le code est un passif : gardez-le court et simple.

**Le code propre passe tous les tests.**  
Vous savez que votre code est sale quand seulement 95 % de vos tests passent. Vous savez que vous êtes mal barré quand votre couverture de tests est de 0 %.

**Le code propre est plus facile et moins coûteux à maintenir !**

## Dette technique

_Traduction de_ [_https://refactoring.guru/refactoring/technical-debt_](https://refactoring.guru/refactoring/technical-debt)

Tout le monde fait de son mieux pour écrire un excellent code dès le départ. Il n'existe probablement aucun développeur qui écrive intentionnellement du code sale au détriment du projet. Mais à quel moment le code propre devient-il sale ?

La métaphore de la « dette technique » appliquée au code sale a été proposée à l'origine par _Ward Cunningham_.

Si vous contractez un prêt bancaire, cela vous permet de faire des achats plus rapidement. Vous payez un supplément pour accélérer le processus - vous ne remboursez pas seulement le capital, mais aussi les intérêts supplémentaires du prêt. Il va sans dire que vous pouvez accumuler tellement d'intérêts que leur montant finit par dépasser vos revenus totaux, rendant le remboursement complet impossible.

La même chose peut arriver avec le code. Vous pouvez temporairement aller plus vite en n'écrivant pas de tests pour de nouvelles fonctionnalités, mais cela ralentira progressivement votre progression chaque jour, jusqu'à ce que vous finissiez par rembourser cette dette en écrivant les tests.

**Causes de la dette technique**

**Pression commerciale**  
Parfois, les circonstances commerciales peuvent vous forcer à déployer des fonctionnalités avant qu'elles ne soient complètement terminées. Dans ce cas, des rustines et des bricolages apparaîtront dans le code pour dissimuler les parties inachevées du projet.

**Manque de compréhension des conséquences de la dette technique**  
Il arrive que votre employeur ne comprenne pas que la dette technique génère des « intérêts », dans la mesure où elle ralentit le rythme de développement à mesure qu'elle s'accumule. Cela peut rendre trop difficile le fait de consacrer du temps d'équipe au refactoring, car la direction n'en voit pas la valeur.

**Incapacité à lutter contre la cohérence stricte des composants**  
C'est le cas lorsque le projet ressemble à un monolithe plutôt qu'au produit de modules individuels. Dans ce cas, toute modification apportée à une partie du projet affectera les autres. Le développement en équipe est rendu plus difficile car il devient compliqué d'isoler le travail de chaque membre.

**Manque de tests**  
L'absence de retour immédiat encourage des solutions de contournement rapides mais risquées, ou des bricolages. Dans les pires cas, ces modifications sont implémentées et déployées directement en production sans aucun test préalable. Les conséquences peuvent être catastrophiques. Par exemple, un correctif d'apparence anodine pourrait envoyer un e-mail de test étrange à des milliers de clients, ou pire encore, vider ou corrompre une base de données entière.

**Manque de documentation**  
Cela ralentit l'intégration des nouvelles personnes sur le projet et peut stopper net le développement si des personnes clés quittent le projet.

**Manque d'interaction entre les membres de l'équipe**  
Si la base de connaissances n'est pas répartie dans toute l'entreprise, les gens finiront par travailler avec une compréhension obsolète des processus et des informations sur le projet. Cette situation peut être aggravée lorsque les développeurs juniors sont mal formés par leurs mentors.

**Développement simultané prolongé sur plusieurs branches**  
Cela peut entraîner une accumulation de dette technique, qui augmente encore lors de la fusion des changements. Plus les modifications sont faites de manière isolée, plus la dette technique totale est importante.

**Refactoring retardé**  
Les exigences du projet évoluent constamment, et à un moment donné, il peut devenir évident que certaines parties du code sont obsolètes, devenues lourdes, et doivent être repensées pour répondre aux nouvelles exigences.

D'un autre côté, les développeurs du projet écrivent chaque jour du nouveau code qui interagit avec ces parties obsolètes. Par conséquent, plus le refactoring est retardé, plus il y aura de code dépendant à retravailler par la suite.

**Manque de contrôle de conformité**  
Cela se produit lorsque chaque personne travaillant sur le projet écrit le code comme bon lui semble (c'est-à-dire de la même manière qu'elle l'a fait sur le projet précédent).

**Incompétence**  
C'est le cas lorsque le développeur ne sait tout simplement pas comment écrire du code correct.
