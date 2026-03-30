import useProducts from "../hooks/useProducts";

export default function ProductList() {
  const { products, loading } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-blue-600">
      {products.map((product) => (
        <div key={product.id}>
          <p>Nome do produto:{product.productName}</p>
          <p>Preço:{product.price}</p>
          <p>Categoria:{product.category}</p>
        </div>
      ))}
    </main>
  );
}
