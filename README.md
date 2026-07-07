# 🚀 PricePilot

<div align="center">

## 🧠 AI Product Price Comparison Platform
### Built with Next.js • FastAPI • Spring Boot • Hybrid RAG

PricePilot is an AI-powered product price comparison platform designed to simplify online shopping by aggregating products from multiple e-commerce websites into a single intelligent search experience. The platform is being developed around a **Hybrid Retrieval-Augmented Generation (Hybrid RAG)** architecture to deliver smarter product discovery, semantic search, and AI-powered shopping assistance.

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
- 🧠 **Hybrid RAG** is being integrated for semantic search and intelligent product recommendations.

The long-term vision is to build an AI shopping assistant capable of understanding user intent, comparing products intelligently, and recommending the best purchasing options.

---

# ✨ Features

### 🤖 AI Search
- AI-powered product search
- Intelligent search pipeline
- Amazon product scraping
- FastAPI AI service

### 💰 Product Comparison
- Product search
- Price comparison
- Product listing
- Multi-store architecture

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
             Spring Boot Backend
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
     MongoDB                 FastAPI AI
                                   │
                            AI Search Agent
                                   │
                             Playwright
                                   │
                                Amazon
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

## AI Stack
- AI Search Agent
- Playwright
- Hybrid RAG *(In Progress)*
- LangChain *(Planned)*
- Qdrant *(Planned)*

---

# 🚀 Current Progress

### ✅ Backend
- PostgreSQL Integration
- Product CRUD APIs
- Product Search APIs
- Amazon Scraper
- AI Search Endpoint

### ✅ Authentication
- Spring Boot Backend
- MongoDB Integration
- User Registration
- User Login
- JWT Authentication

### ✅ Frontend
- Next.js Setup
- Responsive UI
- Theme Toggle
- Product Listing
- Backend Integration

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Sneha-Mshr/PricePilot.git
cd PricePilot
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## FastAPI Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Spring Boot Backend

```bash
cd spring-backend/backend
./mvnw spring-boot:run
```

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
- 🔄 Cloud Deployment

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
