"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsById } from "../services/products"; // Ajuste aqui, é getProductsById mesmo
import type { Product } from "../types/products";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
<<<<<<< HEAD
import type { Product } from "../types/products";

export const Details = () => {
  //mostrar o artigo selecionado
  const [list, setList] = useState<Product[]>([]);
=======
import { useCart } from "../contexts/cartContext";

export const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

>>>>>>> feature/frontend-cart
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        const data = await getProductsById({ id }); // passar id no objeto conforme seu serviço
        if (data) setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    }
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Carregando produto...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Por favor selecione a cor e o tamanho.");
      return;
    }

   addToCart({
      _id: product._id, // seu id é _id
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      selectedColor,
      selectedSize,
      quantity,
    });
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4">Details Page</h1>
      <Link to="/" className="text-blue-500 underline mb-6">
        ← Voltar para Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-md mt-4"
          />
          <p className="mt-2 text-sm text-gray-500">
            Cores disponíveis: {product.colors?.join(", ") || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            Tamanhos disponíveis: {product.sizes?.join(", ") || "N/A"}
          </p>
          <p className="text-lg font-semibold mt-2">${product.price}</p>
          <CardDescription className="mt-2">{product.description}</CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col gap-4 items-start">
          <div className="flex gap-4 w-full">
            <select
              className="border px-2 py-1 rounded text-sm flex-1"
              value={selectedColor ?? ""}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select color</option>
              {product.colors?.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <select
              className="border px-2 py-1 rounded text-sm flex-1"
              value={selectedSize ?? ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select size</option>
              {product.sizes?.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between w-full items-center">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20"
            />

            <Button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
