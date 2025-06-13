
export const Home = () => {
  return <div>Home Page</div>;
import { login } from "../services/auth";
import { getProduct } from "../services/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
async function handleLogin() {
  const response = await login({
    data: {
      email: "maudana@gmail.com",
      password: "123456",
    },
  });

  if (response.status === 200) {
    console.log(response);
  } else {
    console.log(response.response.data);
  }
}

async function handleGetProducts() {
  const response = await getProduct({ id: "6848315ee273205a2300ef50" });
}
export const Home = () => {
  return (
    <>
 <div>
  <Carousel>
  <CarouselContent>
    <CarouselItem><img src="https://www.taibobacar.com/media/GRG-BLG-TS2-750x750.jpg" alt="" /></CarouselItem>
    <CarouselItem></CarouselItem>
    <CarouselItem></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
 </div>
    </>
  );
};
