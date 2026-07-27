import requests


class BaseScraper:
    """Base scraper using HTTP requests instead of browser automation."""

    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-IN,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
    }

    TIMEOUT = 15

    def fetch_page(self, url: str) -> str:
        """Fetch a page and return the HTML content."""
        response = requests.get(
            url,
            headers=self.HEADERS,
            timeout=self.TIMEOUT,
        )
        response.raise_for_status()
        return response.text
