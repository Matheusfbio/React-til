import { useMemo } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props {
  search: string;
  selectedCategory: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function ProductList({ search, selectedCategory, products, loading, error, refetch }: Props) {

  const normalizedSearch = search.toLowerCase().trim();
  const normalizedCategory = selectedCategory.toLowerCase().trim();

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.productName
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesCategory =
          !normalizedCategory ||
          product.category.toLowerCase() === normalizedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, normalizedSearch, normalizedCategory],
  );

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <main className="p-4">
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Erro ao carregar produtos</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded bg-red-700 px-3 py-2 text-sm font-medium text-white"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Todos os Produtos</h2>
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">
            Nenhum produto encontrado para os filtros selecionados.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
