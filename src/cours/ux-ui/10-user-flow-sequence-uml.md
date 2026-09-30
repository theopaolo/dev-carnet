---
title: 'User flow, séquence et UML'
order: 10
publishedAt: "2026-09-27"
updatedAt: "2026-09-30"
---

# User flow, séquence et UML

Le journey raconte ce que vit une personne. Pour concevoir puis coder, il faut aussi décrire ce qui se passe dans le produit : les écrans, les choix, les échanges avec le serveur. Designers et développeurs utilisent ces schémas pour se mettre d'accord avant de coder.

## Quel schéma pour quelle question

| Schéma | La question | Un exemple |
| --- | --- | --- |
| Journey map | Que vit la personne, avant, pendant et après ? | Inès, de l'affiche au comptoir |
| Sitemap | Quelles pages, et rangées comment ? | Les pages de l'appli du snack |
| User flow | Par quels écrans et quels choix passe-t-on pour atteindre un but ? | Commander un menu |
| Diagramme de séquence | Qui envoie quoi à qui, et dans quel ordre ? | Inès, l'appli et le serveur pendant une commande |
| Diagramme d'états | Par quels états passe un objet ? | Une commande : reçue, en préparation, prête |

## Le user flow

Un user flow représente les actions et les écrans nécessaires pour accomplir une tâche dans le produit. Il montre aussi les choix, les erreurs et les réponses de l'interface. Les pensées et les émotions figurent dans la journey map.

Nielsen Norman Group compare le journey et le user flow :

| | Journey | User flow |
| --- | --- | --- |
| Le but | Un but large : manger à midi | Une tâche précise : commander un menu |
| Où | Sur plusieurs canaux : affiche, appli, comptoir | Dans un seul produit : l'appli |
| Le moment | Avant, pendant et après l'usage du produit | Pendant l'usage du produit |
| Ce qu'on note | Les actions, les pensées, les émotions | Les actions de l'utilisateur, les réponses du produit |
| Le schéma | Une journey map | Un flowchart ou un wireflow |
| D'où viennent les infos | Des entretiens et de l'observation | Du brief, des besoins recueillis et des tests |

