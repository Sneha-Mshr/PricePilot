from app.ai.agents.planner import SearchPlanner
from app.schemas.search import SearchResponse


class SearchAgent:

    def __init__(self):
        self.planner = SearchPlanner()

    def search(self, query: str):

        plan = self.planner.create_plan(query)

        print(plan)

        return SearchResponse(
            query=query,
            total=0,
            products=[]
        )