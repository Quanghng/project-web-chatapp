# 💬 Application de Chat Full-Stack

Bienvenue dans l'Application de Chat Full-Stack, un projet robuste et moderne conçu pour faciliter l'échange de messages en temps réel entre plusieurs utilisateurs.

## ✨ Fonctionnalités

Cette application offre une expérience de chat complète avec les fonctionnalités suivantes :

*   **Échange de messages en temps réel** : Communication instantanée entre les utilisateurs.
*   **Gestion des utilisateurs** : Inscription, connexion, et mise à jour des profils utilisateurs.
*   **Authentification sécurisée** : Système d'authentification basé sur les JSON Web Tokens (JWT) avec protection contre les attaques CSRF (Cross-Site Request Forgery).
*   **Design Réactif (Responsive Design)** : Interface utilisateur optimisée pour une expérience fluide sur tous les appareils (ordinateurs, tablettes, mobiles).

## 🚀 Technologies Utilisées

Ce projet s'appuie sur un ensemble de technologies modernes et performantes pour garantir scalabilité, performance et maintenabilité :

*   **Backend** :
    *   **NestJS** : Framework Node.js progressif pour construire des applications backend efficaces et évolutives.
    *   **GraphQL / Abonnements GraphQL** : Pour des requêtes de données flexibles et des mises à jour en temps réel.
*   **Frontend** :
    *   **React avec Vite** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur interactives et performantes.
*   **Base de Données** :
    *   **PostgreSQL** : Système de gestion de base de données relationnelle robuste et open-source.
*   **Messagerie asynchrone** :
    *   **RabbitMQ** : Broker de messages pour une communication asynchrone fiable entre les services.
*   **Outils de développement et d'intégration** :
    *   **Prisma** : ORM (Object-Relational Mapper) puissant pour la modélisation de la base de données et l'interaction sécurisée.
    *   **GraphQL Code Generator** : Assure une sûreté de type complète et automatique entre le frontend et le backend, réduisant les erreurs et améliorant la productivité.

---

## ⚙️ Optimisations & Techniques Avancées

*   **Full Dockerisé** : L'intégralité de l'application est conteneurisée avec Docker, garantissant un environnement de développement cohérent et un déploiement simplifié.
*   **Tests Étendus** :
    *   **Tests E2E (End-to-End)** : Pour valider les parcours utilisateurs complets.
    *   **Tests Unitaires** : Pour garantir la fiabilité de chaque composant et fonction.
    *   **Tests d'Intégration** : Pour vérifier que les différents modules et services (comme le backend avec la base de données) interagissent correctement.
    *   **Tests de Performance** : Pour évaluer la réactivité et la scalabilité du système sous différentes charges.
    *   Le tout est implémenté avec **Jest**.
*   **DataLoader** : Implémenté pour optimiser les requêtes GraphQL et résoudre le problème du "N+1 query".
*   **Sécurité Renforcée** :
    *   **CORS** (Cross-Origin Resource Sharing) configuré.
    *   **Helmet** : Protection contre les vulnérabilités web courantes en définissant des en-têtes HTTP sécurisés.
    *   Gestion sécurisée des **tokens d'accès (Access Token)** et des **tokens de rafraîchissement (Refresh Token)** pour l'authentification.

## 📝 Variables d'Environnement

Le projet utilise des variables d'environnement pour gérer les configurations sensibles et spécifiques à l'environnement. Un fichier `.env` est requis à la racine du projet. Vous pouvez copier le fichier `.env.example` et le remplir avec vos valeurs.

Voici une explication de chaque variable :

*   **`FRONTEND_URL`** : L'URL complète de votre application frontend. Essentiel pour la configuration CORS.
*   **`FRONTEND_DOMAIN`** : Le nom de domaine de votre frontend. Utilisé pour la configuration des cookies et la sécurité.

*   **`JWT_ACCESS_TOKEN_SECRET`** : Une chaîne secrète robuste utilisée pour signer les tokens d'accès JWT. **Générez une chaîne longue et aléatoire pour la production.**
*   **`JWT_REFRESH_TOKEN_SECRET`** : Une chaîne secrète robuste utilisée pour signer les tokens de rafraîchissement JWT. **Générez une chaîne longue et aléatoire pour la production.**
*   **`CSRF_SECRET`** : Une chaîne secrète robuste utilisée pour la protection CSRF. **Générez une chaîne longue et aléatoire pour la production.**
*   **`CSRF_COOKIE_NAME`** : Le nom du cookie utilisé pour stocker le token CSRF. Il est recommandé de garder la valeur par défaut pour des raisons de sécurité (préfixe `__Host-`).

