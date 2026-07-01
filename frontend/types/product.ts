export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  image_url?: string;
  source?: string;
  rating?: number;
}