---
title: 'Domain-Driven Design'
order: 6
---

# DDD : Domain-Driven Design

Le **Domain-Driven Design (DDD)** est une approche de conception logicielle proposée par Eric Evans dans son livre _Domain-Driven Design: Tackling Complexity in the Heart of Software_ (2003).

Evans publie gratuitement un résumé des notions du livre, sous licence Creative Commons : [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/).

L'approche aligne le modèle d'un logiciel sur le métier qu'il sert. On ne conçoit pas l'application autour d'une base de données, d'un framework ou d'une API. On la construit autour de la façon dont les experts du métier pensent leur travail.

## Notions pour commencer en DDD

### Langage ubiquitaire (ubiquitous language)

Le **langage ubiquitaire** est un vocabulaire structuré autour du modèle du domaine. Toute l'équipe l'utilise : développeurs, experts métier, designers, PO. On le retrouve dans le code, les tests et la documentation, comme dans les discussions, les tickets, les diagrammes et les commits.

Pour aller plus loin : [The Coding Machine, « Ubiquitous language »](https://thecodingmachine.com/ubiquitous-language-concept-cle/).

#### Exemple : un projet de fret

```javascript
// Avant
shipmentData
routingRows
customsFlag

// Après
cargo
routeSpecification
itinerary
```

Les noms « après » viennent du métier du fret : une cargaison, une spécification d'itinéraire, un itinéraire. Les noms « avant » décrivent des structures techniques.

Le métier parle en termes de besoins. Les devs traduisent en tables, services, booléens, payloads, endpoints. D'autres devs retraduisent ensuite. À chaque traduction, le sens se déforme.

## À quoi ça sert

Sans langage commun, chaque groupe traduit pour l'autre. Dans le meilleur des cas, une ou deux personnes deviennent bilingues, et elles deviennent vite un goulot d'étranglement. Un grand projet ne peut pas reposer sur deux personnes pour traduire entre la technique et le métier.

Un langage fracturé produit des malentendus entre métier et devs, du code difficile à relire, des règles métier cachées dans des conditions techniques, des PR difficiles à relire, des bugs dus à des termes ambigus, et des refactorings qui cassent le modèle parce que personne ne sait ce qu'il représente.

Quand le langage change, le modèle change avec lui. Renommer `shipmentData` en `itinerary` précise le concept, pas seulement la variable.

![Le langage ubiquitaire se trouve au croisement des termes métier et des termes de conception technique.](/ressources/lire-une-codebase/files/019f343a-8573-746e-a089-8cd4a15ff7ae/image.png)

## Comment l'appliquer

Avant de coder ou de refactoriser, écoute les mots que les équipes emploient :

- Comment les utilisateurs appellent-ils ça ?
- Quel mot revient dans les échanges ?
- Ce mot a-t-il plusieurs sens ?
- Existe-t-il un terme plus précis ?
- Est-ce un concept métier ou un détail technique ?

Si le client dit :

> On ne veut pas recalculer le trajet si l'itinéraire respecte encore les contraintes.

Les termes à retenir sont : _itinéraire_, _contraintes_, _respecter_, _recalculer_.

Dans le code, cela peut donner : `Itinerary`, `RouteSpecification`, `routeSpecification.isSatisfiedBy(itinerary)`, `RoutingService`.

#### Tester à voix haute

Au lieu de dire : _On supprime les lignes de la table shipment puis on relance le service._

Dis, avec le langage commun : _Quand la Route Specification change, on vérifie si l'Itinerary la satisfait encore. Sinon, le Routing Service génère un nouvel Itinerary._

**Le langage évolue.** Si l'équipe trouve un meilleur mot, mets à jour tout ce qui utilise l'ancien : code, documentation, tests. Le langage reste ainsi aligné sur le métier.
