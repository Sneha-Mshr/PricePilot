from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional

from app.schemas.search import SearchRequest, SearchResponse
from app.ai.agents.search_agent import SearchAgent
from app.ai.agents.chatbot import ChatBot

router = APIRouter()

agent = SearchAgent()
chatbot = ChatBot()


# --- Search ---

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


# --- Chat ---

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    AI shopping assistant chatbot.
    Provides product recommendations and shopping advice.
    """
    if not request.message or len(request.message.strip()) < 1:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty",
        )

    try:
        history = []
        if request.history:
            history = [{"role": m.role, "content": m.content} for m in request.history]

        reply = chatbot.chat(request.message.strip(), history)
        return ChatResponse(reply=reply)
    except Exception as e:
        print(f"[v2/chat] Error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Chat failed. Please try again.",
        )
