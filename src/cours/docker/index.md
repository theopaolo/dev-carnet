---
title: Docker
order: 0
---

# Docker

## C’est quoi docker ?

Docker permet de construire et d’exécuter une application dans un environnement reproductible.

Les principaux concepts à retenir sont :

- `Dockerfile` → décrit comment construire une **image**
- `Image` → environnement exécutable immuable contenant l’application et ses dépendances
- `Container` → instance en cours d’exécution d’une image
- `Docker Compose` → orchestre plusieurs services et conteneurs
- `Volume` → conserve ou partage des données en dehors du cycle de vie d’un conteneur
- `Registry` → stocke et distribue les images Docker
- `Git` → stocke et versionne le code source

``` mermaid
flowchart LR
    accTitle: Cycle de vie d'une image Docker
    accDescr: Du code source au conteneur qui tourne, en passant par le registry.
    Git["Git<br/>code source"]
    Dockerfile["Dockerfile"]
    Image["Image Docker"]
    Container["Container"]
    Registry["Registry"]
    Volume["Volume"]

    Git --> Dockerfile
    Dockerfile -->|docker build| Image
    Image -->|docker run| Container
    Image -->|docker push| Registry
    Registry -->|docker pull| Image
    Container --> Volume
```

## Image et conteneur

Une **image** est un modèle **immuable** en lecture seule à partir duquel Docker peut créer des conteneurs. Elle peut contenir par exemple :

- un système Linux minimal ;
- Node.js ;
- les dépendances npm ;
- le code compilé ;
- une commande de démarrage.

Un **conteneur** est une instance de cette image en cours d’exécution.

Une même image peut lancer plusieurs conteneurs avec des commandes différentes. Avec l’image `projet-api:1.0` :

- le conteneur API lance `npm start` ;
- le conteneur de migration lance `npm run db:migrate` ;
- le conteneur worker lance `npm run worker`.

Les trois conteneurs utilisent le même environnement logiciel, mais exécutent des commandes différentes.

------------------------------------------------------------------------

# Docker Compose

Docker Compose permet de décrire et d’orchestrer une application composée de plusieurs services.

Il s’occupe notamment :

- de construire ou récupérer les images ;
- de créer les conteneurs ;
- de mettre en place leur réseau ;
- de monter les volumes ;
- d’injecter leur configuration ;
- de gérer certaines dépendances de démarrage.

Exemple :

``` plaintext
name: mon-projet

services:
  api:
    build: .
    ports:
      - "3000:3000"

  db:
    image: postgres:16-alpine
```

Le projet contient ici deux services. Le navigateur appelle `api` (Node.js), et `api` appelle `db` (PostgreSQL).

## Nom du projet

Avec : `name: mon-projet` on définit le nom du projet Compose.

Compose s’en sert pour nommer et isoler les ressources qu’il crée, par exemple :

```
monprojet-api-1
monprojet-db-1
monprojet_default
monprojet_db-data
```

Sans `name`, Compose utilise généralement le nom du dossier courant.

Documentation : https://docs.docker.com/reference/compose-file/version-and-name/

------------------------------------------------------------------------

# Réseau

## Réseau par défaut

Si aucun réseau n’est déclaré, Compose crée automatiquement un réseau `default`.

Tous les services y sont connectés et deviennent accessibles par leur **nom de service** grâce au DNS interne de Docker.

``` plaintext
services:
  api:
    # ...
  db:
    image: postgres:16
```

L’API peut contacter PostgreSQL avec : `db:5432` plutôt qu’avec une adresse IP.

Une URL PostgreSQL peut donc ressembler à : postgresql://user:password\@db:5432/mydb

Documentation :

- https://docs.docker.com/reference/compose-file/networks/
- https://docs.docker.com/compose/how-tos/networking/

## `localhost`

Différencier `localhost` du nom d’un service.

Dans un conteneur, `localhost` désigne le conteneur lui-même. Pour joindre PostgreSQL, l’API utilise donc le nom du service : `db:5432`.

Du coup depuis votre API : `localhost:5432` ne désigne pas PostgreSQL. Il faut utiliser le nom du service **db** donc : `db:5432`

------------------------------------------------------------------------

# Ports

La syntaxe :

```
ports:
  - "3000:3000"
```

signifie : `PORT_MACHINE:PORT_CONTENEUR`

Donc :

```
ports:
  - "8080:3000"
```

