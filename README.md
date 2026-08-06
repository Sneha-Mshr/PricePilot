# 🚀 PricePilot

<div align="center">

## 🧠 AI Product Price Comparison Platform
### Built with Next.js • FastAPI • Spring Boot • Gemini

PricePilot aggregates products from multiple Indian e-commerce sites into a single search. One query fans out to Amazon, Flipkart and Myntra concurrently, results are filtered for relevance and merged into a single price comparison, and a Gemini-powered assistant helps you decide what to buy.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql)

</div>

---

# 📖 Overview

PricePilot is a full-stack AI application that enables users to search products once and compare prices across multiple online marketplaces.

The project follows a **microservice-based architecture**, where:

- 🌐 **Next.js** powers the responsive frontend.
- ☕ **Spring Boot** manages authentication and user services.
- ⚡ **FastAPI** handles AI search and scraping.
- 🗄 **PostgreSQL** stores product data.
- 🍃 **MongoDB** manages user authentication.
- 🧠 **Google Gemini** powers the shopping assistant chatbot.

The long-term vision is to build an AI shopping assistant capable of understanding user intent, comparing products intelligently, and recommending the best purchasing options.

---

# ✨ Features

### 🤖 AI Search
- One query → Amazon, Flipkart & Myntra scraped concurrently
- Category routing (electronics skip Myntra, fashion includes it)
- Relevance filtering with category synonyms
- Gemini shopping assistant with rule-based fallback

### 💰 Product Comparison
- Unified results sorted by price, with a best-deal banner
- Filter by store, sort by price or rating, grid/list views
- Wishlist, search history, price-drop alerts & shareable links
- 15-minute result cache with stale-fallback when stores rate-limit

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption

### 🎨 Modern Frontend
- Responsive UI
- Dark / Light Theme
- Tailwind CSS
- Shadcn UI
- Framer Motion

---

# 🏗 Architecture

```text
                    User
                      │
                      ▼
              Next.js Frontend
                      │
                      ▼
        ┌────────────┴────────────┐
        ▼                          ▼
 Spring Boot (auth)         FastAPI (search + AI)
        │                          │
        ▼                ┌────────┼────────┐
    MongoDB              ▼        ▼        ▼
                     PostgreSQL  Gemini  Search Agent
                                              │
                                    ┌────────┼────────┐
                                    ▼        ▼        ▼
                                 Amazon   Flipkart   Myntra
```

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios
- Framer Motion

## Backend
- FastAPI
- Spring Boot
- PostgreSQL
- MongoDB

## Scraping & AI
- Search Agent (concurrent multi-store scraping + relevance filtering)
- Requests + BeautifulSoup / lxml
- Google Gemini (shopping chatbot)
- In-memory TTL cache with stale-fallback
- Hybrid RAG + Qdrant *(planned)*

---

# 🚀 Current Progress

### ✅ Backend
- PostgreSQL integration + product CRUD APIs
- Amazon, Flipkart & Myntra scrapers
- Concurrent AI search endpoint with relevance filtering
- Gemini chatbot endpoint
- Result caching, health checks, env-driven config

### ✅ Authentication
- Spring Boot + MongoDB
- Registration, login, JWT issuing
- BCrypt hashing, DTO responses (no password leakage)
- Proper HTTP status codes via a global exception handler

### ✅ Frontend
- Responsive UI with dark/light theme
- Search, comparison, product modal, best-deal banner
- Wishlist, history, insights, price-drop alerts
- Product catalogue backed by the CRUD API

---

# ⚙️ Local Setup

## Prerequisites

| Tool | Version | Needed for |
|------|---------|-----------|
| Node.js | 20+ | Frontend |
| Python | 3.11–3.12 | FastAPI service |
| Java (JDK) | 21+ | Spring Boot service |
| PostgreSQL | 14+ | Product storage |
| MongoDB | 6+ | User accounts |

Don't want to install the databases? Use Docker instead — see [Option B](#option-b-docker).

## Clone Repository

```bash
git clone https://github.com/Sneha-Mshr/PricePilot.git
cd PricePilot
```

