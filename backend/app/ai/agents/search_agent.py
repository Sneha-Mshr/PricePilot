from app.ai.scraper.amazon import AmazonScraper
from app.ai.agents.planner import SearchPlanner
from app.schemas.search import SearchResponse


class SearchAgent:

    def __init__(self):

        self.planner = SearchPlanner()

        self.amazon = AmazonScraper()

    def search(self, query: str):

        plan = self.planner.create_plan(query)

        print(plan)

        result = self.amazon.search(query)

        print(result)
        
        return SearchResponse(
            query=query,
            total=0,
            products=[]
        )