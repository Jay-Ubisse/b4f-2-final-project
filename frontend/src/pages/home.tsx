import { Button } from "../components/ui/button";
import { login } from "../services/auth";
import { getProduct } from "../services/products";

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
      <h1 className="bg-amber-500">Home Page</h1>
      <Button onClick={handleLogin} variant={"destructive"}>
        Hello
      </Button>
      <Button onClick={handleGetProducts} variant={"destructive"}>
        Get roducts
      </Button>
    </>
  );
};
