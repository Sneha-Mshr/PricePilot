import { Input } from "@/app/components/ui/input";

export default function SearchBar() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <Input
        placeholder="Search products..."
      />
    </div>
  );
}