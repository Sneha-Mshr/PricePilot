from fastapi import FastAPI

from app.api.v1.routes import router
from app.core.database import Base, engine

app = FastAPI(title="PricePilot API")

Base.metadata.create_all(bind=engine)

app.include_router(
    router,
    prefix="/api/v1",
    tags=["Products"],
)


@app.get("/")
def home():
    return {
        "message": "PricePilot API Running Successfully!"
    }