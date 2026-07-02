from urllib.parse import quote_plus

from app.ai.scraper.base import BaseScraper
from app.ai.parser.amazon_parser import AmazonParser


class AmazonScraper(BaseScraper):

    BASE_URL = "https://www.amazon.in/s"

    def search(self, query: str):

        playwright = None
        browser = None

        try:

            playwright, browser, page = self.launch_browser()

            url = f"{self.BASE_URL}?k={quote_plus(query)}"

            print(url)

            page.goto(url)

            page.wait_for_timeout(5000)

            parser = AmazonParser()

            products = parser.parse(page)
            print(f"Extracted {len(products)} products")
            print(products)

            print(products)

            return products

        finally:

            if browser:
                browser.close()

            if playwright:
                playwright.stop()