permet d’accéder depuis la machine à : `http://localhost:8080` alors que l’application écoute toujours sur le port `3000` dans le conteneur.

Les services Docker n’utilisent pas ces ports exposés pour communiquer entre eux, ils utilisent directement :

```
api:3000
db:5432
redis:6379
```

Par conséquent, une base PostgreSQL utilisée uniquement par une API Docker n’a pas nécessairement besoin de :

```
ports:
  - "5432:5432"
```

Il faut **exposer** uniquement ce que la machine **hôte** doit pouvoir atteindre.

------------------------------------------------------------------------

# Réseaux explicites

Des réseaux explicites deviennent intéressants lorsqu’on souhaite isoler certains services.

```
services:
  frontend:
    networks:
      - frontend

  api:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

Le frontend peut contacter l’API.

L’API peut contacter PostgreSQL.

Le frontend ne peut pas directement contacter PostgreSQL car ils ne partagent aucun réseau.

Pour la plupart des environnements de développement simples, le réseau `default` suffit.

------------------------------------------------------------------------

# Build

## Contexte de build

Avec :

```
build:
  context: .
```

Docker utilise le répertoire courant comme **contexte de build**.

Le Dockerfile peut donc accéder aux fichiers présents dans ce contexte :

```
COPY package.json .
COPY apps/api ./apps/api
```

Il est important de limiter ce que Docker reçoit grâce à `.dockerignore`.

Exemple :

```
.git
node_modules
.env
.env.*
coverage
dist
.DS_Store
```

Cela permet :

- d’accélérer les builds ;
- d’éviter d’envoyer des fichiers inutiles ;
- d’éviter d’inclure accidentellement des secrets.

Documentation : https://docs.docker.com/reference/compose-file/build/

------------------------------------------------------------------------

# Volumes et stockage

Un conteneur possède son propre système de fichiers.

Les modifications effectuées pendant son exécution sont écrites dans sa **couche writable**. Cette couche s’ajoute au-dessus de l’image, qui reste en lecture seule.

Par exemple PostgreSQL écrit ses données dans : `/var/lib/postgresql/data`

Sans volume, ces données appartiennent au conteneur, si jamais le conteneur est supprimé, sa **couche writable** disparaît également.

## Volume nommé

On peut sortir les données du cycle de vie du conteneur avec :

```
services:
  db:
    image: postgres:16-alpine

    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Ici `db_data` est un volume Docker.

On peut supprimer puis recréer le conteneur PostgreSQL tout en conservant :

- les tables ;
- les lignes ;
- les index ;
- les utilisateurs ;
- les données internes PostgreSQL.

Le volume possède un cycle de vie indépendant du conteneur.

Attention : `docker compose down` supprime les conteneurs mais conserve généralement les volumes nommés.

Puis : `docker compose down -v` supprime également les volumes.

Dans le cas d’une base de données de développement, cela signifie généralement : **base remise à zéro**.

------------------------------------------------------------------------

# Bind mounts

Un bind mount connecte directement un fichier ou dossier de la machine hôte au conteneur.

``` yaml
volumes:
  - ./apps/api:/repo/apps/api
```

C’est particulièrement utile en développement.

Lorsqu’un fichier est modifié dans l’IDE : `apps/api/src/server.ts` le conteneur voit immédiatement la modification.

Documentation : https://docs.docker.com/engine/storage/bind-mounts/

On peut grossièrement retenir :

| Type          | Usage                                      |
|---------------|--------------------------------------------|
| Bind mount    | Partager des fichiers avec la machine hôte |
| Volume Docker | Conserver des données gérées par Docker    |

------------------------------------------------------------------------

# `node_modules` et Docker

Il faut faire attention lorsqu’on monte tout le projet :

```
volumes:
  - .:/app
```

Le `node_modules` de la machine hôte peut contenir des dépendances spécifiques à macOS ou Windows alors que le conteneur utilise Linux.

Un pattern fréquent est :

``` yaml
volumes:
  - .:/app
  - /app/node_modules
```

Le code vient de la machine hôte, mais `node_modules` reste propre au conteneur Linux. Le volume anonyme `/app/node_modules` masque le dossier `node_modules` de l’hôte à l’intérieur du conteneur.

------------------------------------------------------------------------

# Dépendances entre services

Compose permet de déclarer qu’un service dépend d’un autre avec `depends_on`.

```
api:
  depends_on:
    db:
      condition: service_healthy
```

Il existe notamment trois conditions utiles.

