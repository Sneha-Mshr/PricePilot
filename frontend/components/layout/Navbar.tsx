export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          PricePilot
        </h1>

        <div className="text-gray-500">
          AI Price Comparison
        </div>
      </div>
    </nav>
  );
}