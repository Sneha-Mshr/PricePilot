import time
import random
import requests


# Pool of user agents to rotate through
USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
]


class BaseScraper:
    """Base scraper using HTTP requests with retry and rotating user-agents."""

    TIMEOUT = 15
    MAX_RETRIES = 2

    def _get_headers(self) -> dict:
        """Get headers with a random user agent."""
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-IN,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Cache-Control": "no-cache",
        }

    def fetch_page(self, url: str) -> str:
        """Fetch a page with retry logic and rotating user-agents."""
        last_error = None

        for attempt in range(self.MAX_RETRIES + 1):
            try:
                response = requests.get(
                    url,
                    headers=self._get_headers(),
                    timeout=self.TIMEOUT,
                )
                response.raise_for_status()
                return response.text

            except requests.exceptions.HTTPError as e:
                last_error = e
                status = e.response.status_code if e.response else 0

                # Retry on 403 (blocked) or 429 (rate limited)
                if status in (403, 429) and attempt < self.MAX_RETRIES:
                    wait = (attempt + 1) * 2 + random.uniform(0, 1)
                    print(f"[BaseScraper] {status} on attempt {attempt + 1}, retrying in {wait:.1f}s...")
                    time.sleep(wait)
                    continue
                raise

            except requests.exceptions.RequestException as e:
                last_error = e
                if attempt < self.MAX_RETRIES:
                    time.sleep(1)
                    continue
                raise

        raise last_error  # type: ignore
