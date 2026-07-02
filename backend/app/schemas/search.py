from pydantic import BaseModel
from typing import List


class SearchRequest(BaseModel):
    query: str


class ProductResult(BaseModel):
    title: str
    price: float
    currency: str
    source: str
    url: str
    image: str | None = None


class SearchResponse(BaseModel):
    query: str
    total: int
    products: List[ProductResult]