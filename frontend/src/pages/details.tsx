// pages/Details.tsx
import { useEffect, useState } from "react";
import { getProductsById } from "../services/products";
import type { Product } from "../types/products";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

export const Details = () => {
  const id = "684d633357d8aac2b6df1c9a"; 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const data = await getProductsById(id); 
        if (!data) throw new Error("Produto não encontrado");
        setProduct(data);
      } catch (err) {
        setError((err as Error).message || "Erro ao buscar produto");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-10">Carregando produto...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return null;

  function handleAddToCart() {
    //alert(`Adicionado ${quantity}x ${product.name} ao carrinho!`);
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 99) {
      setQuantity(val);
    }
  }

  return (
    <div className="max-w-md sm:max-w-lg mx-auto p-4">
      <Card className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-1/2 flex justify-center items-center">
          <img
            src={product.imageUrl || "/placeholder-image.png"}
            alt={`Imagem de ${product.name}`}
            className="max-h-48 object-contain rounded-md"
          />
        </div>

        <div className="sm:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-4">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-3 pt-4">
            <span className="text-xl font-bold text-green-600">
              {product.price.toFixed(2)} Mzn
            </span>

            <div className="flex items-center gap-3">
              <label htmlFor="quantity" className="sr-only">Quantidade</label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 border rounded px-2 py-1 text-center"
              />

              <Button onClick={handleAddToCart} variant="outline">
                Adicionar ao carrinho
              </Button>

              <Button>Comprar</Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
