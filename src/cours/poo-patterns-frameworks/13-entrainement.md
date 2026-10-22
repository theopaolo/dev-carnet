---
title: "S'entraîner et vérifier sa compréhension"
order: 11.5
publishedAt: "2026-10-16"
updatedAt: "2026-10-16"
---

# S'entraîner et vérifier sa compréhension

Construisez des créatures pour pratiquer les classes, l'encapsulation et les interfaces. Vous pourrez ensuite essayer les projets du restaurant ou du panier. Des questions avec leurs réponses permettent aussi de revoir les notions du cours.

Les mini-exercices peuvent se faire après les [fondations](/poo-patterns-frameworks/01-fondations/). Les questions sur les choix de conception viennent après les séances concernées. Chaque correction des trois mini-exercices est un programme TypeScript autonome. On peut copier une correction complète dans `creature.ts`, puis l'exécuter avec `node creature.ts` sous Node.js 24. Les assertions vérifient les résultats attendus. Le programme se termine sans message si elles réussissent toutes, et s'arrête avec une erreur si l'une d'elles échoue.

## Construire des créatures en trois étapes

### Étape 1, créer deux instances

Avant de commencer, on relit [la construction d'une instance](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas). On cherche à distinguer la valeur reçue par le constructeur de la propriété conservée dans l'objet, puis à comprendre quel objet `this` désigne.

On écrit une classe `Creature` dont le constructeur reçoit un nom. Chaque instance conserve ce nom et commence avec 100 points d'énergie. Le nom est déclaré `readonly`, tandis que l'énergie est un champ JavaScript privé `#energie`, lisible par un getter `energie`. Une méthode `sePresenter()` renvoie une phrase qui contient le nom. On ne demande pas encore de modifier l'énergie.

On crée ensuite une grenouille nommée René et un poisson nommé Mina. Leurs présentations doivent être différentes, leurs énergies doivent toutes deux valoir 100 et les variables doivent désigner deux objets distincts. On écrit des assertions pour vérifier ces attentes avant de consulter la correction.

<details class="course-details">
<summary>Comparer avec une correction expliquée</summary>

```ts
import assert from "node:assert/strict";

class Creature {
	readonly nom: string;
	#energie = 100;

	constructor(nom: string) {
		this.nom = nom;
	}

	get energie(): number {
		return this.#energie;
	}

	sePresenter(): string {
		return `Je m'appelle ${this.nom}.`;
	}
}

const grenouille = new Creature("René");
const poisson = new Creature("Mina");
assert.equal(grenouille.sePresenter(), "Je m'appelle René.");
assert.equal(poisson.sePresenter(), "Je m'appelle Mina.");
assert.equal(grenouille.energie, 100);
assert.equal(poisson.energie, 100);
assert.notEqual(grenouille, poisson);
```

Le constructeur copie son paramètre dans `this.nom`. Chaque `new` initialise aussi son propre champ `#energie`. L'accès `grenouille.energie` appelle le getter, sans donner accès au champ privé. `readonly` empêche les réaffectations du nom dans le code TypeScript vérifié, sans constituer une protection de sécurité à l'exécution.

Les deux objets sont distincts parce qu'on a exécuté deux fois `new`. Avec `const poisson = grenouille`, les deux variables désigneraient au contraire le même objet. Changer le nom de la variable ne crée pas une nouvelle créature.

</details>

### Étape 2, protéger l'énergie

On part de la correction de l'étape 1 et on relit [l'invariant d'énergie](/poo-patterns-frameworks/01-fondations/#proteger-les-regles-de-lobjet). L'invariant est la règle qui doit rester vraie après chaque opération. Ici, l'énergie reste comprise entre 0 et 100.

On ajoute `avancer(): boolean`. Cette méthode retire 10 points seulement si la créature en possède au moins 10. Elle renvoie `true` après un déplacement. Si l'énergie est insuffisante, elle renvoie `false` et laisse l'énergie inchangée. On ajoute aussi `seReposer(): void`, qui rend 20 points sans dépasser 100. Le nom et la présentation ne changent pas.

On doit pouvoir déplacer René dix fois pour atteindre 0. Le onzième appel doit être refusé en laissant l'énergie à 0. Un repos doit ensuite la ramener à 20, puis des repos supplémentaires doivent l'augmenter sans dépasser 100. Pendant ces opérations, Mina doit rester à 100. Ces attentes vérifient les limites et l'indépendance des instances.

<details class="course-details">
<summary>Comparer avec la correction et ses contrôles aux limites</summary>

