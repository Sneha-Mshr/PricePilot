import threading
import time
from typing import Any, Optional, Tuple


class TTLCache:
    """
    Small thread-safe TTL cache for search results.

    Scraping three stores takes seconds and repeated hits get us rate-limited,
    so identical queries are served from memory for `ttl_seconds`.

    Expired entries are kept around rather than dropped: when a later scrape
    comes back empty because the stores blocked us, stale results are a much
    better answer than nothing. Use `get_stale` for that path.
    """

    def __init__(self, ttl_seconds: int = 900, max_entries: int = 200):
        self.ttl = ttl_seconds
        self.max_entries = max_entries
        self._store: dict[str, Tuple[float, Any]] = {}
        self._lock = threading.Lock()

    def get(self, key: str) -> Optional[Any]:
        """Return the value only while it is still fresh."""
        with self._lock:
            entry = self._store.get(key)
            if not entry:
                return None

            stored_at, value = entry
            if time.time() - stored_at > self.ttl:
                return None

            return value

    def get_stale(self, key: str) -> Optional[Any]:
        """Return the value regardless of age."""
        with self._lock:
            entry = self._store.get(key)
            return entry[1] if entry else None

    def set(self, key: str, value: Any) -> None:
        with self._lock:
            if len(self._store) >= self.max_entries and key not in self._store:
                # Evict the oldest entry.
                oldest = min(self._store, key=lambda k: self._store[k][0])
                del self._store[oldest]

            self._store[key] = (time.time(), value)


search_cache = TTLCache(ttl_seconds=900)