Un user flow détaille une étape du parcours utilisateur. Celui-ci détaille l'étape "Commander" du [journey d'Inès](/ux-ui/07-journey/#un-exemple).

Les rectangles sont des écrans. Les losanges sont des questions qui ont plusieurs réponses. Les flèches portent l'action de l'utilisateur.

```mermaid
flowchart TD
    accTitle: Le user flow d'une commande au snack
    accDescr: Inès ouvre le menu, ajoute un plat au panier, se connecte si besoin, puis paie. Si le paiement est accepté, elle voit la confirmation. Sinon, elle revient au paiement.
    A([Ouvre l'appli]) --> B[Menu]
    B -->|Choisit un plat| C[Fiche du plat]
    C -->|Ajoute au panier| D[Panier]
    D --> E{Connectée ?}
    E -->|Non| F[Connexion]
    F --> G[Paiement]
    E -->|Oui| G
    G --> H{Paiement accepté ?}
    H -->|Oui| I[Confirmation avec un numéro]
    H -->|Non| J[Message d'erreur]
    J -->|Réessaie| G
```

Chaque branche du flow doit apparaître dans les wireframes. Ici, il faut prévoir la connexion et le message d'erreur, en plus du parcours sans problème (*happy path*).

Nielsen Norman Group dessine aussi le user flow en _wireflow_ : les wireframes des écrans, posés en ligne et reliés par des flèches. Chaque flèche part de l'élément sur lequel l'utilisateur clique ou appuie. Dans Figma, reliez vos wireframes avec l'outil flèche (Maj + L).

## Le diagramme de séquence

Un diagramme de séquence montre les échanges entre plusieurs acteurs, dans l'ordre du temps. Le temps s'écoule de haut en bas.

- Chaque acteur a une ligne verticale, sa ligne de vie. Un acteur peut être une personne ou un système : l'appli, le serveur, la base de données.
- Chaque flèche est un message. Une flèche pleine envoie une demande. Une flèche en pointillés porte la réponse.
- Un bloc `alt` montre deux cas possibles, un seul se produit. Un bloc `loop` montre une action répétée. Un bloc `opt` montre une étape facultative.

```mermaid
%%{init: {"sequence": {"actorMargin": 24, "width": 110}}}%%
sequenceDiagram
    accTitle: Une commande au snack, vue par le système
    accDescr: Inès paie dans l'appli. L'appli envoie la commande au serveur. Si le paiement est accepté, le serveur enregistre la commande et l'appli affiche la confirmation. Sinon, l'appli affiche une erreur.
    actor I as Inès
    participant A as Appli
    participant S as Serveur
    I->>A: Appuie sur "Payer"
    A->>S: Envoie la commande
    alt Paiement accepté
        S->>S: Enregistre la commande
        S-->>A: Numéro de commande
        A-->>I: Écran de confirmation
    else Paiement refusé
        S-->>A: Erreur
        A-->>I: Message d'erreur
    end
```

Un développeur y lit ce qu'il doit coder : la demande envoyée au serveur, les deux réponses possibles, et l'erreur à afficher.

Ce schéma est écrit en texte, avec [Mermaid](https://mermaid.js.org/syntax/sequenceDiagram.html). Voici le début du texte qui le produit :

```text
sequenceDiagram
    actor I as Inès
    participant A as Appli
    I->>A: Appuie sur "Payer"
```

GitHub affiche les schémas Mermaid dans un README ou une issue. Vous pouvez donc garder vos schémas à côté de votre code.

## UML

UML, pour _Unified Modeling Language_, est un langage standard de schémas pour décrire un logiciel. Il compte 14 types de diagrammes, rangés en deux familles.

- Les diagrammes de structure montrent de quoi le système est fait : ses classes, ses composants, ses serveurs.
- Les diagrammes de comportement montrent ce que fait le système, et comment il change dans le temps.

Quatre diagrammes de comportement servent souvent en UX :

| Diagramme | Ce qu'il montre |
| --- | --- |
| Cas d'utilisation | Qui peut faire quoi avec le système. Chaque acteur est relié à ses actions. |
| Activité | Les étapes d'un processus et ses choix. Il ressemble beaucoup au user flow. |
| Séquence | Les échanges entre acteurs, dans l'ordre du temps. |
| États | Les états d'un objet, et ce qui le fait passer d'un état à l'autre. |

Voici les états d'une commande au snack :

```mermaid
stateDiagram-v2
    accTitle: Les états d'une commande au snack
    accDescr: Une commande est reçue, puis en préparation, puis prête, puis récupérée. Une commande reçue peut encore être annulée.
    state "Reçue" as Recue
    state "En préparation" as Prep
    state "Prête" as Prete
    state "Récupérée" as Recuperee
    state "Annulée" as Annulee
    [*] --> Recue
    Recue --> Prep : la cuisine commence
    Recue --> Annulee : Inès annule
    Prep --> Prete : le plat est emballé
    Prete --> Recuperee : Inès montre son numéro
    Recuperee --> [*]
    Annulee --> [*]
```

Certains états donnent lieu à un message, comme "Ta commande est prête". Le système garde aussi une trace de l'état de la commande.

## Atelier : le schéma d'enchaînement

Le titre DWWM demande un schéma d'enchaînement des maquettes. C'est le user flow de votre réservation : ses étapes et ses choix possibles. Il fait partie du rendu individuel, avec la maquette. Le sitemap décrit, lui, l'organisation des pages du site.

Dans Figma, reliez des copies réduites de vos écrans ou des rectangles nommés. Indiquez l'action sur chaque flèche. Montrez au moins :

- Le choix d'un atelier, puis d'une séance disponible.
- Le formulaire, la correction d'une saisie et la confirmation.
- Une séance complète, puis l'inscription sur liste d'attente avec un résultat distinct.

Le message d'autorisation parentale apparaît dans le parcours d'une personne mineure. Il ne bloque pas sa réservation. Nommez les écrans et les états comme dans votre maquette.

Placez le schéma dans "8. UI et maquette", à côté du prototype. Vous pouvez aussi le dessiner sur papier et le photographier, ou utiliser draw.io. Vérifiez le schéma, puis les connexions de l'onglet Prototype : les flèches dessinées ne rendent pas les écrans cliquables.

Les diagrammes de séquence et d'états sont facultatifs. Ils peuvent vous aider à préparer le code.

## À lire

- [User Journeys vs. User Flows](https://www.nngroup.com/articles/user-journeys-vs-user-flows/), Nielsen Norman Group : les définitions, le tableau comparatif et l'exemple d'un patient qui cherche un médecin. En anglais.
- [Wireflows](https://www.nngroup.com/articles/wireflows/), Nielsen Norman Group : dessiner un user flow avec des wireframes. En anglais.
- [What is a sequence diagram?](https://www.figma.com/resource-library/what-is-a-sequence-diagram/), Figma : les éléments, les blocs `alt`, `loop` et `opt`, et des exemples de connexion et de commande. En anglais.
- [What is a UML diagram?](https://www.figma.com/resource-library/what-is-a-uml-diagram/), Figma : les 14 types de diagrammes UML. En anglais.
- [Création de diagrammes](https://docs.github.com/fr/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams), documentation de GitHub, pour écrire des schémas Mermaid dans un dépôt.

## Pour la discussion

- Quel schéma vous aiderait à dessiner vos wireframes ?
- Quel schéma un développeur back-end voudrait-il recevoir ?
