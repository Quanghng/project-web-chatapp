# 🥘 **Eatstagram – Fullstack Application**  
Eatstagram is a modern fullstack social app that lets users create, like, and comment on cooking recipes ("threads") with a clean UI and robust backend.

This application consists of two main parts:
- **Backend**: Built with NestJS, GraphQL, Prisma, and PostgreSQL.
- **Frontend**: Built with React, TypeScript, TailwindCSS, and Apollo Client.

---

## 📋 Prerequisites

Before setting up the full application, ensure you have the following installed on your machine:

- Node.js (>= 18.x)
- Yarn or npm
- Docker & Docker Compose
- PostgreSQL client (optional)
- Git

---

## 🔧 General Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Quanghng/graphql-project.git
cd graphql-project
```

2. **Set up the Backend**

Follow the detailed setup instructions in `backend/README.md`  
This includes configuring environment variables, running the PostgreSQL database in Docker, installing dependencies, and starting the server.

3. **Set up the Frontend**

Follow the instructions in `frontend/README.md`  
Ensure the backend is running first, then start the Vite development server for the frontend.

---

## 🚀 Application URLs

- **Frontend**: [http://localhost:5174](http://localhost:5174)  
- **Backend GraphQL API**: [http://localhost:3333/graphql](http://localhost:3333/graphql)  
- **Backend REST Auth API**: [http://localhost:3333/api/v1](http://localhost:3333/api/v1)  

---

## 📦 Stack Highlights

- **Backend**: NestJS, GraphQL (Code First), Prisma ORM, JWT & CSRF security, Docker
- **Frontend**: React, TypeScript, TailwindCSS, ShadCN UI, Apollo Client
- **Security**: JWT in cookies, CSRF protection, Helmet, CORS setup

---

## 📘 Additional Notes

- Each part of the application (backend/frontend) has its own detailed README for step-by-step instructions.
- Tokens are handled securely using cookies and localStorage (depending on the environment).
- Prisma is used for DB modeling, and GraphQL Code Generator ensures full type safety across frontend and backend.

Enjoy sharing your recipes and cooking on **Eatstagram**!