*   **`TOKEN_COOKIE_MODE`** : Définit comment le token d'accès JWT est transmis.
    *   `false` : Le token est attendu dans l'en-tête `Authorization: Bearer ...`.
    *   `true` : Le token est attendu dans un cookie nommé `jwt`.

*   **`NODE_ENV`** : L'environnement d'exécution de l'application Node.js (`development`, `production`, `test`). Affecte le comportement de log, la gestion des erreurs, et les optimisations.

*   **`RABBITMQ_URL`** : L'URL de connexion complète à votre serveur RabbitMQ. Pour Docker Compose, utilisez le nom du service (ex: `amqp://admin:password@rabbitmq:5672`).
*   **`RABBITMQ_USER`** : Nom d'utilisateur pour se connecter à RabbitMQ.
*   **`RABBITMQ_PASSWORD`** : Mot de passe pour se connecter à RabbitMQ.
*   **`RABBITMQ_HOST`** : L'hôte de RabbitMQ (utile pour des configurations séparées, sinon intégré à `RABBITMQ_URL`). Pour Docker Compose, utilisez `rabbitmq`.
*   **`RABBITMQ_PORT`** : Le port de RabbitMQ.

*   **`REDIS_HOST`** : L'hôte du serveur Redis (utilisé pour le caching, les sessions, ou les abonnements). Pour Docker Compose, utilisez `redis`.
*   **`REDIS_PORT`** : Le port du serveur Redis.

*   **`POSTGRES_USER`** : Nom d'utilisateur de la base de données PostgreSQL.
*   **`POSTGRES_PASSWORD`** : Mot de passe de la base de données PostgreSQL.
*   **`POSTGRES_DB`** : Nom de la base de données PostgreSQL à utiliser.
*   **`DATABASE_URL`** : URL de connexion complète à la base de données PostgreSQL, utilisée notamment par Prisma. Pour Docker Compose, utilisez le nom du service (`postgres`) pour l'hôte.
*   **`POSTGRES_HOST`** : L'hôte de la base de données PostgreSQL. Pour Docker Compose, utilisez `postgres`.
*   **`POSTGRES_PORT`** : Le port de la base de données PostgreSQL.

**Note importante :** Les secrets JWT et CSRF (et les mots de passe) doivent être des chaînes aléatoires **fortes et uniques** pour chaque environnement (développement, production). Ne les partagez jamais et ne les commettez jamais dans votre dépôt Git ! Utilisez un générateur de chaînes aléatoires pour les créer.

## 🚀 Comment Lancer le Projet

### Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre système :

