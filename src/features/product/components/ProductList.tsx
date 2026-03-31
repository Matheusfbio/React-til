import useFilterProducts from "../hooks/useFilterProducts";
import useProducts from "../hooks/useProducts";

export default function ProductList() {
  const { products, loading } = useProducts();
  const { filterProducts } = useFilterProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-blue-600">
      {products.map((product) => (
        <>
          <div key={product.id}>
            <p>Nome do produto:{product.productName}</p>
            <p>Preço:{product.price}</p>
            <p>Categoria:{product.category}</p>
          </div>
          <br />
        </>
      ))}
      <h2 className="bg-yellow-600">Produtos filtrados por Tech</h2>
      {filterProducts.map((filterProduct) => (
        <>
          <div key={filterProduct.id}>
            <p>Nome do produto:{filterProduct.productName}</p>
            <p>Preço:{filterProduct.price}</p>
            <p>Categoria:{filterProduct.category}</p>
          </div>
        </>
      ))}
    </main>
  );
}
