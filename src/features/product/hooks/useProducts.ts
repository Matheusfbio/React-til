import { useCallback, useEffect, useState } from "react";
import type { Product } from "../types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("api/products");

      if (!response.ok) {
        throw new Error("Nao foi possivel carregar os produtos.");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      setProducts([]);
      setError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar os produtos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { loading, products, error, refetch: fetchProduct };
};

export default useProducts;
