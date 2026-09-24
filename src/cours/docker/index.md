---
title: Docker
order: 0
---

# Docker

## Docker en bref

Docker construit et exécute une application dans un environnement reproductible.

Les concepts principaux :

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

Une **image** est un modèle **immuable**, en lecture seule, à partir duquel Docker crée des conteneurs. Elle peut contenir par exemple :

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

Les trois conteneurs partagent le même environnement logiciel et exécutent chacun leur commande.

------------------------------------------------------------------------

# Docker Compose

Docker Compose décrit et orchestre une application composée de plusieurs services.

Il se charge :

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

`name: mon-projet` définit le nom du projet Compose.

Compose s’en sert pour nommer et isoler les ressources qu’il crée, par exemple :

```
mon-projet-api-1
mon-projet-db-1
mon-projet_default
mon-projet_db-data
```

Sans `name`, Compose utilise généralement le nom du dossier courant.

Documentation : https://docs.docker.com/reference/compose-file/version-and-name/

------------------------------------------------------------------------

# Réseau

## Réseau par défaut

Si aucun réseau n’est déclaré, Compose crée automatiquement un réseau `default`.

Tous les services y sont connectés. Le DNS interne de Docker les rend joignables par leur **nom de service**.

``` plaintext
services:
  api:
    # ...
  db:
    image: postgres:16
```

L’API contacte PostgreSQL avec `db:5432`, sans adresse IP.

Une URL PostgreSQL ressemble donc à `postgresql://user:password@db:5432/mydb`.

Documentation :

- https://docs.docker.com/reference/compose-file/networks/
- https://docs.docker.com/compose/how-tos/networking/

## `localhost`

Dans un conteneur, `localhost` désigne le conteneur lui-même. Depuis l’API, `localhost:5432` ne mène donc pas à PostgreSQL. L’API utilise le nom du service : `db:5432`.

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

Les services Docker n’utilisent pas ces ports exposés pour communiquer entre eux. Ils utilisent directement :

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

**Exposez** seulement ce que la machine **hôte** doit atteindre.

------------------------------------------------------------------------

# Réseaux explicites

Des réseaux explicites servent à isoler certains services.

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

Le frontend contacte l’API. L’API contacte PostgreSQL. Le frontend ne peut pas joindre PostgreSQL, car ils ne partagent aucun réseau.

Pour un environnement de développement simple, le réseau `default` suffit.

------------------------------------------------------------------------

# Build

## Contexte de build

Avec :

```
build:
  context: .
```

Docker utilise le répertoire courant comme **contexte de build**.

Le Dockerfile accède aux fichiers présents dans ce contexte :

```
COPY package.json .
COPY apps/api ./apps/api
```

Limitez ce que Docker reçoit avec `.dockerignore`.

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

Ce fichier sert à :

- accélérer les builds ;
- ne pas envoyer de fichiers inutiles ;
- ne pas inclure un secret par accident.

Documentation : https://docs.docker.com/reference/compose-file/build/

------------------------------------------------------------------------

# Volumes et stockage

Un conteneur possède son propre système de fichiers.

Les modifications effectuées pendant son exécution sont écrites dans sa **couche writable**. Cette couche s’ajoute au-dessus de l’image, qui reste en lecture seule.

Par exemple PostgreSQL écrit ses données dans : `/var/lib/postgresql/data`

Sans volume, ces données appartiennent au conteneur. Si le conteneur est supprimé, sa **couche writable** disparaît avec lui.

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

Attention : `docker compose down` supprime les conteneurs et conserve les volumes nommés. `docker compose down -v` supprime aussi les volumes. Pour une base de développement, cela veut dire **base remise à zéro**.

------------------------------------------------------------------------

# Bind mounts

Un bind mount connecte directement un fichier ou dossier de la machine hôte au conteneur.

``` yaml
volumes:
  - ./apps/api:/repo/apps/api
```

C’est utile en développement : quand vous modifiez `apps/api/src/server.ts` dans l’IDE, le conteneur voit la modification tout de suite.

Documentation : https://docs.docker.com/engine/storage/bind-mounts/

En résumé :

| Type          | Usage                                      |
|---------------|--------------------------------------------|
| Bind mount    | Partager des fichiers avec la machine hôte |
| Volume Docker | Conserver des données gérées par Docker    |

------------------------------------------------------------------------

# `node_modules` et Docker

Attention quand vous montez tout le projet :

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

`depends_on` déclare qu’un service dépend d’un autre.

```
api:
  depends_on:
    db:
      condition: service_healthy
```

Trois conditions sont utiles.

## `service_started`

``` yaml
depends_on:
  db:
    condition: service_started
```

Le conteneur `db` doit être démarré. PostgreSQL n’accepte pas forcément encore de connexions à ce moment-là.

## `service_healthy`

``` yaml
depends_on:
  db:
    condition: service_healthy
```

Compose attend que le `healthcheck` du service réussisse. C’est le bon choix pour une base de données.

## `service_completed_successfully`

``` yaml
depends_on:
  migrate:
    condition: service_completed_successfully
```

Compose attend que le service se termine avec un code de sortie `0`.

Cette condition convient aux :

- migrations ;
- initialisations ;
- générations de fichiers ;
- tâches ponctuelles.

------------------------------------------------------------------------

# Healthchecks

Un healthcheck vérifie qu’un service répond, pas seulement que son conteneur tourne.

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

