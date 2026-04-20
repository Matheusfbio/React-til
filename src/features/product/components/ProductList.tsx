import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

interface Props {
  search: string;
}

export default function ProductList({ search }: Props) {
  const { products, loading } = useProducts();

  if (loading) return <div>Loading...</div>;

  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Todos os Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
