---
title: Formuler une tâche
order: 11
publishedAt: "2026-09-23"
updatedAt: "2026-09-23"
---

# Formuler une tâche

Un agent fonctionne mieux quand il connaît le résultat attendu et la preuve qui le valide. « Améliore cette application » l’oblige à deviner. Il devinera avec assurance, et vous lirez « Done! » à propos de quelque chose que vous n’aviez pas demandé.

## Les quatre éléments

Une demande utile contient :

- l’**objectif** : le comportement à obtenir
- le **contexte** : les points d’entrée, les erreurs, les exemples utiles
- les **contraintes** : la portée, les conventions, ce qu’il ne faut pas toucher
- le **critère de fin** : la preuve observable que la tâche est terminée.

Avant :

```text
Améliore mon code.
```

Après :

```text
Dans src/price.js, corrige formatPrice pour conserver le signe
des montants négatifs : formatPrice(-5) doit renvoyer "-5,00 €".
Ne modifie que cette fonction.
Lance npm test, puis montre le diff et la sortie des tests.
```

Un autre exemple, sur une interface :

```text
Sur la page /login, empêche l’envoi du formulaire si l’adresse e-mail
est invalide. Réutilise le système de validation déjà présent dans
src/forms/. La tâche est terminée quand :
- le message d’erreur apparaît sous le champ
- le formulaire n’est pas envoyé
- les tests existants passent
- un nouveau test couvre ce comportement.
```

## Définir la fin avant de commencer

Pour une tâche simple, deux phrases suffisent. Pour une fonctionnalité, écrivez les critères d’acceptation avant de lancer l’agent. Quand le résultat ne correspond pas à l’attente, la cause est souvent que personne n’avait défini ce que « terminé » voulait dire.

Des critères observables :

- un test précis passe
- une erreur ne se reproduit plus avec telle commande
- un comportement apparaît dans l’interface
- la compilation réussit sans nouveau warning
- le diff ne touche que les fichiers annoncés.

## Donner des points d’entrée, pas le dépôt

Le modèle n’a pas besoin de tout le projet au départ. Donnez l’objectif, quelques fichiers, l’erreur connue, et laissez-le explorer :

```text
Avant de modifier quoi que ce soit, examine les appelants de formatPrice
et les conventions de formatage déjà présentes dans le dépôt.
```

Collez l’erreur complète plutôt qu’un résumé. Pour une interface, joignez une capture. Citez le fichier et la ligne quand vous les connaissez. Le harness sait chercher : n’en faites pas une archive ZIP textuelle.

## Séparer recherche, plan et implémentation

Pour un problème complexe, découpez :

1. comprendre le problème, sans modifier de fichier
2. proposer une approche et la valider
3. implémenter.

La plupart des harnesses ont un mode plan qui interdit l’écriture pendant l’exploration. Sinon, demandez-le :

```text
Sans modifier les fichiers, explique comment tu ajouterais un outil
list_files(path). Cite les fichiers concernés et les vérifications à faire.
```

Relisez le plan avant de dire « vas-y ». Corriger un plan coûte moins que corriger un diff de 400 lignes. Pour trois lignes de CSS, sautez cette étape.

Vous pouvez aussi demander à l’agent de vous interroger avant de commencer : « Pose-moi les questions nécessaires pour lever les ambiguïtés, une à la fois. » C’est utile quand vous avez une idée floue de ce que vous voulez.

## Garder une portée limitée

Une tâche bornée est plus facile à exécuter, à tester, à relire et à annuler. « Corrige le comportement du formulaire de connexion » vaut mieux que « refactorise tout le frontend ». Découpez une tâche énorme, sans découper artificiellement ce que l’agent peut comprendre en une fois.

## Travailler dans Git

L’agent doit pouvoir modifier librement sans détruire votre travail. Travaillez sur une branche ou dans un worktree, et commitez avant de lancer une tâche. Chaque modification reste ainsi inspectable avec `git diff` et réversible avec `git restore`.

## Vérifier dans l’environnement réel

« L’implémentation devrait maintenant fonctionner » n’est pas une preuve. Les signaux utiles sont un build réussi, des types et un lint sans erreur, des tests verts, l’application lancée et l’interface regardée. Un agent capable de lancer les tests doit les lancer. Demandez-lui aussi ce qu’il n’a pas pu vérifier :

```text
Termine par la liste des vérifications que tu n’as pas pu faire.
```

## L’agent n’est pas la CI

L’agent écrit du code, des tests, lance les tests et commente une pull request. Les vérifications déterministes restent déterministes. L’agent ouvre une pull request, la CI lance le build, la vérification des types, le lint, les tests et l’analyse de sécurité, puis une personne relit avant la fusion.

Ne remplacez pas `npm test` par « demande au modèle s’il pense que les tests passeraient ».

## Juger le résultat, pas le discours

Les modèles écrivent des phrases convaincantes. « J’ai soigneusement vérifié l’implémentation » ne dit rien du code. Évaluez le diff, le comportement, les tests, le rendu et les logs. Le test vert ne remplace pas la lecture du diff, et la réponse finale de l’agent ne remplace ni l’un ni l’autre.

## Quand ça part dans la mauvaise direction

- Interrompez tôt. Une mauvaise piste coûte plus cher à chaque tour.
- Après deux corrections qui n’aboutissent pas, repartez d’une session propre. Réécrivez le prompt avec ce que vous avez appris. L’historique des échecs pollue le contexte.
- Si l’agent répète la même erreur, cherchez ce qui lui manque : une information, un outil, une règle dans `AGENTS.md`.
- Si une consigne revient dans chaque prompt, elle a sa place dans `AGENTS.md`. Si une procédure revient, elle a sa place dans un skill.

## Exercice

Réécrivez « Améliore mon code » pour votre projet avec les quatre éléments. Faites relire la demande à une autre personne : peut-elle dire, sans vous poser de question, quand la tâche sera terminée ?

## Sources

- [OpenAI, guide de prompting pour Codex](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)
- [Anthropic, « Claude Code best practices »](https://www.anthropic.com/engineering/claude-code-best-practices)
