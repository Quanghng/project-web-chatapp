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

Compris ! Voici la mise à jour de la section "Tests" en ajoutant spécifiquement les tests d'intégration et de performance, sans réécrire le reste.

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

## 🚀 Comment Lancer le Projet

Suivez ces étapes simples pour lancer l'application sur votre machine locale :

1.  **Cloner le dépôt Git :**
    ```bash
    git clone <URL_DE_VOTRE_DEPOT>
    cd <NOM_DU_DOSSIER_DU_PROJET>
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

Absolument ! Voici la section "Tests" mise à jour avec les tests d'intégration et de performance :

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


---
