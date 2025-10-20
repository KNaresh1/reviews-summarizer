# AI-Powered Reviews Summarizer

An AI-powered product review summarization system that uses customer feedback to generate concise summaries 
for each product.

Users can view all products, read their reviews, and click Summarize to instantly generate a product summary 
using an OpenAI language model.

### 🚀 Project Overview

This project combines a modern React + Vite frontend with a Bun + Express backend, powered by Prisma ORM 
for database management and OpenAI LLMs for natural language summarization.

Key Features:
- Fetches stored products and customer reviews from a database.
- Passes top 10 reviews to an OpenAI model to generate meaningful summaries.
- Displays summaries and reviews on the frontend in a clean, responsive UI.
- Layered backend architecture: routes → controller → service → repository → LLM client.

### 🧱 Tech Stack

Frontend (Client): 
- React (Vite + TypeScript), React Query, TailwindCSS + shadcn/ui, Axios

Backend (Server):
- Bun – runtime and package manager
- Express.js – REST API framework
- Prisma ORM – database management (MySQL)
- OpenAI API – for review summarization
- Layered structure: routes, controllers, services, repositories, clients

### ▶️ Run the Project Locally

To start both the frontend (React + Vite) and backend (Bun + Express) together, simply run:

```bash
npm run dev
```

This command uses concurrently to launch both servers in parallel:
- Frontend: runs on http://localhost:5173
- Backend: runs on http://localhost:3000

Make sure you’ve:
1.	Installed dependencies

```bash
bun install
```

2.	Configured your .env file (including DATABASE_URL and OPENAI_API_KEY)
3.	Generated the Prisma client

After that, npm run dev will boot up the full app for local development 🚀

### 🧩 Prisma Setup

This project uses Prisma ORM for database access.
If the generated Prisma client directory (/generated/prisma) is missing or deleted, you can easily regenerate it
from the existing schema.

Generate Prisma Client:

From the project/server root, run the following command:

```bash
bunx prisma generate --schema=packages/server/prisma/schema.prisma
```

This command reads the Prisma schema and creates the generated client inside the path specified in the
schema’s generator block (e.g., packages/server/generated/prisma).

Configure the Database Connection

Prisma uses the DATABASE_URL defined in your .env file.
Open (or create) the .env file in the same directory as your Prisma schema (packages/server/.env), and set your
database URL:

```bash
DATABASE_URL="mysql://root:password@localhost:3306/review_summarizer"
```

