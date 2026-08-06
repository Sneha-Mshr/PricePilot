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

    # True when results came from the in-memory cache rather than a live scrape.
    cached: bool = False

    # Set when results are older than the cache TTL, i.e. the live scrape came
    # back empty and we served the last known-good data instead.
    stale: bool = False

    # Human-readable explanation to surface in the UI (e.g. stores blocked us).
    notice: Optional[str] = None
