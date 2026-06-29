from fastapi import FastAPI
from app.schemas.product import ProductCreate

app = FastAPI()


@app.get("/")
def home():
    return {"message": "PricePilot API is running"}


@app.post("/products")
def create_product(product: ProductCreate):
    return {
        "message": "Product received successfully",
        "data": product,
    }