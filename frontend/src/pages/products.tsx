import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/cartContext";
import type { CartItem } from "../contexts/cartContext";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

//import useEmblaCarousel from "embla-carousel-react";
//import { useEmblaAutoPlay } from "../components/ui/autoplay";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  //const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
 // useEmblaAutoPlay(emblaApi, 4000);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts({
          data: {
            name: "",
            colors: [],
            sizes: [],
            price: 0,
            description: "",
            imageUrl: "",
            categoryId: "",
            stock: 0,
          },
        });
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data) {
          setProducts([data]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!product.colors.length || !product.sizes.length) {
      alert("Product must have at least one color and one size");
      return;
    }

    const item: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0],
    };

    addToCart(item);
  };

  return (
    <div className="px-4 py-8">
      <div
        className="overflow-hidden max-w-[90%] mx-auto h-[500px] mb-6 rounded-xl"
        //ref={emblaRef}
      >
        <div className="flex transition-transform duration-1000 ease-in-out">
          {[
            "https://industrieafrica.com/cdn/shop/collections/TB_HERO_A.jpg?v=1741949555&width=2880",
            "https://www.taibobacar.com/media/resort19-header.jpg",
            "https://www.taibobacar.com/media/TB-Bacars-Garden-001.jpg",
            "https://www.taibobacar.com/media/GRG-BLG-TS2-750x750.jpg",
          ].map((img, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center px-2"
            >
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="h-[500px] object-cover rounded-xl shadow-md w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <Link to="/products/all">
          <Button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
            Get all products
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {products.slice(0, 6).map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link to={`/details/${product._id}`}>
              <Card className="bg-stone-100 shadow-md hover:shadow-lg transition-all h-full flex flex-col justify-between cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg text-center">{product.name}</CardTitle>
                  <p className="text-center font-semibold">Price: ${product.price}</p>
                  <CardDescription className="text-sm text-center text-gray-600">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-center items-center">
                  <img
                    src={
                      product.imageUrl
                        ? product.imageUrl
                        : "https://www.taibobacar.com/media/BR-MTS-DR.1-570x570.jpg"
                    }
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-md"
                  />
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full text-sm">
                    <span className="font-medium">Sizes:</span>
                    <span className="text-right">{product.sizes.join(", ")}</span>
                  </div>

                  <div className="flex items-center justify-between w-full text-sm">
                    <span className="font-medium">Colors:</span>
                    <div className="flex gap-2">
                      {product.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border shadow"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.preventDefault(); // Impede que o link ative ao clicar no botão
                      handleAddToCart(product);
                    }}
                    className="mt-3 w-full flex items-center gap-2 justify-center"
                  >
                    <ShoppingCart size={18} /> Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
