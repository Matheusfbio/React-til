import { useEffect, useState } from "react";
import type { Product } from "../types";

const useFilterProducts = () => {
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFilterProducts = async () => {
      try {
        const response = await fetch("api/products");
        const data: Product[] = await response.json();
        const filterByTech = data.filter(
          (product) => product.category === "tech",
        );
        setFilterProducts(filterByTech);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilterProducts();
  }, []);
  return { filterProducts };
};

export default useFilterProducts;
