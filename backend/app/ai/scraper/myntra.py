import json
import re

from app.ai.scraper.base import BaseScraper


class MyntraScraper(BaseScraper):

    BASE_URL = "https://www.myntra.com"

    def search(self, query: str):

        try:
            # Myntra uses dash-separated query in URL
            search_term = query.lower().replace(" ", "-")
            url = f"{self.BASE_URL}/{search_term}"
            print(f"[Myntra] Searching: {url}")

            html = self.fetch_page(url)

            # Myntra stores product data in window.__myx JSON
            start_match = re.search(r'window\.__myx\s*=\s*', html)

            if not start_match:
                print("[Myntra] Could not find window.__myx in page")
                return []

            # Use raw_decode to parse exactly one JSON object
            decoder = json.JSONDecoder()
            data, _ = decoder.raw_decode(html, start_match.end())

            # Navigate to the products
            search_data = data.get("searchData", {})
            results = search_data.get("results", {})
            product_list = results.get("products", [])

            print(f"[Myntra] Products in data: {len(product_list)}")

            products = []
            count = min(len(product_list), 8)

            for item in product_list[:count]:
                # Title = brand + product name
                brand = item.get("brand", "")
                product_name = item.get("product", "") or item.get("productName", "")
                title = f"{brand} {product_name}".strip()

                if not title:
                    continue

                # Price - prefer 'price' (selling price), fallback to 'mrp'
                price = ""
                selling_price = item.get("price")
                if selling_price:
                    price = str(int(selling_price))
                else:
                    mrp = item.get("mrp")
                    if mrp:
                        price = str(int(mrp))

                # URL
                landing_page = item.get("landingPageUrl", "")
                product_url = f"https://www.myntra.com/{landing_page}" if landing_page else ""

                # Image
                image = item.get("searchImage", "")

                # Rating
                rating = ""
                rating_val = item.get("rating")
                if rating_val:
                    rating = f"{float(rating_val):.1f}"

                products.append({
                    "title": title,
                    "price": price,
                    "url": product_url,
                    "image": image,
                    "rating": rating,
                    "source": "Myntra",
                })

            print(f"[Myntra] Extracted {len(products)} products")
            return products

        except Exception as e:
            print(f"[Myntra] Error: {e}")
            return []
