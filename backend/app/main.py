from fastapi import FastAPI

from app.api.v1.routes import router

app = FastAPI(
    title="PricePilot API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Welcome to PricePilot API"
    }