# 🛒 Projecto Final - Ecommerce (React + Express + TypeScript + MongoDB)

Este repositório contém o projecto final desenvolvido pelos alunos da segunda edição do Bytes 4 Future (B4F). O projecto consiste em um sistema de Ecommerce com frontend em React.js e backend em Express + TypeScript + MongoDB.

---

## 📁 Estrutura do Projeto

```
/ (raiz)
├── /backend        # API RESTful com Express + TypeScript + MongoDB
├── /frontend       # Aplicação web com React.js (Context API para auth e carrinho)
└── README.md
```

---

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Dotenv

### Frontend

- React.js
- React Router
- Context API
- Tailwind CSS
- Shadcn UI

---

## ⚙️ Como Executar o Projecto

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Fluxo de Trabalho com Git

### Nome das Branches

Cada grupo deve trabalhar em sua própria branch:

#### Backend

- `feature/auth-user`
- `feature/products`
- `feature/product-listing`
- `feature/categories`
- `feature/orders`

#### Frontend

- `feature/frontend-auth`
- `feature/frontend-catalog`
- `feature/frontend-cart`
- `feature/frontend-checkout`
- `feature/frontend-layout`

### Regras

1. Criar branch a partir da `main`
2. Fazer commits pequenos e claros
3. Sempre actualizar a branch antes de dar push:
   ```bash
   git pull origin main
   ```
4. Subir alterações:
   ```bash
   git push origin sua-branch
   ```
5. Criar Pull Request para `main` com revisão
6. Nunca fazer push direto na `main`

---

## ✅ Checklist por Grupo

### Backend

#### Grupo 1 – Autenticação e Perfil

- [ ] POST /register
- [ ] POST /login (retorna JWT)
- [ ] GET /me (usuário autenticado)
- [ ] Middleware authMiddleware.ts

#### Grupo 2 – Produtos (CRUD)

- [ ] POST /products (admin)
- [ ] PUT /products/:id (admin)
- [ ] DELETE /products/:id (admin)
- [ ] GET /products/:id (detalhes)
- [ ] Validações básicas com zod ou manual

#### Grupo 3 – Listagem e Filtro

- [ ] GET /products (listar todos)
- [ ] GET /products?search=...
- [ ] GET /products?category=...
- [ ] Paginação (opcional)

#### Grupo 4 – Categorias

- [ ] POST /categories (admin)
- [ ] PUT /categories/:id (admin)
- [ ] DELETE /categories/:id (admin)
- [ ] GET /categories
- [ ] GET /categories/:id/products

#### Grupo 5 – Pedidos

- [ ] POST /orders (usuário autenticado)
- [ ] GET /orders/me
- [ ] GET /orders (admin)
- [ ] PATCH /orders/:id (mudar status)

### Frontend

#### Grupo 1 – Autenticação e Perfil

- [ ] Tela de login e registro
- [ ] localStorage para auth
- [ ] Página de perfil do usuário
- [ ] Logout

#### Grupo 2 – Página Inicial e Catálogo

- [ ] Página inicial com produtos
- [ ] Filtro por categoria
- [ ] Barra de busca
- [ ] Página de detalhes do produto

#### Grupo 3 – Carrinho (Context API)

- [ ] Contexto do carrinho
- [ ] Adicionar/remover produtos
- [ ] Atualizar quantidade
- [ ] Página do carrinho

#### Grupo 4 – Checkout e Pedidos

- [ ] Tela de finalização de compra
- [ ] Enviar pedido autenticado
- [ ] Página de pedidos do usuário
- [ ] Página de pedidos do admin

#### Grupo 5 – Layout e Navegação

- [ ] Header com navegação (login, catálogo, carrinho)
- [ ] Footer
- [ ] Roteamento com React Router
- [ ] Responsividade geral

---

## 🔐 Autenticação com JWT

- O token é retornado no login
- Deve ser salvo no `localStorage`
- Enviar token no header:

```
Authorization: Bearer <token>
```

---

## 💡 Dicas

- Criem testes com `fetch` para todas as rotas
- Utilizem o `localStorage` para armazenar token e carrinho
- Dividam bem as tarefas para evitar conflitos
- Validem dados no backend antes de guardar no MongoDB

---

## 📌 Observações

- O carrinho **não será salvo no banco de dados**.
- As avaliações e comentários foram **removidos do escopo**.

---

Sejam criativos e bons códigos! 🚀
