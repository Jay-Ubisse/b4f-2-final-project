import { useEffect, useState } from "react";

import { getAllProducts, type ProductProps } from "../services/products";
import { ProductCard } from "../components/product-cart";




export const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setIsloading] = useState(true);

 useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setIsloading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p className="animate-pulse p-4">Caregando Produtos...</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="flex">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};