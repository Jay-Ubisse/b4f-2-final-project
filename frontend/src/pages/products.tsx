import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import { getProducts } from "../services/products";

import {
   ShoppingCart
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {useNavigate } from "react-router-dom";
export const Products = () => {
  const  viewDetails=()=>{
let Navigate=useNavigate();
Navigate("/products");
  }
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      try {
      } catch (error) {}
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
    }
    fetchProducts();
  });


  useEffect(() => {
  
  fetch("/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
    const filterdProduct = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  
  return (
     
    <div>    
       <div className="flex gap-4">
        <Command className="w-50 ">
      <CommandInput
      placeholder="Type a product"
      value={search}
      onValueChange={setSearch}
      />
      <CommandList>
        <CommandGroup>
          {filterdProduct?.map((product,index) =>(
            <CommandItem key={index}>{product.name} </CommandItem>
          ))}    
        </CommandGroup>
        <CommandSeparator/>
      </CommandList>
      </Command>
    
        <Button className="bg-stone-700 ">Get Product</Button> 
 
       </div>
       <button onClick={viewDetails}>
      <section className="flex flex-wrap gap-8 space-around items center ml-15 mt-5">
        {products?.slice(1, 7).map((product, index) => (
          <Card 
            key={index}
            className="w-96 bg-stone-200 shadow-md hover:shadow-lg  h-100w-100 font-bold inline"
          >
            <CardHeader>
              <CardTitle className="text-center">{product.name}</CardTitle>
              <p>Price: {product.price}</p>
              <CardDescription className="text-mono">
                {product.description}
              </CardDescription>
              <CardAction> <ShoppingCart /></CardAction>
            </CardHeader>
            <CardContent>
              <img
                src={
                  product.imageUrl
                    ? product.imageUrl
                    : "https://www.taibobacar.com/media/BR-MTS-DR.1-570x570.jpg"
                }
                alt=""
              />
            </CardContent>
            <CardFooter className="space-around ">
              <div >
              
                <p className="mr-2">Sizes: {product.sizes.join(" ")}</p>
              </div>
              <div className="gap-4 flex justify-start mt-4">
               <div className="w-5 h-5 border-1 bg-black"></div>
            <div className="w-5 h-5 border-1 bg-amber-800"></div>
            <div className="w-5 h-5 border-1 bg-blue-950"></div>
                <p>{product.colors.join(" ")}</p>
              </div>
             
            </CardFooter>
          </Card>
        ))}
      </section>
      </button>
    </div>
  );
};
