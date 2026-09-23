---
title: 'Domain-Driven Design'
order: 6
---

# DDD - Domain-Driven Design

Le **Domain-Driven Design (DDD)** est une approche de conception logicielle proposée par Eric Evans dans son livre _Domain-Driven Design: Tackling Complexity in the Heart of Software._

https://thecodingmachine.com/ubiquitous-language-concept-cle/

[Domain_Driven_Design_Tackling_Complexity_in_the_Heart_of_Software_-\_Eric_Evans.pdf](/ressources/lire-une-codebase/files/019f3418-58b0-70d5-8d2a-507d9af39fbd/Domain_Driven_Design_Tackling_Complexity_in_the_Heart_of_Software_-_Eric_Evans.pdf)

Cette approche consiste à aligner le modèle conceptuel d’un logiciel avec le domaine industriel pour lequel il est architecturé.

L’idée centrale est que le logiciel doit refléter le métier, pas la technologie. Au lieu de concevoir une application autour d’une base de données, d’un framework ou d’une API, on la construit autour de la manière dont les experts du métier pensent.

## Notions pour commencer en DDD

### Language ubiquitaire ( ubiquitous language )  

Le **Ubiquitous Language** est langage structuré autour du modèle de domaine et utilisé par tous les membres de l’équipe pour relier toutes les activités de l’équipe au logiciel. Il est partagé par les développeurs, les experts métier, les designers, les PO. On le retrouvera aussi dans les tests, la documentation et le code comme dans les discussions, les tickets, les diagrammes et le commits.

#### Exemples projet de frets

```javascript
#Avant
shipmentData
routingRows
customsFlag

#Après
cargo
routeSpecification
itinerary
```

Le code du logiciel reflète le métier pour lequel il est conçus.

Le métier parle en termes de besoin. Les devs traduisent en tables, services, booléens, payloads, endpoints. Puis d’autres devs retraduisent. À chaque traduction, le sens se déforme.

## C’est quoi l’intérêt ?

Sans langage commun, chaque groupe, ingénieur et expert, se met à traduire, au meilleurs des cas une ou deux personnes deviennent bilingue, mais très rapidement ils deviennent des goulots d’étranglement, un grand projet ne peux par reposer que sur 2 personnes pour traduire la tech et le métier.

Un langage fracturé crée des malentendus entre métier et devs, du code difficile à relire, des règles métier cachées dans des conditions techniques, des PR difficiles à reviewer, des bugs liés à des termes ambigus, et des refactorings destructeurs parce que personne ne sait vraiment ce que représente le modèle.

**_Quand le langage change, le modèle change._**

Renommer `shipmentData` en `itinerary`, c’est clarifier le concept.

![Le langage ubiquitaire se trouve au croisement des termes métier et des termes de conception technique.](/ressources/lire-une-codebase/files/019f343a-8573-746e-a089-8cd4a15ff7ae/image.png)

## Comment l’appliquer

Avant de coder ou refactorer, écouter les mots réellement utilisés par les équipes,

- Comment les utilisateurs appellent ça ?
- Quel mot revient dans les échanges ?
- Ce mot a-t-il plusieurs sens ?
- Existe-t-il un terme plus précis ?
- Est-ce un concept métier ou un détail technique ?

Si le client dit :

> On ne veut pas recalculer le trajet si l’itinéraire respecte encore les contraintes.

Les termes intéressant sont : _itinéraire_, _contraintes_, _respect_, _recalculer_.

Dans le code ça pourrais donner : `Itinary`, `RouteSpecification()`, `satisfie()`, `RouteService()`

#### Faire des test à voix haute !

Plutôt que de dire : _On supprime les lignes de la table shipment puis on relance le service._

Utiliser un langage commun : _Quand la Route Specification change, on vérifie si l’Itinerary la satisfait encore. Sinon, le Routing Service génère un nouvel Itinerary._

**Le langage peux évoluer,** les équipes trouvent un meilleurs mots par exemple, alors il faudra mettre à jours tout ce qui dans le code, documentations, test etc… utilise le mot ancien, pour que le langage reste aligné et reflète les changements du métier et de ses expertises.
