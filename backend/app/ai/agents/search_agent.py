from app.schemas.search import SearchResponse


class SearchAgent:

    def search(self, query: str):

        print(f"Searching for: {query}")

        return SearchResponse(
            query=query,
            total=0,
            products=[]
        )