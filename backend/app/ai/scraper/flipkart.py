from urllib.parse import quote_plus
from bs4 import BeautifulSoup

from app.ai.scraper.base import BaseScraper


class FlipkartScraper(BaseScraper):

    BASE_URL = "https://www.flipkart.com/search"

    def search(self, query: str):

        try:
            url = f"{self.BASE_URL}?q={quote_plus(query)}"
            print(f"[Flipkart] Searching: {url}")

            html = self.fetch_page(url)
            soup = BeautifulSoup(html, "lxml")

            # Flipkart uses [data-id] for product cards
            cards = soup.select("[data-id]")
            print(f"[Flipkart] Cards found: {len(cards)}")

            products = []
            count = min(len(cards), 8)

            for card in cards[:count]:
                # Title - try multiple known class names
                title = ""
                title_selectors = [
                    ".KzDlHZ", "._4rR01T", ".s1Q9rs",
                    ".WKTcLC", ".RG5Slk", ".wjcEIp",
                ]
                for sel in title_selectors:
                    el = card.select_one(sel)
                    if el:
                        title = el.get_text(strip=True)
                        break

                # Fallback: anchor with title attribute
                if not title:
                    link = card.select_one("a[title]")
                    if link:
                        title = link.get("title", "")

                # Fallback: img alt text
                if not title:
                    img = card.select_one("img[alt]")
                    if img:
                        alt = img.get("alt", "")
                        if len(alt) > 10:
                            title = alt

                if not title:
                    continue

                # Price - look for rupee symbol pattern
                price = ""
                price_selectors = [
                    ".Nx9bqj._4b5DiR", "._30jeq3._1_WHN1",
                    "._30jeq3", ".Nx9bqj", ".hZ3P6w",
                ]
                for sel in price_selectors:
                    el = card.select_one(sel)
                    if el:
                        price = el.get_text(strip=True)
                        price = price.replace("₹", "").replace(",", "").strip()
                        break

                # URL
                link_el = card.select_one("a[href]")
                href = link_el.get("href", "") if link_el else ""
                if href and href.startswith("/"):
                    product_url = f"https://www.flipkart.com{href}"
                elif href and href.startswith("http"):
                    product_url = href
                else:
                    product_url = ""

                # Image
                img_el = card.select_one("img")
                image = img_el.get("src", "") if img_el else ""

                # Rating
                rating = ""
                rating_selectors = [".XQDdHH", "._3LWZlK", ".MKiFS6"]
                for sel in rating_selectors:
                    el = card.select_one(sel)
                    if el:
                        rating_text = el.get_text(strip=True)
                        # Extract just the number
                        try:
                            rating = str(float(rating_text))
                        except ValueError:
                            rating = rating_text.split(" ")[0] if rating_text else ""
                        break

                products.append({
                    "title": title,
                    "price": price,
                    "url": product_url,
                    "image": image,
                    "rating": rating,
                    "source": "Flipkart",
                })

            print(f"[Flipkart] Extracted {len(products)} products")
            return products

        except Exception as e:
            print(f"[Flipkart] Error: {e}")
            return []
