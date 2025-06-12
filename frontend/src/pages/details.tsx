import { Link } from "react-router-dom";
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
import type { Products } from "../services/products";

export const Details = () => {
  //mostrar o artigo selecionado
  const [list, setList] = useState<Products[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductsById({ id: "some-product-id" });
        if (data) setList([data]);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold ">Details Page</h1>
      <p>
        <Link to="/" className="px-2 py-1   text-sm">
          Home
        </Link>
      </p>
      <section className="p-4 rounded shadow-md">
        {list.map((item) => (
          <Card key={item._id} className="mb-4">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>

              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-auto"
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.colors.join(", ")}</p>
              <p>{item.sizes.join(", ")}</p>
              <p>{item.price}</p>
              <CardDescription>{item.description}</CardDescription>
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
        ))}
      </section>
    </div>
  );
};
