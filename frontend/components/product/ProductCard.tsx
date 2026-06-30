import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard() {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <h2 className="text-xl font-bold">
          iPhone 16
        </h2>

        <p className="text-lg text-green-600">
          ₹89,999
        </p>

        <p className="text-gray-500">
          Amazon • Flipkart
        </p>
      </CardContent>
    </Card>
  );
}