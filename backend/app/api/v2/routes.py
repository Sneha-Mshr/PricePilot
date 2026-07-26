from fastapi import APIRouter, HTTPException

from app.schemas.search import SearchRequest, SearchResponse
from app.ai.agents.search_agent import SearchAgent

router = APIRouter()

agent = SearchAgent()


@router.post("/search", response_model=SearchResponse)
def search_products(request: SearchRequest):
    """
    AI-powered multi-site product search.
    Searches Amazon, Flipkart, and Myntra concurrently
    and returns unified comparison results.
    """
    if not request.query or len(request.query.strip()) < 2:
        raise HTTPException(
            status_code=400,
            detail="Search query must be at least 2 characters",
        )

    try:
        result = agent.search(request.query.strip())
        return result
    except Exception as e:
        print(f"[v2/search] Error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Search failed. Please try again.",
        )
