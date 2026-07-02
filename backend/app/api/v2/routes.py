from fastapi import APIRouter

from app.schemas.search import SearchRequest
from app.ai.agents.search_agent import SearchAgent

router = APIRouter()

agent = SearchAgent()


@router.post("/search")
def search_products(request: SearchRequest):

    return agent.search(request.query)