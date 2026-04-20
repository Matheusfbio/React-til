import { useState, useCallback } from "react";
import ProductList from "./features/product/components/ProductList";
import "./App.css";
import HomeHeader from "./features/product/home/components/HomeHeader";

function App() {
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((value: string) => setSearch(value), []);

  return (
    <main className="">
      <HomeHeader search={search} onSearch={handleSearch} />
      <ProductList search={search} />
    </main>
  );
}

export default App;
