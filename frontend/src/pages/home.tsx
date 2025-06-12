import { Button } from "../components/ui/button";
import { login } from "../services/auth";
<<<<<<< HEAD
import { getProduct } from "../services/products";
import { Footer } from "../components/footer";  
=======
//import { getProduct } from "../services/products";

>>>>>>> 127362a307d61927854599732e8aded1c7003689
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

export const Home = () => {
  return (
    <>
      <h1 className="bg-amber-500">Home Page</h1>
      <Button onClick={handleLogin} variant={"destructive"}>
        Hello
      </Button>
<<<<<<< HEAD
      <Button onClick={handleGetProducts} variant={"destructive"}>
        Get roducts
      </Button>




=======
>>>>>>> 127362a307d61927854599732e8aded1c7003689
    </>
  );
};
