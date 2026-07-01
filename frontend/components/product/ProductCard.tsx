import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <h2 className="text-xl font-bold">
          {product.title}
        </h2>

        <p className="text-lg text-green-600">
          {product.currency} {product.price.toLocaleString()}
        </p>

        <p className="text-gray-500">
          {product.brand} • {product.source}
        </p>

        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Product
        </a>
      </CardContent>
    </Card>
  );
}