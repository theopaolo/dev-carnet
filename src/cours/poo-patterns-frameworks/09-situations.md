---
title: 'Trois situations pour décider'
order: 9
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Trois situations pour décider

Une application d'inscription propose un catalogue d'ateliers, une réservation et une annulation. Elle fonctionne avec un tarif unique et des données en mémoire. Ces études de cas examinent l'évolution de ses contraintes. Le [point de départ TypeScript](/poo-patterns-frameworks/10-exercice/) permet de vérifier les comportements, mais les choix se comparent aussi par des schémas.

Un schéma indique les responsabilités, nomme les appels et représente les erreurs. Une décision dépend des contraintes connues, pas du nombre de patterns représentés.

## Situation 1, des tarifs qui varient

Un tarif solidaire accorde une réduction de moitié. Les montants sont des entiers en centimes, arrondis au centime le plus proche. Le montant enregistré ne change plus après la réservation. D'autres réductions sont envisagées, sans besoin confirmé.

Une option conserve une fonction avec une condition sur le tarif. Les règles et leur sélection se lisent au même endroit. Une autre fournit une fonction de tarif à la réservation. Chaque règle peut évoluer séparément, mais le choix de cette fonction doit être organisé ailleurs.

La première option convient à deux règles locales et stables. La seconde devient intéressante si les tarifs changent souvent ou sont réutilisés. Une [Strategy](/poo-patterns-frameworks/02-strategy/) isole alors le calcul. Une [fabrique](/poo-patterns-frameworks/04-factory/) peut regrouper une sélection répétée.

L'arrondi appartient à la règle de calcul, avec un test commun aux appelants. Pour 2 001 centimes, le tarif solidaire donne 1 001 centimes. Une ancienne réservation garde son montant après modification du catalogue. Recalculer son prix à la lecture changerait la règle métier.

## Situation 2, une API externe et un enregistrement qui échoue

Un partenaire expose les ateliers avec le champ `remaining_seats`. Les réservations doivent survivre au redémarrage. Le service peut renvoyer un format invalide ou refuser un enregistrement. Une confirmation ne doit pas annoncer une sauvegarde qui a échoué.

Une option place l'appel au fournisseur et sa traduction dans le service de réservation. Elle limite les contrats, mais mêle règles métier et formats externes. Une autre confie la traduction à un [Adapter](/poo-patterns-frameworks/05-adapter/) et la collection persistante à un [Repository](/poo-patterns-frameworks/07-repository/). Elle contient les changements du fournisseur, au prix de contrats et d'implémentations supplémentaires.

Plusieurs opérations utilisant le fournisseur donnent davantage de raisons d'isoler sa traduction. Une intégration unique peut conserver une frontière plus directe, avec une validation de sa réponse.

La confirmation suit le succès d'enregistrement défini par le contrat. Si la réponse se perd après sauvegarde, une nouvelle tentative peut créer un doublon. Le fournisseur doit permettre de retrouver ou de reconnaître la même demande. Deux réservations concurrentes pour la dernière place demandent une garantie du stockage, comme une opération atomique. Ni un schéma en couches ni le nom `Repository` n'apportent cette garantie.

## Situation 3, plusieurs réactions puis une interface

Une confirmation alimente un journal et un courriel. Une vue des places réagit aussi aux changements et peut être retirée. L'échec du courriel ne doit pas annuler une réservation déjà confirmée.

Une option appelle explicitement chaque destinataire. L'ordre et les erreurs sont visibles, mais le service connaît chaque réaction. Une autre émet un événement reçu par des abonnés. [Observer](/poo-patterns-frameworks/03-observer/) permet d'ajouter une réaction sans modifier l'émetteur. Le trajet des appels devient moins visible et demande une politique d'erreur.

Des destinataires peu nombreux et stables favorisent les appels directs. Des réactions indépendantes ajoutées régulièrement donnent davantage d'intérêt aux abonnements. Une trace autour d'une opération peut relever de [Decorator](/poo-patterns-frameworks/06-decorator/) plutôt que d'un événement partagé.

L'interface conserve la réservation confirmée et signale séparément l'échec d'envoi. Le démontage d'une vue libère son abonnement. Une notification d'état provoque un rendu, pas une nouvelle réservation. Le [chapitre sur les frameworks](/poo-patterns-frameworks/08-frameworks/) détaille cette séparation.

## Garder la raison d'une décision avec un ADR

Un ADR conserve le contexte, la décision et ses conséquences. Le [support consacré aux ADR](/architecture-logicielle/06-adr/#version-minimale) en donne une forme courte. Voici un exemple pour les tarifs.

> Deux tarifs sont utilisés uniquement par la réservation. Nous conservons une fonction avec une condition plutôt que deux stratégies injectées. La lecture reste locale, mais ajouter un tarif demande de modifier cette fonction. Nous réexaminerons ce choix si une deuxième opération réutilise les règles ou si leurs évolutions deviennent indépendantes.

L'ADR note une décision et son coût. La [proposition de Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) explique l'intérêt de conserver ces raisons, même lorsque la décision est remplacée.
