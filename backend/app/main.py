from fastapi import FastAPI
from sqlalchemy import text

from app.core.database import engine, Base
from app.models import Product

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "message": "Database Connected Successfully!"
    }