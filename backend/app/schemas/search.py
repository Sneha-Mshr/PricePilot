from pydantic import BaseModel
from typing import List


class SearchRequest(BaseModel):
    query: str


class ProductResult(BaseModel):
    title: str
    price: str
    url: str
    currency: str = "INR"
    source: str = "Amazon"
    image: str | None = None


class SearchResponse(BaseModel):
    query: str
    total: int
    products: List[ProductResult]