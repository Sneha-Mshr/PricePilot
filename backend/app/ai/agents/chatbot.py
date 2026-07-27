import os
from typing import List, Dict

from google import genai
from google.genai import types


SYSTEM_PROMPT = """You are PricePilot AI, a helpful shopping assistant chatbot.

Your job is to help users:
- Choose between products (compare features, value for money)
- Suggest the best deals and stores to buy from
- Recommend products based on budget and needs
- Answer questions about product specifications
- Provide shopping tips and advice

Guidelines:
- Be concise and helpful (2-4 sentences max unless comparing products)
- Always mention price ranges in INR (₹)
- When comparing, use bullet points
- If you don't know current prices, say so and suggest checking PricePilot search
- Be friendly and conversational
- Focus on Indian market (Amazon.in, Flipkart, Myntra)
"""


class ChatBot:

    def __init__(self):
        self.client = None
        self._init_client()

    def _init_client(self):
        """Initialize Google GenAI client."""
        api_key = os.getenv("GEMINI_API_KEY", "")

        if api_key:
            try:
                self.client = genai.Client(api_key=api_key)
                print("[ChatBot] Google GenAI client initialized")
            except Exception as e:
                print(f"[ChatBot] GenAI init failed: {e}")
                self.client = None
        else:
            print("[ChatBot] No GEMINI_API_KEY - using rule-based responses")

    def chat(self, message: str, history: List[Dict[str, str]] = None) -> str:
        """Process a chat message and return a response."""

        if self.client:
            return self._genai_response(message, history or [])
        else:
            return self._fallback_response(message)

    def _genai_response(self, message: str, history: List[Dict[str, str]]) -> str:
        """Generate response using Google GenAI SDK."""
        try:
            # Build conversation contents
            contents = []

            # Add history (last 10 messages)
            for msg in history[-10:]:
                role = "user" if msg["role"] == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part(text=msg["content"])],
                    )
                )

            # Add current message
            contents.append(
                types.Content(
                    role="user",
                    parts=[types.Part(text=message)],
                )
            )

            response = self.client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.7,
                    max_output_tokens=1024,
                ),
            )

            return response.text or "I'm not sure how to help with that. Try asking about product comparisons or recommendations!"

        except Exception as e:
            error_msg = str(e)
            print(f"[ChatBot] GenAI error: {error_msg}")

            # If rate limited, use fallback
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                return self._fallback_response(message)

            return self._fallback_response(message)

    def _fallback_response(self, message: str) -> str:
        """Smart rule-based fallback when API is unavailable or rate-limited."""
        msg = message.lower()

        if any(w in msg for w in ["hello", "hi", "hey", "hii"]):
            return "Hey! I'm PricePilot AI. I can help you compare products, find the best deals, or suggest what to buy. What are you looking for today?"

        if any(w in msg for w in ["compare", "vs", "versus", "or", "better", "difference"]):
            return "Great question! Use the search bar above to search for both products — I'll show you prices across Amazon, Flipkart, and Myntra so you can compare side by side. The lowest price gets a 'Best Price' badge!"

        if any(w in msg for w in ["budget", "under", "cheap", "affordable", "low price"]):
            return "I'd recommend searching for the product category in the search bar — results are sorted by price (low to high) so you'll see the most affordable options first across all stores."

        if any(w in msg for w in ["recommend", "suggest", "best", "which", "should i"]):
            return "I can help! Tell me what category you're looking at (phones, laptops, shoes, etc.) and your budget, and I'll give you my recommendations."

        if any(w in msg for w in ["iphone", "apple", "samsung", "phone", "mobile"]):
            return "For phones, I'd suggest searching in PricePilot — Flipkart often has exchange offers, Amazon has bank discounts, and prices can differ by ₹2,000-5,000 across stores. Want me to help you decide between specific models?"

        if any(w in msg for w in ["laptop", "macbook", "notebook", "computer"]):
            return "For laptops, prices vary significantly across stores. Amazon and Flipkart are your best bets. Search above and I'll show you the comparison. Pro tip: check during sale events for 10-20% off!"

        if any(w in msg for w in ["shoe", "nike", "adidas", "sneaker", "footwear"]):
            return "For shoes and fashion, Myntra often has the best deals with frequent sales. Flipkart's fashion section is growing too. Search above to compare across all three!"

        if any(w in msg for w in ["thank", "thanks", "thx"]):
            return "You're welcome! Happy shopping. Let me know if you need anything else."

        if any(w in msg for w in ["how", "work", "what do you do", "help"]):
            return "I help you find the best deals! Search for any product above and I'll compare prices across Amazon, Flipkart, and Myntra. You can also ask me to recommend products or compare two items."

        return "I'm here to help you find the best deals! You can ask me to compare products, suggest alternatives within a budget, or recommend the best store to buy from. What would you like to know?"
