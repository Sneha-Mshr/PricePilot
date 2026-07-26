from concurrent.futures import ThreadPoolExecutor, as_completed

from app.ai.scraper.amazon import AmazonScraper
from app.ai.scraper.flipkart import FlipkartScraper
from app.ai.scraper.myntra import MyntraScraper
from app.schemas.search import (
    SearchResponse,
    ProductResult,
    SourceResult,
)


class SearchAgent:

    def __init__(self):
        self.scrapers = {
            "Amazon": AmazonScraper(),
            "Flipkart": FlipkartScraper(),
            "Myntra": MyntraScraper(),
        }

    def _scrape_source(self, source_name: str, query: str):
        """Scrape a single source. Returns (source_name, products, error)."""
        try:
            scraper = self.scrapers[source_name]
            products = scraper.search(query)
            return source_name, products, None
        except Exception as e:
            print(f"[SearchAgent] Error scraping {source_name}: {e}")
            return source_name, [], str(e)

    def search(self, query: str):
        """Run all scrapers concurrently and merge results."""

        print(f"[SearchAgent] Starting search for: {query}")

        source_results = []
        all_products = []

        # Run scrapers in parallel using threads
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {
                executor.submit(self._scrape_source, name, query): name
                for name in self.scrapers.keys()
            }

            for future in as_completed(futures):
                source_name = futures[future]
                try:
                    name, products, error = future.result(timeout=60)

                    # Convert raw dicts to ProductResult models
                    product_results = []
                    for p in products:
                        product_results.append(
                            ProductResult(
                                title=p.get("title", ""),
                                price=p.get("price", ""),
                                url=p.get("url", ""),
                                image=p.get("image"),
                                rating=p.get("rating"),
                                source=p.get("source", name),
                            )
                        )

                    source_results.append(
                        SourceResult(
                            source=name,
                            products=product_results,
                            count=len(product_results),
                            error=error,
                        )
                    )

                    all_products.extend(product_results)

                    print(f"[SearchAgent] {name}: {len(product_results)} products")

                except Exception as e:
                    print(f"[SearchAgent] Future error for {source_name}: {e}")
                    source_results.append(
                        SourceResult(
                            source=source_name,
                            products=[],
                            count=0,
                            error=str(e),
                        )
                    )

        # Sort by price (products with price first)
        def price_sort_key(p: ProductResult):
            try:
                return float(p.price) if p.price else float("inf")
            except ValueError:
                return float("inf")

        all_products.sort(key=price_sort_key)

        print(f"[SearchAgent] Total products found: {len(all_products)}")

        return SearchResponse(
            query=query,
            total=len(all_products),
            sources=source_results,
            products=all_products,
        )