```ts
import assert from "node:assert/strict";

class Creature {
	static readonly energieMax = 100;
	readonly nom: string;
	#energie = Creature.energieMax;

	constructor(nom: string) {
		this.nom = nom;
	}

	get energie(): number {
		return this.#energie;
	}

	sePresenter(): string {
		return `Je m'appelle ${this.nom}.`;
	}

	avancer(): boolean {
		if (this.#energie < 10) return false;
		this.#energie -= 10;
		return true;
	}

	seReposer(): void {
		this.#energie = Math.min(Creature.energieMax, this.#energie + 20);
	}
}

const grenouille = new Creature("René");
const poisson = new Creature("Mina");
for (let pas = 0; pas < 10; pas++) {
	assert.equal(grenouille.avancer(), true);
}
assert.equal(grenouille.energie, 0);
assert.equal(grenouille.avancer(), false);
assert.equal(grenouille.energie, 0);
assert.equal(poisson.energie, 100);

grenouille.seReposer();
assert.equal(grenouille.energie, 20);
for (let repos = 0; repos < 5; repos++) grenouille.seReposer();
assert.equal(grenouille.energie, 100);
grenouille.seReposer();
assert.equal(grenouille.energie, 100);
```

Le contrôle précède la soustraction. Il laisse donc l'objet intact quand l'énergie est insuffisante. `Math.min` choisit la plus petite valeur entre le maximum et l'énergie augmentée, ce qui empêche le repos de dépasser 100.

`#energie` est propre à chaque instance, alors que `energieMax` est un membre `static` consulté sur la classe. Comme la classe ne propose aucun setter d'énergie, le code extérieur doit passer par les deux opérations prévues pour la modifier. Ces contrôles suffisent aux actions définies ici, qui ne reçoivent pas de quantité extérieure. Si on ajoute un gain d'énergie fourni par l'utilisateur, il faudra valider cette nouvelle entrée.

</details>

### Étape 3, demander une capacité à un collaborateur

On part de la correction de l'étape 2. On relit les [contrats et le polymorphisme](/poo-patterns-frameworks/01-fondations/#contrats-et-polymorphisme), puis la différence entre [hériter du code et satisfaire une interface](/poo-patterns-frameworks/01-fondations/#lire-extends-super-et-implements).

On décrit dans une interface `Deplacable` la capacité attendue par la mare, avec une méthode `avancer(): boolean`. Elle renvoie `true` après un déplacement. En cas de refus, elle renvoie `false` et laisse son état inchangé. Les créatures conservent en plus leurs règles d'énergie. La classe `Creature` annonce qu'elle satisfait cette interface. On écrit ensuite une classe `Mare`, qui reçoit des `Deplacable` dans son constructeur. Sa méthode `faireUnTour(): number` demande une seule fois à chacun d'avancer, puis renvoie le nombre de déplacements réussis.

La mare doit pouvoir faire avancer deux créatures sans lire leur énergie. Elle doit aussi accepter l'instance d'une classe indépendante, `Nenuphar`, qui possède la même méthode et refuse toujours de bouger. Avec René, Mina et ce nénuphar, un tour doit ainsi renvoyer 2 et laisser les deux créatures à 90. Après dix tours au total, elles sont à 0 et le tour suivant doit renvoyer 0.

<details class="course-details">
<summary>Comparer avec une collaboration qui dépend d'une capacité</summary>

```ts
import assert from "node:assert/strict";

interface Deplacable {
	avancer(): boolean;
}

class Creature implements Deplacable {
	static readonly energieMax = 100;
	readonly nom: string;
	#energie = Creature.energieMax;

	constructor(nom: string) {
		this.nom = nom;
	}

	get energie(): number {
		return this.#energie;
	}

	sePresenter(): string {
		return `Je m'appelle ${this.nom}.`;
	}

	avancer(): boolean {
		if (this.#energie < 10) return false;
		this.#energie -= 10;
		return true;
	}

	seReposer(): void {
		this.#energie = Math.min(Creature.energieMax, this.#energie + 20);
	}
}

class Mare {
	#habitants: Deplacable[];

	constructor(habitants: Deplacable[]) {
		this.#habitants = [...habitants];
	}

	faireUnTour(): number {
		let deplacements = 0;
		for (const habitant of this.#habitants) {
			if (habitant.avancer()) deplacements += 1;
		}
		return deplacements;
	}
}

class Nenuphar {
	avancer(): boolean {
		return false;
	}
}

