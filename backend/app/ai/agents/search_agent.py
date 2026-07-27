from concurrent.futures import ThreadPoolExecutor, as_completed

from app.ai.scraper.amazon import AmazonScraper
from app.ai.scraper.flipkart import FlipkartScraper
from app.ai.scraper.myntra import MyntraScraper
from app.schemas.search import (
    SearchResponse,
    ProductResult,
    SourceResult,
)


# Categories that are fashion/lifestyle — route to Myntra
FASHION_KEYWORDS = [
    "shoe", "shoes", "sneaker", "sneakers", "sandal", "sandals",
    "shirt", "t-shirt", "tshirt", "dress", "jeans", "jacket",
    "kurta", "saree", "kurti", "lehenga", "top", "tops",
    "clothing", "fashion", "wear", "apparel",
    "nike", "adidas", "puma", "reebok", "skechers", "crocs",
    "bag", "handbag", "backpack", "wallet",
    "watch", "watches", "sunglasses",
    "perfume", "cologne", "fragrance",
    "cosmetics", "makeup", "lipstick",
    "track pants", "joggers",
]

# Categories that are electronics/tech — skip Myntra
ELECTRONICS_KEYWORDS = [
    "phone", "iphone", "samsung galaxy", "pixel", "oneplus", "realme", "vivo", "oppo", "redmi",
    "laptop", "macbook", "notebook", "chromebook", "computer", "pc",
    "tablet", "ipad",
    "tv", "television", "monitor", "display",
    "camera", "dslr", "gopro",
    "headphone", "earphone", "earbuds", "airpods", "speaker", "soundbar",
    "gaming", "playstation", "ps5", "xbox", "nintendo",
    "refrigerator", "washing machine", "microwave", "ac", "air conditioner",
    "printer", "router", "hard disk", "ssd", "ram",
    "charger", "power bank", "cable",
    "smart watch", "smartwatch", "fitness band",
    "processor", "graphics card", "gpu",
]


class SearchAgent:

    def __init__(self):
        self.scrapers = {
            "Amazon": AmazonScraper(),
            "Flipkart": FlipkartScraper(),
            "Myntra": MyntraScraper(),
        }

    def _get_relevant_sources(self, query: str) -> list[str]:
        """Determine which stores to search based on the query."""
        query_lower = query.lower()

        is_electronics = any(kw in query_lower for kw in ELECTRONICS_KEYWORDS)
        is_fashion = any(kw in query_lower for kw in FASHION_KEYWORDS)

        if is_electronics and not is_fashion:
            # Electronics → Amazon + Flipkart only
            return ["Amazon", "Flipkart"]
        elif is_fashion and not is_electronics:
            # Fashion → all three (Myntra shines here)
            return ["Amazon", "Flipkart", "Myntra"]
        else:
            # Ambiguous or general → all three
            return ["Amazon", "Flipkart", "Myntra"]

    def _is_relevant(self, product_title: str, query: str) -> bool:
        """Check if a product is relevant to the search query."""
        query_lower = query.lower()
        title_lower = product_title.lower()

        # Split query into meaningful words (3+ chars)
        query_words = [w for w in query_lower.split() if len(w) >= 3]

        if not query_words:
            return True

        # At least one query word should appear in the title
        matches = sum(1 for word in query_words if word in title_lower)

        # For single-word queries, need exact match
        if len(query_words) == 1:
            return matches >= 1

        # For multi-word queries, need at least half the words to match
        return matches >= max(1, len(query_words) // 2)

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
        """Run relevant scrapers concurrently, filter results, and merge."""

        print(f"[SearchAgent] Starting search for: {query}")

        # Determine which sources to search
        sources_to_search = self._get_relevant_sources(query)
        skipped_sources = [s for s in self.scrapers.keys() if s not in sources_to_search]

        if skipped_sources:
            print(f"[SearchAgent] Skipping: {skipped_sources} (not relevant for this query)")

        source_results = []
        all_products = []

        # Add skipped sources as empty results
        for skipped in skipped_sources:
            source_results.append(
                SourceResult(
                    source=skipped,
                    products=[],
                    count=0,
                    error=None,
                )
            )

        # Run scrapers in parallel using threads
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {
                executor.submit(self._scrape_source, name, query): name
                for name in sources_to_search
            }

            for future in as_completed(futures):
                source_name = futures[future]
                try:
                    name, products, error = future.result(timeout=60)

                    # Convert raw dicts to ProductResult models + filter relevance
                    product_results = []
                    filtered_count = 0

                    for p in products:
                        title = p.get("title", "")

                        # Relevance filter
                        if not self._is_relevant(title, query):
                            filtered_count += 1
                            continue

                        product_results.append(
                            ProductResult(
                                title=title,
                                price=p.get("price", ""),
                                url=p.get("url", ""),
                                image=p.get("image"),
                                rating=p.get("rating"),
                                source=p.get("source", name),
                            )
                        )

                    if filtered_count > 0:
                        print(f"[SearchAgent] {name}: Filtered out {filtered_count} irrelevant products")

                    source_results.append(
                        SourceResult(
                            source=name,
                            products=product_results,
                            count=len(product_results),
                            error=error,
                        )
                    )

                    all_products.extend(product_results)

                    print(f"[SearchAgent] {name}: {len(product_results)} relevant products")

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

        print(f"[SearchAgent] Total relevant products: {len(all_products)}")

        return SearchResponse(
            query=query,
            total=len(all_products),
            sources=source_results,
            products=all_products,
        )
