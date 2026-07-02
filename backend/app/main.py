from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import router
from app.api.v2.routes import router as ai_router
from app.core.database import Base, engine

app = FastAPI(title="PricePilot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    router,
    prefix="/api/v1",
    tags=["Products"],
)
app.include_router(
    ai_router,
    prefix="/api/v2",
    tags=["AI Search"],
)

@app.get("/")
def home():
    return {
        "message": "PricePilot API Running Successfully!"
    }