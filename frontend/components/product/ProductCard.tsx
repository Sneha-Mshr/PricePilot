import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ShoppingBag, IndianRupee } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <CardContent className="p-5 space-y-4">
        {/* Placeholder Image */}
        <div className="h-40 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          Product Image
        </div>

        <div>
          <h2 className="text-xl font-bold line-clamp-2">
            {product.title}
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {product.brand}
          </p>
        </div>

        <div className="flex items-center text-green-600 font-bold text-lg">
          <IndianRupee className="h-5 w-5 mr-1" />
          {product.price.toLocaleString()}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-muted-foreground">
            <ShoppingBag className="h-4 w-4 mr-1" />
            {product.source}
          </span>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}