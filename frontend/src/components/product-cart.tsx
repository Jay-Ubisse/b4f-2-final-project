import { useState } from "react";
import { useCart } from "../contexts/cartContext";

export interface ProductProps {
  _id?: string;
  name: string;
  price?: number;
  colors?: string[];
  sizes?: string[];
  imageUrl?: string;
}

export const ProductCard = ({ product }: { product: ProductProps }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  const {
    _id,
    name,
    price = 0,
    colors,
    sizes,
    imageUrl,
  } = product;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Por favor, selecione cor e tamanho");
      return;
    }

    const item: any = {
      id: _id || "unknown",
      name,
      material: "275 GSM Jersey White",
      size: selectedSize,
      color: selectedColor,
      originalPrice: price,
      salePrice: price,
      quantity,
      image: imageUrl || "https://picsum.photos/200/300", 
    };

    addToCart(item);
  };

  return (
    <div className="bg-white shadow-md rounded-md border border-gray-200 flex flex-col h-full transition-all">
      {/* Imagem */}
      <div className="flex-shrink-0 w-full h-48 md:h-56 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl || "https://picsum.photos/400/300"} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-gray-600">275 GSM Jersey White</p>
          <p className="mt-2 text-xl font-semibold">${price.toFixed(2)}</p>
        </div>

        <div className="mt-4 space-y-3">
          {/* Cor */}
          <div>
            <p className="font-medium text-sm">Cor</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {colors?.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-3 py-1 rounded-full text-xs ${
                    selectedColor === color ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
              <button className="border px-3 py-1 rounded-full text-xs">+</button>
            </div>
          </div>

          {/* Tamanho */}
          <div>
            <p className="font-medium text-sm">Tamanho</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {sizes?.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 rounded-full text-xs ${
                    selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quantidade + Botão */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="border px-2 py-1 rounded text-sm"
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="border px-2 py-1 rounded text-sm"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white text-sm px-4 py-2 rounded-2xl hover:bg-gray-800 transition"
          >
            Add to cart
          </button>
        </div>

        {/* Promoção */}
        <div className="mt-3 text-center text-green-600 text-xs">
          Buy 3 and get 10% off
        </div>
      </div>
    </div>
  );
};