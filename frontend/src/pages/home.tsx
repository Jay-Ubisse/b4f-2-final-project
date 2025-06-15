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
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import type{ Products } from "../services/products";
=======
import { login } from "../services/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import type { Products } from "../types/products";
import { getProducts } from "../services/products";
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223

// async function handleLogin() {
//   const response = await login({
//     data: {
//       email: "maudana@gmail.com",
//       password: "123456",
//     },
//   });

//   if (response.status === 200) {
//     console.log(response);
//   } else {
//     console.log(response.response.data);
//   }
// }
const viewProducts = () => {
  const Navigate = useNavigate();
  Navigate("/products");
};[]

export const Home = () => {
<<<<<<< HEAD
 const [data, setData] = useState<products[]>([]);
 const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProduct();
        if (data) setData([data]);
=======
 const [data, setData] = useState<Products[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts;
        if (!data) setData([data]);
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
       
        console.log(data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    }
    fetchData();
<<<<<<< HEAD
  }, [id]);

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=1200&h=600&fit=crop&auto=format&q=80",
    alt: "Máquina de costura profissional",
  
  },
  {
    url: "https://images.unsplash.com/photo-1528401635478-4f51cfc89c9d?w=1200&h=600&fit=crop&auto=format&q=80",
    alt: "Tecidos coloridos de capulana",
    
  },
    {
    url: "https://images.unsplash.com/photo-1528401635478-4f51cfc89c9d?w=1200&h=600&fit=crop&auto=format&q=80",
    alt: "Tecidos coloridos de capulana",

  },
 
]
  return (
    <>
      <Carousel>
=======
  }, [data]
);

  return (
    <>
      <Carousel className="w-screen h-155">
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
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
<<<<<<< HEAD
                    src="https://www.houseofblanks.com/cdn/shop/files/HOB-FW24-shopify.png?v=1726606111&width=3840"
=======
                    src="https://www.taibobacar.com/media/resort19-header.jpg"
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
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
<<<<<<< HEAD
                  <img src="https://www.taibobacar.com/media/layerslider/projects/Homepage-Gorongoza/Gorongoza-Collection-1170x782.webp" alt="" />
=======
                  <img src="https://www.taibobacar.com/media/TB-Bacars-Garden-001.jpg" alt="" />
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
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
<<<<<<< HEAD
      <div className="flex gap-5  m-6 justify-center items-center">
=======
      <NavLink to={"/details"}>
        <div className="flex gap-5  m-6 justify-center items-center">
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
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
<<<<<<< HEAD
              <div className="w-5 h-5 border-1 bg-cyan-"></div>
=======
              <div className="w-5 h-5 border-1 bg-cyan-700"></div>
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
              <div className="w-5 h-5 border-1 bg-blue-950"></div>
              <div className="w-5 h-5 border-1 bg-pink-950"></div>

              <div className="w-fit h-fit border-1 ">S</div>
              <div className="w-fit h-fit border-1 ">XS</div>
              <div className="w-fit h-fit border-1">XL</div>
              <div className="w-fit h-fit border-1 ">XXL</div>
            </CardFooter>
          </Card>
       
      </div>
<<<<<<< HEAD
=======
      </NavLink>
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223
    
        
    </>
  );
};
