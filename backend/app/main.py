from fastapi import FastAPI

app = FastAPI(
    title="PricePilot API",
    version="1.0.0",
    description="Backend API for PricePilot RAG System"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to PricePilot API"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }