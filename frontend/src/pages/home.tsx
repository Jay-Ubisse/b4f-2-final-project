import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  
} from "../components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "../components/ui/card";
import { Button } from "../components/ui/button";
//import { login } from "../services/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import type { Product } from "../types/products";
import { getProducts } from "../services/products";

const viewProducts = () => {
  const Navigate = useNavigate();
  Navigate("/products");
};[]

export const Home = () => {
 const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts;
        if (!data) setData([data]);
       
        console.log(data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    }
    fetchData();
  }, [data]
);

  return (
    <>
      <Carousel className="w-screen h-155">
        <CarouselContent>
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <CardContent className=" items-center justify-center transition delay-150 duration-300 ease-in-out">
                <img
                  className="h-155 w-full"
                  src="https://industrieafrica.com/cdn/shop/collections/TB_HERO_A.jpg?v=1741949555&width=2880"
                  alt=""
                />
              </CardContent>
            </CarouselItem>
          ))}
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <CardContent className=" items-center justify-center">
                  <img 
                    className=""
                    src="https://www.taibobacar.com/media/resort19-header.jpg"
                    alt=""
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <CardContent className=" items-center justify-center ">
                  <img alt="" />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
           {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <CardContent className=" items-center justify-center ">
                  <img src="https://www.taibobacar.com/media/TB-Bacars-Garden-001.jpg" alt="" />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      
      </Carousel>

      <NavLink to={"/products"} className="flex justify-end mr-20 mt-10 ">
        <Button
          onClick={viewProducts}
          className="bg-stone-200"
          variant="outline"
        >
          View All
        </Button>
      </NavLink>
      <NavLink to={"/details"}>
        <div className="flex gap-5  m-6 justify-center items-center">
          <Card className="w-100 h-100">
            <CardHeader>
              <CardTitle className="text-center">T-Shirt</CardTitle>
            </CardHeader>
              <CardDescription></CardDescription>

            <CardContent>
              <img src= "https://www.taibobacar.com/media/GRG-BLG-TS2-750x750.jpg"alt="" />
            </CardContent>

            <CardFooter className="gap-3 flex justify-start -mt-4">
              <div className="w-5 h-5 border-1 bg-black"></div>
              <div className="w-5 h-5 border-1 bg-amber-800"></div>
              <div className="w-5 h-5 border-1 bg-blue-950"></div>
              <div className="w-5 h-5 border-1 bg-green-950"></div>

              <div className="w-fit h-fit border-1 ">L</div>
              <div className="w-fit h-fit border-1 ">M</div>
              <div className="w-fit h-fit border-1">XL</div>
              <div className="w-fit h-fit border-1 ">XXL</div>
            </CardFooter>
          </Card>
          <Card className="w-100 h-100">
            <CardHeader>
              <CardTitle className="text-center">Pants</CardTitle>
            </CardHeader>
              <CardDescription></CardDescription>

            <CardContent>
              <img src= "https://www.taibobacar.com/media/GG-BLP-PT-BG.2-570x570.jpg"alt="" />
            </CardContent>

            <CardFooter className="gap-3 flex justify-start -mt-4">
              <div className="w-5 h-5 border-1 bg-black"></div>
              <div className="w-5 h-5 border-1 bg-amber-800"></div>
              <div className="w-5 h-5 border-1 bg-blue-950"></div>
              <div className="w-5 h-5 border-1 bg-green-950"></div>

              <div className="w-fit h-fit border-1 ">L</div>
              <div className="w-fit h-fit border-1 ">M</div>
              <div className="w-fit h-fit border-1">XL</div>
              <div className="w-fit h-fit border-1 ">XXL</div>
            </CardFooter>
          </Card>
          <Card className="w-100 h-100">
            <CardHeader>
              <CardTitle className="text-center">Hoodie</CardTitle>
            </CardHeader>
              <CardDescription></CardDescription>

            <CardContent>
              <img src= "https://www.taibobacar.com/media/GRG-LBJ-BLK.1-570x570.jpg"alt="" />
            </CardContent>

            <CardFooter className="gap-3 flex justify-start -mt-4">
              <div className="w-5 h-5 border-1 bg-black"></div>
              <div className="w-5 h-5 border-1 bg-amber-800"></div>
              <div className="w-5 h-5 border-1 bg-blue-950"></div>
              <div className="w-5 h-5 border-1 bg-green-950"></div>

              <div className="w-fit h-fit border-1 ">L</div>
              <div className="w-fit h-fit border-1 ">M</div>
              <div className="w-fit h-fit border-1">XL</div>
              <div className="w-fit h-fit border-1 ">XXL</div>
            </CardFooter>
          </Card>
          <Card className="w-100 h-100">
            <CardHeader>
              <CardTitle className="text-center">Dress</CardTitle>
            </CardHeader>
              <CardDescription></CardDescription>

            <CardContent>
              <img src= "https://www.taibobacar.com/media/BR-ICN-DR.1.jpg"alt="" />
            </CardContent>

            <CardFooter className="gap-3 flex justify-start -mt-4">
              <div className="w-5 h-5 border-1 bg-black"></div>
              <div className="w-5 h-5 border-1 bg-cyan-700"></div>
              <div className="w-5 h-5 border-1 bg-blue-950"></div>
              <div className="w-5 h-5 border-1 bg-pink-950"></div>

              <div className="w-fit h-fit border-1 ">S</div>
              <div className="w-fit h-fit border-1 ">XS</div>
              <div className="w-fit h-fit border-1">XL</div>
              <div className="w-fit h-fit border-1 ">XXL</div>
            </CardFooter>
          </Card>
       
      </div>
      </NavLink>
    
        
    </>
  );
};
