import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

type ProductLocal = {
  id: string;
  name: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
};

const localProducts: ProductLocal[] = [
  {
    id: "1",
    name: "T-Shirt",
    imageUrl: "https://www.taibobacar.com/media/GRG-BLG-TS2-750x750.jpg",
    colors: ["black", "red", "blue", "green"],
    sizes: ["L", "M", "XL", "XXL"],
  },
  {
    id: "2",
    name: "Pants",
    imageUrl: "https://www.taibobacar.com/media/GG-BLP-PT-BG.2-570x570.jpg",
    colors: ["black", "amber", "blue", "green"],
    sizes: ["L", "M", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Hoodie",
    imageUrl: "https://www.taibobacar.com/media/GRG-LBJ-BLK.1-570x570.jpg",
    colors: ["black", "amber", "blue", "green"],
    sizes: ["L", "M", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Dress",
    imageUrl: "https://www.taibobacar.com/media/BR-ICN-DR.1.jpg",
    colors: ["black", "cyan", "blue", "pink"],
    sizes: ["S", "XS", "XL", "XXL"],
  },
];

export const Home = () => {
  const [products] = useState<ProductLocal[]>(localProducts);
  const navigate = useNavigate();

  const autoplay = Autoplay({ delay: 4000 });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  return (
    <>
    
      <div
        className="overflow-hidden max-w-[90%] mx-auto h-[500px] mb-10 rounded-xl"
        ref={emblaRef}
      >
        <div className="flex transition-transform duration-1000 ease-in-out">
          {[
            "https://industrieafrica.com/cdn/shop/collections/TB_HERO_A.jpg?v=1741949555&width=2880",
            "https://www.taibobacar.com/media/resort19-header.jpg",
            "https://www.taibobacar.com/media/TB-Bacars-Garden-001.jpg",
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

     
      <div className="flex justify-end mr-10 mb-4">
        <Button
          onClick={() => navigate("/products")}
          className="bg-stone-200 hover:bg-stone-300 transition"
          variant="outline"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="w-full hover:shadow-xl transition duration-300">
              <CardHeader>
                <CardTitle className="text-center">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
            
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border border-gray-400"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="border border-gray-300 px-2 py-1 rounded text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => console.log("Adicionar ao carrinho:", product)}
                  className="mt-4 bg-black text-white w-full hover:bg-gray-800"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};