const grenouille = new Creature("René");
const poisson = new Creature("Mina");
const nenuphar = new Nenuphar();
const habitants = [grenouille, poisson, nenuphar];
const mare = new Mare(habitants);
habitants.length = 0;

assert.equal(mare.faireUnTour(), 2);
assert.equal(grenouille.energie, 90);
assert.equal(poisson.energie, 90);
for (let tour = 0; tour < 9; tour++) assert.equal(mare.faireUnTour(), 2);
assert.equal(grenouille.energie, 0);
assert.equal(poisson.energie, 0);
assert.equal(mare.faireUnTour(), 0);
grenouille.seReposer();
assert.equal(mare.faireUnTour(), 1);
assert.equal(grenouille.energie, 10);
```

La mare utilise seulement le résultat d'`avancer()`. Elle n'a donc besoin ni du nom ni du getter d'énergie. `implements Deplacable` vérifie la classe `Creature`, mais n'y ajoute aucune méthode. La classe `Nenuphar` ne déclare pas `implements Deplacable`, mais ses instances satisfont aussi l'interface par leur structure. Elle n'a pas besoin d'hériter de `Creature` pour collaborer avec la mare.

Le constructeur copie le tableau des habitants. Modifier le tableau fourni après la construction ne change donc pas la liste interne. Les créatures elles-mêmes restent partagées, ce qui permet de constater leur nouvelle énergie après un tour. On retrouve ici la distinction entre [copier un tableau et copier ses objets](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references).

Les habitants avancent l'un après l'autre dans cette simulation, qui ne traite ni météo ni événements. Elle permet de vérifier que la mare utilise le même contrat avec des objets différents. L'interface décrit les types attendus, tandis que les explications et les assertions précisent le comportement à respecter.

</details>

## Vérifier sa compréhension

### 1. Où le nom de la créature est-il conservé ?

Dans `new Creature("René")`, quel rôle jouent le paramètre `nom`, la propriété `this.nom` et la méthode `sePresenter()` ? Que se passe-t-il au second `new Creature("Mina")` ?

<details class="course-details">
<summary>Lire l'explication</summary>

Le paramètre reçoit le texte pendant l'appel au constructeur. L'affectation `this.nom = nom` conserve ce texte dans une propriété de l'objet créé. Après le constructeur, la méthode peut le retrouver par `this.nom`. Le second `new` crée un autre objet, initialisé avec Mina. L'appel `poisson.sePresenter()` utilise cet objet comme `this`, donc il ne lit pas le nom de René.

</details>

### 2. Deux variables désignent-elles deux objets ?

On écrit `const original = { quantite: 2 }`, puis `const alias = original`. Que vaut `alias === original` ? Après `const copie = { ...original }`, que vaut `copie === original` ? `const` empêche-t-il de modifier `alias.quantite` ?

<details class="course-details">
<summary>Lire l'explication et la limite de la copie</summary>

`alias === original` vaut `true`, car les deux variables désignent le même objet. `copie === original` vaut `false`, car la décomposition a créé un nouvel objet. Modifier `alias.quantite` modifie donc aussi ce que l'on lit par `original.quantite`, tandis que modifier le nombre `copie.quantite` ne modifie pas l'original.

`const` empêche de réaffecter la variable, sans figer l'objet. La copie reste superficielle, car elle ne recrée pas les objets imbriqués. Si une propriété contient un tableau, l'objet original et sa copie peuvent donc encore partager ce tableau. Pour obtenir `true` avec `===`, il suffit que les deux variables désignent le même objet, comme `alias` et `original`.

</details>

### 3. Un champ privé suffit-il à protéger une règle ?

Une créature cache `#energie`, mais propose un setter qui affecte directement le nombre reçu. Le code appelant lui donne -50. L'encapsulation protège-t-elle encore l'invariant ? Que changerait le seul mot-clé TypeScript `private` ?

<details class="course-details">
<summary>Lire l'explication</summary>

L'invariant est rompu, même si le champ est caché. L'opération publique accepte une valeur interdite et la conserve. Il faut valider chaque modification possible ou ne proposer que les actions qui maintiennent la règle, comme `avancer()` et `seReposer()`.

`private` réserve l'accès dans le code TypeScript vérifié, puis disparaît du JavaScript exécuté. `#energie` contrôle aussi l'accès au champ à l'exécution. Aucun des deux ne corrige un setter qui accepte une énergie négative. La protection d'accès et la validation des actions remplissent deux rôles différents.

</details>

### 4. Faut-il un ancêtre commun pour faire avancer la mare ?

