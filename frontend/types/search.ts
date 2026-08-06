export interface ProductResult {
  title: string;
  price: string;
  url: string;
  currency: string;
  source: string;
  image: string | null;
  rating: string | null;
}

export interface SourceResult {
  source: string;
  products: ProductResult[];
  count: number;
  error: string | null;
}

export interface SearchResponse {
  query: string;
  total: number;
  sources: SourceResult[];
  products: ProductResult[];
  /** Results were served from the backend cache rather than a live scrape. */
  cached?: boolean;
  /** Cached results are past their TTL — the live scrape came back empty. */
  stale?: boolean;
  /** Message to surface to the user, e.g. stores rate-limiting us. */
  notice?: string | null;
}
