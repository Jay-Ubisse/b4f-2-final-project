import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsById } from "../services/products";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";

import type { CartItem } from "../contexts/cartContext";
import { useCart } from "../contexts/cartContext";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import type { Product } from "../types/products";


export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      try {
        if (id) {
          const data = await getProductsById(id);
          if (data) {
            setProduct(data);
            setSelectedColor(data.colors[0] || "");
            setSelectedSize(data.sizes[0] || "");
          } else {
            setError("Product not found.");
          }
        } else {
          setError("Invalid product ID.");
        }
      } catch (err) {
        setError("Error fetching product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return null;

  function handleAddToCart() {
    if (!product || !product.colors.length || !product.sizes.length) {
      alert("Product must have at least one color and one size");
      return;
    }

    const item: CartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    };

    addToCart(item);
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
            alt={`Image of ${product.name}`}
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
              <label htmlFor="quantity" className="sr-only">Quantity</label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 border rounded px-2 py-1 text-center"
              />
            </div>

            <div className="flex items-center justify-between w-full text-sm">
              <span className="font-medium">Sizes:</span>
              <select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                className="border rounded px-2 py-1 ml-2"
              >
                {product.sizes.map((size, i) => (
                  <option key={i} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between w-full text-sm">
              <span className="font-medium">Colors:</span>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border shadow ${selectedColor === color ? "ring-2 ring-black" : ""}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-3 w-full flex items-center gap-2 justify-center"
              variant="outline"
            >
              <ShoppingCart size={18} /> Add to cart
            </Button>

            <Button className="w-full">Buy</Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};