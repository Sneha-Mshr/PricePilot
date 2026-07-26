from pydantic import BaseModel
from typing import List, Optional


class SearchRequest(BaseModel):
    query: str


class ProductResult(BaseModel):
    title: str
    price: str
    url: str
    currency: str = "INR"
    source: str = "Amazon"
    image: Optional[str] = None
    rating: Optional[str] = None


class SourceResult(BaseModel):
    source: str
    products: List[ProductResult]
    count: int
    error: Optional[str] = None


class SearchResponse(BaseModel):
    query: str
    total: int
    sources: List[SourceResult]
    products: List[ProductResult]
