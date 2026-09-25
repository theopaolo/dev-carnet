---
title: Anatomie d’un harness
order: 4
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Anatomie d’un harness

La boucle du chapitre précédent tient en trente lignes. Un harness utilisable en demande beaucoup plus. Ce chapitre découpe le travail en huit responsabilités. Chacune répond à une panne observable : une boucle infinie, un outil mal choisi, un secret qui fuit, une tâche déclarée finie sans preuve.

## 1. Orchestration et arrêt

L’orchestrateur appelle le modèle et les outils, puis transmet leurs résultats à l’étape suivante. Il gère les erreurs, les nouvelles tentatives, les délais et les budgets. Les conditions d’arrêt du [chapitre 3](../03-boucle-agentique/) en font partie.

Une nouvelle tentative automatique demande de la prudence. Relancer une lecture est sans risque. Relancer une écriture après un délai dépassé peut l’exécuter deux fois, car la première a pu réussir alors que la réponse s’est perdue.

## 2. Construction du contexte

Le harness choisit ce que le modèle voit à chaque appel : instructions système, règles du projet, demande de l’utilisateur, extraits de fichiers, résultats récents, plan en cours, souvenirs relus depuis un stockage externe. La fenêtre est limitée, donc le harness sélectionne, résume ou compacte. Le [chapitre 5](../05-context-engineering/) y est consacré.

## 3. Interface des outils

Un outil expose au modèle un nom, une description, un schéma d’arguments et un format de résultat. Voici la définition de `read_file` dans le mini-harness, au format envoyé à OpenRouter :

```json
{
  "type": "function",
  "function": {
    "name": "read_file",
    "description": "Lit un fichier texte situé sous le répertoire courant de la harness. Refuse les chemins qui sortent du cwd et les fichiers cachés (commençant par '.').",
    "parameters": {
      "type": "object",
      "properties": {
        "path": {
          "type": "string",
          "description": "Chemin relatif au cwd de la harness. Exemples: 'README.md', 'src/app/harness.ts', 'notes/rapport.md'."
        }
      },
      "required": ["path"],
      "additionalProperties": false
    }
  }
}
```

La description fait partie de l’interface entre l’agent et la machine. Un nom vague, des arguments ambigus ou un résultat de 5 000 lignes augmentent les erreurs de sélection. Un bon outil est simple, décrit précisément, observable, limité, et renvoie un message d’erreur qui aide à corriger l’appel.

Le schéma décrit l’appel attendu. Il ne le valide pas. `additionalProperties: false` indique au modèle de ne pas ajouter d’argument, mais c’est `executeTool` qui vérifie réellement les valeurs reçues. Ni l’un ni l’autre ne constitue une permission.

## 4. Vérification

Après une action, l’agent a besoin d’une observation exploitable. `commande terminée` apporte peu. La sortie des tests, une erreur du compilateur, une capture d’écran ou une réponse d’API structurée permettent au modèle de comparer le résultat à l’objectif.

- tests unitaires et de bout en bout
- analyse statique, formatage, vérification des types
- validation d’un schéma JSON
- comparaison visuelle d’une interface
- lecture d’un diff
- contrôle métier écrit en code déterministe.

[OpenAI décrit ce principe](https://openai.com/index/harness-engineering/) dans son retour d’expérience sur Codex : l’agent lance lui-même les tests, les linters et les outils d’inspection, et les contraintes d’architecture sont vérifiées par du code.

## 5. État, mémoire et sessions

L’état représente l’avancement : messages, actions exécutées, résultats, plan, budget restant. La mémoire conserve ce qui doit servir plus tard. Pour reprendre une tâche, le harness enregistre un point de contrôle. Le [chapitre 6](../06-memoire/) détaille ces mécanismes.

## 6. Isolation, permissions et secrets

Les outils donnent à l’agent un effet sur le monde. Le harness limite cet effet :

- exécution isolée dans un conteneur, une machine virtuelle ou WASM
- permissions accordées au plus juste
- liste explicite des hôtes réseau accessibles
- confirmation humaine avant une action destructive, coûteuse ou externe
- secrets gardés hors de la fenêtre de contexte.

Le modèle peut demander une action. Une politique extérieure au modèle décide si elle est autorisée. Le [chapitre 10](../10-securite/) en fait le tour.

## 7. Observabilité

Les traces doivent permettre de reconstruire ce que le système a fait : appels au modèle et versions, outils appelés avec leurs arguments et résultats, erreurs, consommation de tokens, latence, validations humaines, identifiant de session.

La suite objectif, fichiers lus, commandes, modifications, tests forme une **trajectoire** :

```text
objectif
 → list_files(".")
 → read_file("src/price.js")
 → edit_file("src/price.js")
 → npm test : 1 échec
 → edit_file("src/price.js")
 → npm test : 12 tests passent
 → réponse finale
```

Relire une trajectoire montre pourquoi un agent échoue : une information arrivée trop tard, un outil manquant, une règle inutile, une action répétée, une tâche déclarée terminée sans test.

[OpenTelemetry](https://opentelemetry.io/) sert de format commun pour les traces et les métriques. Il ne remplace pas les événements métier nécessaires pour comprendre une décision.

## 8. Évaluations

Les tests vérifient le code du harness. Les évaluations vérifient le comportement du système sur un ensemble de tâches représentatives. Une évaluation utile précise :

- la tâche et l’état initial du dépôt
- les outils et permissions disponibles
- le critère de réussite, vérifiable par du code
- le nombre maximal d’étapes
- le coût, la latence et les erreurs observés
- la version du modèle, du prompt et du harness.

Gardez chaque échec comme test de régression. Vous saurez ainsi distinguer une amélioration du modèle d’une amélioration du harness.

## Prompt, contexte et harness

Ces trois niveaux se complètent. Ils ne forment pas une chronologie où l’un remplacerait l’autre.

| Niveau | Question | Exemple |
| --- | --- | --- |
| Prompt engineering | Comment formuler l’instruction de cet appel ? | Rôle, tâche et format de réponse |
| Context engineering | Quelles informations le modèle doit-il voir maintenant ? | Fichiers, résultats d’outils et souvenirs utiles |
| Harness engineering | Comment le système exécute-t-il la tâche de façon contrôlée ? | Boucle, outils limités, état, mesures |

## Commencer petit

La tentation est de dessiner un routeur, un planificateur, un critique, un superviseur et un agent qui supervise les agents avant d’avoir lancé une seule tâche. Commencez plutôt par un modèle, quelques outils et une boucle. Puis ajoutez une couche en réponse à une panne observée :

| Problème observé | Réponse |
| --- | --- |
| Le modèle oublie des informations | Travailler le contexte |
| Il lui manque une capacité | Ajouter un outil |
| Une procédure revient souvent | Écrire un skill |
| Le contexte devient trop gros | Compaction ou sous-agent |
| Une opération est dangereuse | Permission ou isolation |
| Les sessions deviennent longues | Mémoire externe |

Les modèles progressent plus vite que l’orchestration. En 2024, un agent pouvait avoir besoin d’une machine à états détaillée. Les modèles de 2026 planifient seuls une bonne partie du travail. Évitez de coder dans le harness une intelligence que le modèle fournit déjà. Le harness fournit les outils, le contexte, le retour d’information, les permissions et le critère de réussite. Le modèle choisit les actions.

## Sources

- [OpenAI, « Harness engineering: leveraging Codex in an agent-first world »](https://openai.com/index/harness-engineering/)
- [Anthropic, « Building effective agents »](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic, « Writing effective tools for agents »](https://www.anthropic.com/engineering/writing-tools-for-agents)
