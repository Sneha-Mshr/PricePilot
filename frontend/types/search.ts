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
}