La mare appelle seulement `avancer(): boolean`. Un robot possède cette méthode, mais ne partage ni le nom ni l'énergie des créatures. Doit-il hériter de `Creature` ? Que fournit réellement `implements Deplacable` ?

<details class="course-details">
<summary>Lire l'explication</summary>

Le robot peut satisfaire `Deplacable` sans hériter de `Creature`. L'interface exprime ce dont la mare a besoin, tandis que `implements` vérifie la présence de la méthode et la compatibilité de ses types. Il n'en fournit pas le code.

Un héritage ou une classe abstraite peut convenir quand les sous-classes doivent réellement partager un état et du code. Ici, imposer les données des créatures au robot n'aide pas la mare. Il faut surtout conserver le contrat d'`avancer()`, y compris le sens du résultat et les effets d'un refus.

</details>

### 5. Quand une condition suffit-elle pour un tarif ?

Un programme calcule deux tarifs stables au même endroit et ne prévoit aucune règle fournie de l'extérieur. Peut-on conserver un `if` ? Dans quel cas passer un objet de tarif à `reserver` deviendrait-il utile ?

<details class="course-details">
<summary>Lire l'explication</summary>

Une condition peut suffire à ce besoin. Elle garde les deux cas près du calcul et reste facile à vérifier. La présence d'un `if` ne signale pas, à elle seule, un défaut de conception.

Passer un objet de tarif devient intéressant lorsque plusieurs règles doivent être choisies indépendamment de la réservation, comparées ou remplacées dans les tests. La [séance Strategy](/poo-patterns-frameworks/02-strategy/) étudie ce changement précis. On compare le coût du paramètre, de l'interface et des classes séparées au coût réel des modifications attendues, sans inventer une variation pour justifier le pattern.

</details>

### 6. Créer un objet et calculer un tarif sont-ils le même choix ?

Une configuration indique quel fournisseur de notification utiliser. Ailleurs, un tarif calcule un montant à partir d'un prix. Quel problème relève d'une fabrique et quel problème peut relever d'une stratégie ? Faut-il systématiquement créer une hiérarchie de classes ?

<details class="course-details">
<summary>Lire l'explication</summary>

Une fabrique peut regrouper la création et la configuration du fournisseur. L'appelant demande alors un objet prêt à utiliser sans reproduire les détails de sa construction. Une stratégie porte le calcul interchangeable, par exemple un objet `TarifSolidaire` dont la méthode `appliquer` transforme un prix en montant.

Si un seul fournisseur se construit en une ligne à un seul endroit, un appel direct peut suffire. Si une fonction avec une condition suffit à choisir entre deux objets à créer, elle peut déjà jouer le rôle d'une fabrique. La [séance Factory](/poo-patterns-frameworks/04-factory/) distingue cette forme du Factory Method GoF. Aucune de ces décisions n'impose une hiérarchie de classes.

</details>

### 7. Retirer une vue suffit-il à la désabonner ?

Une vue s'abonne aux réservations, puis son HTML disparaît. Le mécanisme d'abonnement conserve encore sa fonction. Que doit faire le code qui retire la vue ? Un échec du faux courriel doit-il annuler la réservation déjà enregistrée ?

<details class="course-details">
<summary>Lire l'explication</summary>

Le code qui retire la vue doit aussi retirer son abonnement. Dans la séance Observer, il appelle la méthode de désabonnement avec l'observateur de cette vue. Retirer le HTML ne supprime pas la référence conservée par le mécanisme d'événements. On vérifie donc qu'après le désabonnement, les événements suivants ne déclenchent plus la réaction de cette vue.

Une réservation enregistrée et un courriel envoyé sont deux résultats distincts. Dans notre [séance Observer](/poo-patterns-frameworks/03-observer/), on garde l'erreur de réaction séparément et on poursuit les autres notifications. Au début de l'envoi d'un événement, le programme copie la liste des abonnés. Un désabonnement pendant cet envoi ne change donc pas cette copie. L'abonné peut encore recevoir l'événement en cours, mais ne recevra plus les suivants.

</details>

### 8. Une méthode présente respecte-t-elle forcément Liskov ?

Un type promet une méthode `annuler()` qui annule toute réservation active. Une sous-classe conserve cette méthode, mais lance toujours une erreur « Non annulable ». L'appelant peut-il remplacer une réservation par cette sous-classe sans revoir son code ?

<details class="course-details">
<summary>Lire l'explication et une correction possible</summary>

La méthode existe, mais sa promesse n'est plus tenue. L'appelant qui pouvait annuler toute réservation active doit maintenant reconnaître la sous-classe et contourner le refus. Le remplacement rompt donc le contrat donné dans la question.