Sans healthcheck, l’API démarre dès que le conteneur Postgres existe et peut échouer à sa première connexion.

------------------------------------------------------------------------

# Une image commune pour plusieurs services

Une même image peut servir à plusieurs rôles.

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

Chaque conteneur choisit ce qu’il exécute.

1.  Le service `migrate` effectue son travail puis s’arrête.
2.  Le service `api` reste actif et écoute les requêtes HTTP.

Vous évitez ainsi de maintenir :

``` plaintext
Dockerfile.api
Dockerfile.migrate
```

alors que les deux utilisent le même environnement.

------------------------------------------------------------------------

# Plusieurs applications dans un même conteneur

Un seul conteneur peut lancer plusieurs processus :

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

Pour un environnement de développement simple, ça passe. Un conteneur par application reste plus lisible : `app1` (Vite, port 5173) appelle `app2` (API, port 8787), qui appelle `postgres` (port 5432).

Vous obtenez :

- des logs distincts ;
- des healthchecks distincts ;
- des redémarrages indépendants ;
- une meilleure visibilité de l’état de chaque service.

Vous pouvez lancer `docker compose logs app1` ou `docker compose restart app2` sans toucher aux autres services.

------------------------------------------------------------------------

# Variables d’environnement

Compose a plusieurs mécanismes.

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

La valeur vient :

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

Utilisez-le pour les paramètres sans lesquels l’application ne peut pas tourner.

Documentation : https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/

------------------------------------------------------------------------

# Secrets

Ne stockez pas de vrais secrets dans :

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

En développement, un `.env` non commité suffit en général.

``` yaml
BETTER_AUTH_SECRET=...
DATABASE_PASSWORD=...
```

Puis :

``` yaml
environment:
  BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET}
```

Ajoutez au `.gitignore` :

``` plaintext
.env
.env.local
```

et ajoutez aussi `.env` dans `.dockerignore`.

Un fichier `.env.example` peut en revanche être versionné :

``` plaintext
BETTER_AUTH_SECRET=
DATABASE_URL=
```

## Docker Secrets

Compose déclare aussi des secrets.

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

Attention : un Docker Secret devient un **fichier**, pas une variable d’environnement. Une application qui lit `process.env.BETTER_AUTH_SECRET` ne le trouvera pas. Deux solutions :

- lire le fichier depuis l’application ;
- injecter le secret autrement.

En développement local, un `.env` ignoré par Git suffit. En production, préférez un gestionnaire de secrets, un Docker Secret ou un secret de CI.

Documentation : https://docs.docker.com/reference/compose-file/secrets/

------------------------------------------------------------------------

# Dockerfile multi-stage

Un Dockerfile multi-stage sépare le développement, le build et la production dans un seul fichier. L’image de production ne garde que le résultat du build, sans les outils de développement. Le chapitre [Dockerfile multi-stage](/docker/01-dockerfile-multi-stage/) détaille un exemple Python et un exemple Node.

------------------------------------------------------------------------

# Écrire un bon Compose

Pour des projets Node.js / TypeScript :

1.  Utiliser le **nom du service comme hostname** : `db:5432`, `redis:6379`, `api:3000`, plutôt que des IP.

2.  Ne déclarer des `networks:` explicites qu’en cas de besoin d’isolation. Le réseau `default` suffit souvent.

3.  Utiliser `service_healthy` pour une base de données plutôt que `service_started` si le service suivant doit immédiatement s’y connecter.

4.  Utiliser `service_completed_successfully` pour les migrations, setups ou tâches ponctuelles.

5.  Ajouter un `healthcheck` aux services dont d’autres dépendent.

6.  Ne pas commiter de vrais secrets dans `compose.yaml`.

7.  Utiliser un `.env` ignoré par Git pour le développement et un mécanisme de secrets adapté pour la production.

8.  Utiliser : `${VAR:-default}` pour les valeurs ayant un fallback acceptable.

9.  Utiliser : `${VAR:?required}` pour les variables obligatoires.

10. Éviter `container_name:` sans raison particulière.

11. Exposer avec `ports:` uniquement les services que l’hôte doit pouvoir atteindre.

12. Utiliser des volumes nommés pour les données persistantes.

13. Utiliser des bind mounts pour le code source pendant le développement.

14. Garder les `node_modules` Linux dans le conteneur plutôt que de réutiliser ceux de macOS ou Windows.

15. Maintenir un `.dockerignore`, surtout avec `context: .`

16. Utiliser une image commune avec des commandes différentes pour des services comme `api`, `migrate` et `worker` lorsqu’ils partagent le même environnement.

17. Préférer un Dockerfile multi-stage pour séparer développement, build et production.

18. Construire l’image de production une seule fois, puis déployer cette même image en staging et en production.

19. Identifier les images avec un numéro de version ou un SHA Git plutôt que de dépendre uniquement de `latest`.

20. Lancer `docker compose config` pour voir ce que Compose va exécuter, variables résolues.

------------------------------------------------------------------------

# Modèle mental à retenir

> **Git versionne le code. Docker construit un artefact exécutable. Le registry distribue cet artefact. Compose organise son exécution. Les volumes conservent les données qui doivent survivre aux conteneurs.**

## Pour aller plus loin

- [Dockerfile multi-stage](/docker/01-dockerfile-multi-stage/)
- [Docker, Git et les environnements](/docker/02-git-environnements/)
- [Docker Cheat-Sheet](/docker/03-cheat-sheet/)
