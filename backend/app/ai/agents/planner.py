from app.ai.agents.prompts import SEARCH_SYSTEM_PROMPT


class SearchPlanner:

    def create_plan(self, query: str):

        return {
            "query": query,
            "sites": [
                "amazon",
                "flipkart",
                "myntra"
            ]
        }