La correction du [principe de Liskov](/poo-patterns-frameworks/01-solid/#annoncer-seulement-les-capacites-possibles) réserve le contrat d'annulation aux objets capables de le tenir et garde la consultation accessible aux autres réservations. Si l'annulation peut normalement échouer, le contrat doit annoncer ses conditions et ses résultats dès le départ. Une erreur prévue par un contrat n'est pas automatiquement une violation de Liskov.

</details>

## Réutiliser les acquis dans un autre projet

Ces projets facultatifs permettent de reprendre les mêmes questions dans un restaurant ou un panier, avec des demandes fonctionnelles à satisfaire. On choisit un projet et on commence par quelques données en mémoire. Les montants sont des nombres entiers de centimes, les quantités sont des entiers strictement positifs et chaque opération refusée laisse l'état intact.

### Projet facultatif, suivre une commande au restaurant

Un menu contient des plats et leurs prix. On prépare une commande en ajoutant des plats et des quantités, puis on la transmet à la cuisine. Les statuts se suivent dans cet ordre : brouillon, transmise, en préparation, puis servie. Une commande transmise n'accepte plus de modification de ses lignes dans cette première version.

Le montant est figé au moment de la transmission. Modifier ensuite un prix du menu ne change donc pas le récapitulatif de cette commande. On commence sans réduction. Une seconde règle de calcul peut être ajoutée si on souhaite comparer les choix de la séance Strategy.

On simule la cuisine et l'écran de suivi par un journal en mémoire. Le programme produit une notification uniquement lorsqu'il accepte un changement de statut ou une modification de la commande. Un plat inconnu, une quantité invalide ou un changement de statut interdit ne produit ni modification ni notification de réussite.

Essayez les cas suivants.

- Deux plats à 1 200 centimes et un plat à 800 centimes donnent un montant de 3 200 centimes lors de la transmission.
- Le même récapitulatif vaut encore 3 200 après un changement du prix du premier plat dans le menu.
- Une quantité de zéro et une tentative de passer directement du statut « brouillon » au statut « servie » laissent l'état et le journal inchangés.
- La cuisine reçoit une seule notification lors de la première transmission réussie. Répéter cette demande ne crée pas une seconde commande.
- L'écran reçoit les changements autorisés tant qu'il est présent. S'il utilise des abonnements, son retrait coupe les événements suivants.

Ce programme ne traite ni paiements, ni taxes, ni véritable envoi à une cuisine, ni stockage durable. Les contrôles portent sur une simulation séquentielle dans un seul processus.

### Projet facultatif, conserver les quantités d'un panier

Un catalogue permet de filtrer des produits par catégorie, prix et disponibilité. On ajoute des produits au panier, on change leur quantité ou on retire une ligne. Le filtrage doit laisser le catalogue intact.

À son premier ajout, une ligne conserve l'identifiant du produit et son prix unitaire en centimes. Ajouter à nouveau le même produit augmente sa quantité en gardant ce prix. Une modification ultérieure du catalogue ne change pas le prix de cette ligne. La confirmation produit un récapitulatif indépendant du panier, avec les quantités et les montants retenus à cet instant.

On peut ajouter, en option, l'annulation de la dernière action réussie. On doit alors restaurer exactement l'état qu'elle a modifié. Annuler l'ajout d'une unité à une ligne qui en contenait deux doit rétablir deux unités, sans supprimer la ligne. Une action refusée ne remplace pas la dernière action annulable. On définit aussi ce qui se passe si l'on demande une seconde annulation sans nouvelle action.

Essayez les cas suivants.

- Ajouter deux unités d'un produit à 1 200 centimes donne une ligne de quantité 2 et un total de 2 400 centimes.
- Ajouter une unité supplémentaire donne une quantité de 3 et un total de 3 600. Si l'option d'annulation existe, annuler ce dernier ajout revient à 2 et 2 400.
- Une quantité négative, nulle ou décimale est refusée sans modifier les lignes ni le total.
- Changer le prix du catalogue laisse le prix de la ligne inchangé. Modifier le panier après confirmation laisse aussi le récapitulatif inchangé.
- Modifier un tableau de lignes obtenu pour l'affichage ne permet pas de contourner les règles du panier.

Cette version simule la disponibilité et n'effectue ni réservation réelle du stock, ni paiement, ni persistance. Les contrôles vérifient aussi que les prix et les totaux restent des entiers de centimes représentables exactement par JavaScript.