## `service_started`

``` yaml
depends_on:
  db:
    condition: service_started
```

Le conteneur `db` doit être démarré.

Cela ne garantit pas que PostgreSQL soit déjà prêt à accepter des connexions.

## `service_healthy`

``` yaml
depends_on:
  db:
    condition: service_healthy
```

Compose attend que le `healthcheck` du service soit valide.

C’est généralement préférable pour une base de données.

## `service_completed_successfully`

``` yaml
depends_on:
  migrate:
    condition: service_completed_successfully
```

Compose attend que le service se termine avec un code de sortie `0`.

C’est particulièrement adapté à :

- migrations ;
- initialisation ;
- génération de fichiers ;
- setup ponctuel.

------------------------------------------------------------------------

# Healthchecks

Un healthcheck permet de vérifier si un service est réellement opérationnel.

Exemple PostgreSQL :

```
db:
  image: postgres:16-alpine

  healthcheck:
    test:
      - CMD-SHELL
      - pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}

    interval: 5s
    timeout: 5s
    retries: 10
```

Le démarrage peut ensuite suivre cet ordre :

1. PostgreSQL démarre.
2. `pg_isready` répond OK : `db` passe à l’état `service_healthy`.
3. La migration démarre et se termine avec le code 0 : elle passe à l’état `service_completed_successfully`.
4. L’API démarre.

C’est généralement plus robuste que : `Postgres démarre puis API démarre immédiatement`

------------------------------------------------------------------------

# Une image commune pour plusieurs services

Un pattern intéressant consiste à utiliser une même image pour plusieurs rôles.

Par exemple :

``` yaml
services:
  migrate:
    image: monapp-api:dev
    command: npm run db:migrate

  api:
    image: monapp-api:dev
```

L’image peut contenir :

- Node.js ;
- l’application ;
- Drizzle ;
- les dépendances ;
- les scripts npm.

Mais chaque conteneur choisit ce qu’il exécute.

1.  Le service `migrate` effectue son travail puis s’arrête.
2.  Le service `api` reste actif et écoute les requêtes HTTP.

Ca évite de maintenir artificiellement :

``` plaintext
Dockerfile.api
Dockerfile.migrate
```

alors que les deux utilisent exactement le même environnement.

------------------------------------------------------------------------

# Plusieurs applications dans un même conteneur

Il est techniquement possible de lancer plusieurs processus dans un seul conteneur :

``` plaintext
app
├── Vite
└── API
```

Par exemple :

``` yaml
command: >
  sh -c '
    npm run app1 &
    npm run app2 &
    wait
  '
```

Cela peut être acceptable pour un environnement de développement simple.

Mais il est souvent plus clair d’avoir un conteneur par application : `app1` (Vite, port 5173) appelle `app2` (API, port 8787), qui appelle `postgres` (port 5432).

Cela apporte notamment :

- des logs distincts ;
- des healthchecks distincts ;
- des redémarrages indépendants ;
- une meilleure visibilité de l’état de chaque service.

On peut par exemple faire : `docker compose logs app1`ou : `docker compose restart app2` sans toucher aux autres services.

Un conteneur par responsabilité principale est en général plus simple à exploiter.

------------------------------------------------------------------------

# Variables d’environnement

Il faut distinguer plusieurs mécanismes.

## `environment`

``` yaml
services:
  api:
    environment:
      PORT: 3000
      NODE_ENV: development
```

Ces variables sont injectées dans le conteneur.

Node peut les lire avec : `process.env.PORT`

## Interpolation Compose

Avec :

``` yaml
environment:
  DATABASE_URL: ${DATABASE_URL}
```

Compose remplace `${DATABASE_URL}` avant de démarrer le conteneur.

La valeur peut notamment venir :

- du shell ;
- d’un fichier `.env`.

## Valeur par défaut

``` yaml
POSTGRES_USER: ${POSTGRES_USER:-monapp}
```

signifie :

> utilise `POSTGRES_USER` si elle existe, sinon `monapp`.

## Variable obligatoire

```
BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET:?BETTER_AUTH_SECRET is required}
```

Compose refuse de démarrer si la variable n’est pas définie.

C’est utile pour les paramètres critiques.

Documentation : https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/

------------------------------------------------------------------------

# Secrets

Il ne faut pas stocker de véritables secrets directement dans :

- le Dockerfile ;
- `compose.yaml` ;
- Git ;
- l’image Docker.

