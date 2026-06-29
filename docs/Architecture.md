# High-Level Architecture

                User
                  │
                  ▼
          React Frontend
                  │
                  ▼
           FastAPI Backend
                  │
                  ▼
             RAG Pipeline
          ┌────────┼────────┐
          ▼        ▼        ▼
     Product Data  Vector DB  LLM
                  │
                  ▼
          AI Generated Response