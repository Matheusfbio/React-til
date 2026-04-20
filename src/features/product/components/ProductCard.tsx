import type { Product } from "../types";

export default function ProductCard({ productName, price, category }: Product) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
      <span className="text-sm text-gray-500">{category}</span>
      <span className="text-green-600 font-bold">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
    </div>
  );
}
