import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsById } from "../services/products";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import type { Products } from "../types/products";

export const Details = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState<Products | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!_id) return;
      try {
        const data = await getProductsById({ _id });
        if (data) setProduct(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    }
    fetchData();
  }, [_id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Details Page</h1>
        <p>Carregando produto...</p>
        <Link to="/" className="px-2 py-1 text-sm">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold ">Details Page</h1>
      <p>
        <Link to="/" className="px-2 py-1   text-sm">
          Home
        </Link>
      </p>
      <section className="p-4 rounded shadow-md">
        <Card key={product._id} className="mb-4">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto"
            />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.colors.join(", ")}</p>
            <p>{product.sizes.join(", ")}</p>
            <p>{product.price}</p>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Add to Cart
            </Button>
            <Input
              type="number"
              min="1"
              defaultValue="1"
              className="w-16 border border-gray-300 rounded-md"
            />
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};