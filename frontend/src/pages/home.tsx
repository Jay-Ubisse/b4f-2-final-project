import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart } from "../components/ui/myDialog" 
import { error } from "console";
import { Card } from "../components/ui/card";

interface productsProps {
  name:String,
        colors:String[];
        sizes:String[];
        price:number;
        description:String;
        imageUrl:String;
        category: number;
        categoryId:number;
        stock:number;
}

export const Home = () => {
  const [product, setProduct] = useState<productsProps[]>([])

  useEffect(() => {
    axios.get<productsProps[]>("http://localhost:3000/products")
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error:", error));
      console.log(error)
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Loja Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="w-full h-48 bg-pink-400 rounded mb-4"></div>
            <h3 className="font-medium mb-2">Heavyweight T-Shirt</h3>
            <p className="text-gray-600 text-sm mb-2">275 GSM Jersey</p>
            <p className="font-bold">$36</p>
          </div>
          <>
            {product?.map((product) => 
              <Card key={product.categoryId}>
                <h2>{product.name}</h2>
                <div>{product.imageUrl}</div>
                <p>{product.price}</p>
              </Card>
            )}
          
          </>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="w-full h-48 bg-blue-400 rounded mb-4"></div>
            <h3 className="font-medium mb-2">Cotton Hoodie</h3>
            <p className="text-gray-600 text-sm mb-2">Premium Cotton</p>
            <p className="font-bold">$65</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="w-full h-48 bg-green-400 rounded mb-4"></div>
            <h3 className="font-medium mb-2">Denim Jacket</h3>
            <p className="text-gray-600 text-sm mb-2">100% Cotton Denim</p>
            <p className="font-bold">$89</p>
          </div>
        </div>
      </div>
      <ShoppingCart />
    </div>
  )
}
