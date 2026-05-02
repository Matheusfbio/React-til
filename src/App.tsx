import { useState, useCallback, useMemo } from "react";
import ProductList from "./features/product/components/ProductList";
import "./App.css";
import HomeHeader from "./features/product/home/components/HomeHeader";
import { useProducts } from "./features/product";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleSearch = useCallback((value: string) => setSearch(value), []);
  const { products, loading, error, refetch } = useProducts();

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return [
      { label: "Todas", value: "" },
      ...unique.map((c) => ({ label: c.charAt(0).toUpperCase() + c.slice(1), value: c })),
    ];
  }, [products]);

  return (
    <main className="">
      <HomeHeader
        search={search}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategory={setSelectedCategory}
        categories={categories}
      />
      <ProductList
        search={search}
        selectedCategory={selectedCategory}
        products={products}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </main>
  );
}

export default App;
