from urllib.parse import quote_plus
from bs4 import BeautifulSoup

from app.ai.scraper.base import BaseScraper


class AmazonScraper(BaseScraper):

    BASE_URL = "https://www.amazon.in/s"

    def search(self, query: str):

        try:
            url = f"{self.BASE_URL}?k={quote_plus(query)}"
            print(f"[Amazon] Searching: {url}")

            html = self.fetch_page(url)
            soup = BeautifulSoup(html, "lxml")

            cards = soup.select("[data-component-type='s-search-result']")
            print(f"[Amazon] Cards found: {len(cards)}")

            products = []
            count = min(len(cards), 8)

            for card in cards[:count]:
                # Title - prefer img alt (has full product name), fallback to h2
                title = ""
                img_el = card.select_one("img.s-image")
                if img_el:
                    title = img_el.get("alt", "")

                if not title:
                    title_el = card.select_one("h2")
                    title = title_el.get_text(strip=True) if title_el else ""

                if not title:
                    continue

                # Price
                price_el = card.select_one(".a-price-whole")
                price = ""
                if price_el:
                    price = price_el.get_text(strip=True).replace(",", "").replace(".", "")

                # URL - find the best product link
                url = ""
                all_links = card.select("a[href]")
                for link in all_links:
                    href = link.get("href", "")
                    # Prefer direct product links (/dp/ pattern)
                    if "/dp/" in href and href.startswith("/"):
                        url = f"https://www.amazon.in{href}"
                        break
                # Fallback to /sspa/click links (sponsored, but still redirect to product)
                if not url:
                    for link in all_links:
                        href = link.get("href", "")
                        if href.startswith("/sspa/click"):
                            url = f"https://www.amazon.in{href}"
                            break

                # Image
                img_el = card.select_one("img.s-image")
                image = img_el.get("src", "") if img_el else ""

                # Rating
                rating_el = card.select_one("span.a-icon-alt")
                rating = ""
                if rating_el:
                    rating_text = rating_el.get_text(strip=True)
                    rating = rating_text.split(" ")[0] if rating_text else ""

                products.append({
                    "title": title,
                    "price": price,
                    "url": url,
                    "image": image,
                    "rating": rating,
                    "source": "Amazon",
                })

            print(f"[Amazon] Extracted {len(products)} products")
            return products

        except Exception as e:
            print(f"[Amazon] Error: {e}")
            return []