*   **Git** : Pour cloner le dépôt du projet.
    *   [Télécharger Git](https://git-scm.com/downloads)
*   **Docker** et **Docker Compose** : Pour construire et gérer les conteneurs de l'application.
    *   [Installer Docker Desktop (inclut Docker Compose)](https://www.docker.com/products/docker-desktop/)

### Étapes de Lancement

Suivez ces étapes simples pour lancer l'application sur votre machine locale :

1.  **Cloner le dépôt Git :**
    ```bash
    git clone https://github.com/Quanghng/project-web-chatapp
    cd 
    ```

2.  **Configurer les variables d'environnement :**
    *   Copiez le fichier d'exemple `.env.example` et renommez-le en `.env`.
    *   Ouvrez le fichier `.env` et remplacez les valeurs placeholders par vos propres configurations (clés secrètes JWT, informations de connexion à la base de données, etc.).

    ```bash
    cp .env.example .env
    ```

3.  **Lancer les conteneurs Docker :**
    Cette commande va construire les images Docker (si nécessaire), créer les conteneurs pour le backend, le frontend, la base de données et RabbitMQ, puis les démarrer en arrière-plan.

    ```bash
    docker compose up -d --build
    ```

    **Notes Importantes :**
    *   Lors de la **première exécution** de cette commande avec l'option `--build`, la construction des images Docker peut prendre un certain temps (généralement entre 4 et 5 minutes, selon les performances de votre machine).
    *   Il peut arriver que les vérifications de santé (health checks) de certains conteneurs échouent lors du démarrage initial, entraînant un redémarrage ou un statut `unhealthy`. Si c'est le cas, il suffit généralement de **relancer la commande** : `docker compose up -d`. Les services devraient alors démarrer correctement.
  
    *Attendez quelques instants que tous les services démarrent et s'initialisent (notamment la base de données).*

4.  **Accéder à l'application :**
    Une fois que tous les services Docker sont lancés et opérationnels, l'application sera accessible via votre navigateur web.

    *   **Frontend :** `http://localhost:5174`
    *   **Backend GraphQL API :** `http://localhost:3333/graphql`
    *   **Backend REST Auth API :** `http://localhost:3333/api/v1`

## 📚 Documentation de l'API

### Swagger (Documentation de l'API REST)

Vous pouvez explorer la documentation interactive de l'API REST (endpoints d'authentification) via Swagger à l'adresse suivante :

*   `http://localhost:3333/docs`

### Opérations GraphQL

L'API GraphQL est structurée autour des entités suivantes :

#### Utilisateur (`User`)
*   `userLoggedIn.graphql` : Récupère les informations de l'utilisateur actuellement connecté.
*   `updateUser.graphql` : Met à jour les informations d'un utilisateur.
*   `getUsers.graphql` : Récupère une liste d'utilisateurs.

#### Conversation (`Conversation`)
*   `createConversation.graphql` : Crée une nouvelle conversation entre utilisateurs.
*   `getConversationsByUser.graphql` : Récupère toutes les conversations d'un utilisateur donné.

#### Message (`Message`)
*   `getMessagesByConversation.graphql` : Récupère tous les messages d'une conversation spécifique.
*   `messageSent.graphql` : Abonnement GraphQL pour les messages envoyés en temps réel.
*   `sendMessage.graphql` : Envoie un nouveau message dans une conversation.

### Endpoints de l'API REST (`/api/v1/auth`)

| Point d'accès | Méthode | Description                                       | Authentification Requise |
| :------------ | :------ | :------------------------------------------------ | :----------------------- |
| `/signup`     | `POST`  | Enregistre un nouvel utilisateur                  | Token CSRF               |
| `/signin`     | `POST`  | Connecte l'utilisateur et renvoie les tokens JWT + CSRF | Token CSRF               |
| `/logout`     | `POST`  | Déconnecte l'utilisateur et invalide le token     | JWT d'accès              |
| `/refresh`    | `POST`  | Rafraîchit les tokens de manière sécurisée        | JWT de rafraîchissement  |

---

## ✅ Tests

Le projet est soumis à une suite complète de tests pour garantir sa robustesse, sa performance et sa qualité :

*   **Tests Unitaires** : Pour garantir la fiabilité de chaque composant et fonction individuelle, en isolant leur comportement.
*   **Tests d'Intégration** : Pour vérifier que les différents modules et services (comme le backend avec la base de données, ou l'API avec RabbitMQ) interagissent correctement entre eux et que le flux de données est cohérent.
*   **Tests E2E (End-to-End)** : Pour valider les parcours utilisateurs complets de bout en bout, simulant des interactions réelles avec l'application, du frontend au backend et vice-versa.
*   **Tests de Performance** : Pour évaluer la réactivité, la stabilité et la scalabilité du système sous différentes charges, afin d'identifier les goulots d'étranglement et d'assurer une expérience fluide même en cas de forte affluence.

Les tests unitaires, d'intégration et E2E sont principalement implémentés avec **Jest**.

Pour lancer la suite de tests principale (unitaires, intégration, E2E), exécutez la commande suivante à la racine du projet backend :

```bash
npm run test
```

### Tests d'intégration et Tests de performance
Tous les scripts de tests d’intégration et de tests de performance sont disponibles sur la branche staging.

Les tests d'intégration nécessitent un accès réseau à RabbitMQ, qui est uniquement possible depuis le container nestjs.
Pour exécuter les tests d’intégration, il faut entrer dans le container NestJS ::

```bash
docker compose exec nestjs sh
```

Puis lancez les tests à l'intérieur du container :

```bash
npm run test
```

Pour lancer les tests de performance, depuis le répertoire backend, utilisez ces commandes :

```bash
npx artillery run test/performance/artillery-sendMessage.yml --output test/performance/sendMessage-result.json
```

```bash
npx artillery run test/performance/artillery-subscription.yml --output test/performance/subscription-result.json
```

Les résultats des tests de performance sont affichés directement dans le terminal pour une lecture rapide, et sauvegardés dans les fichiers JSON spécifiés (sendMessage-result.json et subscription-result.json) pour une analyse approfondie.


---
