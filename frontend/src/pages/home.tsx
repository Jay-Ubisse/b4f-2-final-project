import { Button } from "../components/ui/button";
import { login } from "../services/auth";
//import { getProduct } from "../services/products";

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
    </>
  );
};
