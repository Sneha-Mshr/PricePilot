from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import router
from app.api.v1.health import router as health_router
from app.api.v2.routes import router as ai_router
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(title="PricePilot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Product CRUD needs Postgres, but AI search and the chatbot do not. Don't let
# an unreachable database take the whole service down at boot.
try:
    Base.metadata.create_all(bind=engine)
    print("[startup] Database tables ready")
except Exception as e:
    print(f"[startup] Database unavailable, product CRUD disabled: {e}")

app.include_router(
    health_router,
    prefix="/api/v1",
    tags=["Health"],
)
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
