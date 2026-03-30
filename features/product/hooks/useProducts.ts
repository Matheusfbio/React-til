import { useEffect, useState } from "react";
import type { Product } from "../types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return { products, loading };
};

export default useProducts;

// const useProducts = () => {
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true)
//       try {
//         const response = await fetch('/api/products')
//         const data = await response.json()
//         setProducts(data)
//       } catch (error) {
//         console.error('Error fetching products:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   return { products, loading }
// }

// export default useProducts