## Option A — Run each service yourself

### 1. FastAPI Backend (AI search, chatbot, product CRUD) → port 8000

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env           # then edit DATABASE_URL and GEMINI_API_KEY
uvicorn app.main:app --reload
```

Create the database first if it doesn't exist:

```sql
CREATE DATABASE pricepilot;
```

> **Password with special characters?** Percent-encode them in `DATABASE_URL`
> (`#` → `%23`, `@` → `%40`), otherwise the connection string won't parse.

A `GEMINI_API_KEY` is optional — without it the chatbot falls back to canned
rule-based replies. Get a free key at
[aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### 2. Spring Boot Backend (auth) → port 8080

```bash
cd spring-backend/backend
./mvnw spring-boot:run
```

Reads `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGINS` and `FASTAPI_URL` from the
environment, all with working localhost defaults.

### 3. Frontend → port 3000

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Option B — Docker

Brings up Postgres, MongoDB and both backends in one command:

```bash
docker compose up --build
```

Then run the frontend on the host with `cd frontend && npm run dev`.

## Verify it's working

```bash
curl http://localhost:8000/api/v1/health     # {"status":"healthy"}
curl http://localhost:8080/api/v1/health     # PricePilot Spring Boot Running...
```

Interactive API docs: <http://localhost:8000/docs>

---

# ☁️ Deployment

The three services deploy independently:

| Service | Platform | Config |
|---------|----------|--------|
| Frontend | Vercel | Root directory `frontend` |
| FastAPI | Render | `backend/Dockerfile` |
| Spring Boot | Render | `spring-backend/backend/Dockerfile` |
| PostgreSQL | Render | Free managed instance |
| MongoDB | MongoDB Atlas | Free M0 cluster |

[`render.yaml`](render.yaml) is a Render Blueprint that provisions both backends
and the database in one go.

### Environment variables

**FastAPI**

| Variable | Example |
|----------|---------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/pricepilot` |
| `CORS_ORIGINS` | `https://pricepilot.vercel.app` |
| `GEMINI_API_KEY` | your Google AI Studio key |

**Spring Boot**

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/pricepilot` |
| `JWT_SECRET` | 32+ random bytes — never reuse the dev default |
| `CORS_ORIGINS` | `https://pricepilot.vercel.app` |
| `FASTAPI_URL` | `https://pricepilot-api.onrender.com` |

**Frontend** (must be set *before* the Vercel build — `NEXT_PUBLIC_*` values are
baked in at build time)

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_AI_API_URL` | `https://pricepilot-api.onrender.com` |
| `NEXT_PUBLIC_AUTH_API_URL` | `https://pricepilot-auth.onrender.com` |

> **A note on live scraping.** Amazon, Flipkart and Myntra block datacenter IPs
> far more aggressively than home connections, so searches that work locally can
> come back empty from a cloud host. The API caches results for 15 minutes and
> falls back to the last known-good data when a scrape is blocked, but for
> consistently fresh results you'd want a proxy service in front of the scrapers.

---

# 🚧 Roadmap

- ✅ AI Search Agent
- ✅ Amazon Scraper
- 🔄 Premium UI/UX
- 🔄 Product Comparison Dashboard
- 🔄 Flipkart Integration
- 🔄 Myntra Integration
- 🔄 Hybrid RAG Pipeline
- 🔄 LangChain Integration
- 🔄 Qdrant Vector Database
- 🔄 AI Product Recommendations
- 🔄 Price History
- 🔄 Email Alerts
- ✅ Dockerised Deployment

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve PricePilot:

- ⭐ Star the repository
- 🍴 Fork the project
- 🌿 Create a feature branch
- 📩 Submit a Pull Request

Every contribution helps make PricePilot smarter and more useful.

---

# 👩‍💻 Author

**Sneha Mishra**

B.Tech – Electronics & Communication Engineering  
National Institute of Technology Hamirpur

Built with ❤️ by **Sneha Mishra**

GitHub: https://github.com/Sneha-Mshr

---

⭐ If you found this project interesting, consider giving it a **Star**.
