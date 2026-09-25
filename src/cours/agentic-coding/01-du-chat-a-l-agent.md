---
title: Du chat à l’agent
order: 1
publishedAt: "2026-09-23"
updatedAt: "2026-09-23"
---

# Du chat à l’agent

Quand un chat vous propose du code, vous le copiez, l’ouvrez dans l’éditeur, le lancez, lisez l’erreur et redemandez. La boucle existe déjà. Elle passe par vos mains. Un agent de code automatise une partie de cette boucle, et ce cours montre laquelle.

## Ce qu’est un LLM

Un **Large Language Model** est un modèle entraîné à prédire le token suivant. Un token est un mot, un morceau de mot, un signe de ponctuation ou un fragment de code. À partir du contexte `Le ciel est`, le modèle calcule une distribution de probabilités :

```text
bleu        0.63
gris        0.14
couvert     0.07
magnifique  0.03
```

Il choisit un token, l’ajoute au contexte, puis recommence. Les modèles actuels sont bien plus complexes que cette description, mais elle suffit à en tirer les conséquences utiles pour un agent :

- le modèle produit une réponse probable, pas le résultat d’un programme déterministe
- il ne garde rien entre deux appels, sauf si le programme lui renvoie l’historique
- il ne lit pas vos fichiers, n’exécute pas de code et n’appelle pas d’API de lui-même
- il ne peut pas vérifier une affirmation dans le monde réel sans outil ni source.

Andrej Karpathy compare le LLM à un processeur et la fenêtre de contexte à sa mémoire de travail. L’analogie aide à séparer le calcul du modèle des informations dont il dispose. Sa limite : la fenêtre est reconstruite et renvoyée en entier à chaque appel.

## Les capacités qui rendent un agent possible

Deux capacités, apprises à l’entraînement, permettent de brancher un modèle sur un programme.

La **sortie structurée** produit un JSON conforme à un schéma, qu’un programme lit sans interpréter du texte libre :

```json
{ "city": "Lyon", "temperature": 21 }
```

Le **tool calling** produit une demande d’action :

```json
{
  "id": "call_1",
  "name": "read_file",
  "arguments": { "path": "README.md" }
}
```

À cet instant, le fichier n’est pas lu. Le modèle a écrit une demande. Un programme doit la recevoir, décider si elle est permise, lire le fichier et renvoyer le contenu au modèle. Ce programme est le harness.

## Le vibe coding

Karpathy a popularisé l’expression *vibe coding* en 2025. Vous décrivez une intention, l’IA génère du code, vous testez et réorientez sans forcément lire chaque ligne. Il la présentait comme une pratique pour ses projets personnels du week-end.

Le vibe coding convient aux prototypes, aux exercices et au code répétitif. Il devient difficile à tenir quand le projet a plusieurs services, des contraintes de sécurité ou des règles d’architecture, pour des raisons précises :

- le contexte change d’une session à l’autre
- une erreur reste invisible si aucun test ne la détecte
- les décisions d’architecture ne sont écrites nulle part
- le modèle peut inventer une dépendance ou une API
- la vérification reste entièrement à votre charge.

## L’agentic coding

L’agentic coding confie un objectif à un système qui choisit et exécute plusieurs actions dans une boucle. Son autonomie reste bornée par les outils, les permissions, les budgets et les règles définies dans le harness.

Une tâche d’agent ressemble à ceci :

1. ouvrir le dépôt et lire son arborescence
2. lire les fichiers concernés
3. lancer les tests
4. identifier la cause d’un échec
5. modifier le code
6. relancer les tests
7. montrer le diff.

| | Vibe coding | Agentic coding |
| --- | --- | --- |
| Prochaine étape | Choisie par vous à chaque échange | Choisie dans la boucle par le modèle et le harness |
| Votre rôle | Guider et valider chaque itération | Définir l’objectif, les limites et les preuves attendues |
| Durée | Quelques échanges | Une suite d’actions qui peut durer des heures |
| Outils | Utilisés par vous | Disponibles dans la boucle selon une politique d’accès |
| État | La conversation en cours | Géré par le harness, parfois conservé entre sessions |

La vérification ne disparaît pas avec l’agent. Elle change de forme : vous relisez un diff, des tests et des logs au lieu de relire chaque réponse.

## Choisir un modèle selon la tâche

La taille du modèle, sa latence, son coût, sa fenêtre de contexte et sa fiabilité en tool calling changent le comportement du harness. Le modèle le plus capable n’est pas le meilleur choix pour chaque étape.

| Tâche | Type de modèle | Critère |
| --- | --- | --- |
| Autocomplétion dans l’IDE | Petit modèle de code, souvent local | Latence de quelques centaines de millisecondes |
| Modification courante | Modèle intermédiaire | Compromis entre capacité, latence et coût |
| Tâche longue sur plusieurs fichiers | Grand modèle | Fiabilité sur de longues séquences d’outils |
| Classement, routage | Petit modèle ou classifieur | Coût par appel |
| Image, capture d’écran | Modèle multimodal | Entrée image |

Les noms et les prix changent tous les trimestres. Vérifiez-les avant chaque session. Le 20 mai 2026, un banc d’essai interne sur le protocole du cours donnait 100 % d’appels d’outils valides pour `qwen/qwen3-coder-next`, `moonshotai/kimi-k2.6` et `deepseek/deepseek-v4-pro`, et 0 % pour `qwen/qwen-2.5-7b-instruct`. Deux modèles qui annoncent le tool calling ne se valent donc pas dans un harness.

## Travailler en local

[Ollama](https://ollama.com/) exécute des modèles sur votre machine. [Continue](https://docs.continue.dev/) et [Kilo Code](https://kilo.ai/) connectent VS Code à ces modèles. Avec Kilo Code, ajoutez un fournisseur personnalisé qui pointe vers `http://localhost:11434/v1/`. Un modèle comme `qwen2.5-coder:1.5b` suffit pour l’autocomplétion. Le site [Can I Run AI](https://www.canirun.ai/) indique ce que votre machine supporte.

## Sources

- Andrej Karpathy, [message d’origine sur le vibe coding](https://x.com/karpathy/status/1886192184808149383), février 2025
- [OpenAI, guide du function calling](https://developers.openai.com/api/docs/guides/function-calling)