À éviter :

``` yaml
environment:
  BETTER_AUTH_SECRET: abc123supersecret
```

## `.env` local

Pour un environnement de développement, un `.env` non commité est souvent suffisant.

``` yaml
BETTER_AUTH_SECRET=...
DATABASE_PASSWORD=...
```

Puis :

``` yaml
environment:
  BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET}
```

Ajouter :

``` plaintext
.env
.env.local
```

et également `.env` dans `.dockerignore`.

Un fichier `.env.example` peut en revanche être versionné :

``` plaintext
BETTER_AUTH_SECRET=
DATABASE_URL=
```

## Docker Secrets

Compose permet également de déclarer des secrets.

``` yaml
services:
  api:
    secrets:
      - better_auth_secret

secrets:
  better_auth_secret:
    file: ./secrets/better_auth_secret
```

Le secret devient disponible dans le conteneur sous : `/run/secrets/better_auth_secret`

Attention : un Docker Secret devient un **fichier**, pas automatiquement une variable d’environnement.

Une application qui attend : `process.env.BETTER_AUTH_SECRET` ne le trouvera donc pas automatiquement.

Il faut soit :

- lire le fichier depuis l’application ;
- soit injecter le secret autrement.

Pour un développement local : `.env gitignored` est généralement suffisant.

Pour la production : `secret manager / Docker Secret / secret CI` est préférable.

Documentation : https://docs.docker.com/reference/compose-file/secrets/

------------------------------------------------------------------------

# Dockerfile multi-stage

Un Dockerfile multi-stage sépare le développement, le build et la production dans un seul fichier. L’image de production ne garde que le résultat du build, sans les outils de développement. Le chapitre [Dockerfile multi-stage](/docker/01-dockerfile-multi-stage/) détaille un exemple Python et un exemple Node.

------------------------------------------------------------------------

# Écrire un bon Compose

Pour des projets Node.js / TypeScript :

1.  Utiliser le **nom du service comme hostname** : `db:5432`, `redis:6379`, `api:3000`, plutôt que des IP.

2.  Ne déclarer des `networks:` explicites que lorsqu’il existe réellement un besoin d’isolation. Le réseau `default` suffit souvent.

3.  Utiliser `service_healthy` pour une base de données plutôt que `service_started` si le service suivant doit immédiatement s’y connecter.

4.  Utiliser `service_completed_successfully` pour les migrations, setups ou tâches ponctuelles.

5.  Ajouter des `healthcheck` aux services importants.

6.  Ne jamais commit de véritables secrets dans `compose.yaml`.

7.  Utiliser un `.env` ignoré par Git pour le développement et un mécanisme de secrets adapté pour la production.

8.  Utiliser : `${VAR:-default}` pour les valeurs ayant un fallback acceptable.

9.  Utiliser : `${VAR:?required}` pour les variables obligatoires.

10. Éviter `container_name:` sans raison particulière.

11. Exposer avec `ports:` uniquement les services que l’hôte doit pouvoir atteindre.

12. Utiliser des volumes nommés pour les données persistantes.

13. Utiliser des bind mounts pour le code source pendant le développement.

14. Garder les `node_modules` Linux dans le conteneur plutôt que de réutiliser ceux de macOS ou Windows.

15. Maintenir un `.dockerignore`, particulièrement avec : `context: .`

16. Utiliser une image commune avec des commandes différentes pour des services comme `api`, `migrate` et `worker`lorsqu’ils partagent le même environnement.

17. Préférer un Dockerfile multi-stage pour séparer clairement développement, build et production.

18. Construire l’image de production une seule fois, puis déployer cette même image en staging et en production.

19. Identifier les images avec un numéro de version ou un SHA Git plutôt que de dépendre uniquement de `latest`.

20. Utiliser régulièrement : `docker compose config`

pour comprendre réellement ce que Compose va exécuter.

------------------------------------------------------------------------

# Modèle mental à retenir

On peut résumer l’ensemble ainsi :

> **Git versionne le code. Docker construit un artefact exécutable. Le registry distribue cet artefact. Compose organise son exécution. Les volumes conservent les données qui doivent survivre aux conteneurs.**

## Pour aller plus loin

- [Dockerfile multi-stage](/docker/01-dockerfile-multi-stage/)
- [Docker, Git et les environnements](/docker/02-git-environnements/)
- [Docker Cheat-Sheet](/docker/03-cheat-sheet/)
