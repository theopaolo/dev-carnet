---
title: 'Trois situations pour décider'
order: 9
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Trois situations pour décider

Révéler les situations dans l'ordre. À chaque fois, garder les règles déjà acquises. Le groupe dessine deux alternatives, compare leurs conséquences et choisit. Les fiches donnent des possibilités, aucune n'est imposée.

## Situation 1, des tarifs qui varient

L'application facture le prix de l'atelier. Il faut ajouter un tarif solidaire à moitié prix. D'autres tarifs sont envisagés, sans besoin confirmé. Le montant est entier, en centimes, arrondi au centime le plus proche. Le tarif choisi est enregistré dans le montant de la réservation, qui ne change plus ensuite.

Dessinez une option où une fonction calcule les deux tarifs avec une condition. Dessinez une option où la réservation reçoit une fonction de calcul. Où choisit-on le tarif ? Que faudra-t-il modifier pour une nouvelle règle ? Un objet serait-il plus utile qu'une fonction ici ?

Produisez le trajet du prix jusqu'au montant enregistré, puis un mini ADR. Vérifiez sur papier que 2 001 centimes donnent 1 001 centimes au tarif solidaire. Une réservation existante conserve son montant après un changement du catalogue.

La fiche [Strategy](/poo-patterns-frameworks/02-strategy/) peut éclairer le débat. La [Factory](/poo-patterns-frameworks/04-factory/) n'est utile que si le choix mérite d'être regroupé.

## Situation 2, une API externe et un enregistrement qui échoue

Un partenaire fournit les ateliers avec `remaining_seats`. Les réservations doivent maintenant survivre au redémarrage. Le fournisseur peut renvoyer un format invalide ou refuser l'enregistrement. Aucune confirmation ne doit annoncer une sauvegarde qui a échoué.

Dessinez une option où le service de réservation appelle le fournisseur et traduit ses données. Dessinez une option où un adaptateur traduit le format et où un contrat isole la persistance. Laquelle réduit un changement probable ? Quel coût ajoute la seconde ?

Tracez le succès puis l'échec d'enregistrement. À quel moment la réservation devient-elle confirmée ? Que voit la personne si la réponse se perd après une sauvegarde réussie ? Qui peut garantir une dernière place face à deux demandes simultanées ? Ne supposez pas que le schéma crée une transaction.

Produisez les responsabilités, le trajet d'erreur et un mini ADR avec une incertitude restante. [Adapter](/poo-patterns-frameworks/05-adapter/) et [Repository](/poo-patterns-frameworks/07-repository/) décrivent des options. L'exercice reste une simulation sans réseau.

## Situation 3, plusieurs réactions puis une interface

Une confirmation doit alimenter le journal et un courriel. Si le courriel échoue après sauvegarde, la réservation reste confirmée. En J2, une vue des places doit aussi réagir aux changements et pouvoir être retirée sans rester abonnée.

Dessinez une option avec des appels explicites ordonnés. Dessinez une option avec un événement et des abonnés. Qui connaît les destinataires ? Qui possède leurs erreurs ? Une nouvelle tentative peut-elle envoyer deux courriels ?

Produisez le trajet d'une confirmation, le comportement en cas d'échec d'un destinataire et un mini ADR. En J2, prolongez le même dessin avec le clic DOM, l'action, l'état et le rendu. Identifiez qui pilote ce cycle et qui libère les abonnements. Consultez [Observer](/poo-patterns-frameworks/03-observer/), [Decorator](/poo-patterns-frameworks/06-decorator/) et [Frameworks](/poo-patterns-frameworks/08-frameworks/) selon le besoin.

## Mini ADR commun

Reprendre la [version minimale du support ADR](/architecture-logicielle/06-adr/#version-minimale). Tenir en quelques lignes avec le contexte observé, les deux options, la décision et ses conséquences, dont au moins un coût. Ajouter ce qui ferait réexaminer le choix. « Utiliser un pattern » ne décrit pas encore une décision.
