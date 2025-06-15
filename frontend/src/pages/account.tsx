import { useEffect, useState } from "react";
import { User,LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import api from "../services/axios-instance";


export const Account = () => {
   const [userData, setUserData] = useState<any | null>(null);

  const getAccountData = async () => {
    try {
      const response = await api.get("/me");
      setUserData(response.data);
      console.log("Dados da conta:", response.data);
    } catch (err) {
      console.error("Erro ao buscar os dados:", err);
     window.location.href = "/login";
    }
  };

  const details = () => {
    window.location.href = "/account/orders"
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
    window.location.href = "/login";
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <main className="bg-gray-200 flex flex-col items-center font-mono ">
      <section className="flex flex-col w-fit flex-1 px-12 py-10">
        <h1 className="text-3xl font-bold mb-8">
          <strong>ACCOUNT</strong>
        </h1>

        <section className="bg-gray-200 p-8 rounded-md text-center">
          <h2 className="text-2xl font-semibold mb-6">
            <strong>ACCOUNT DETAILS</strong>
          </h2>

          {userData ? (
            <>
              <div className="flex flex-col items-start">
                <User className="text-white mr-2" size={20} />
                <p className="mb-4">
                <strong>Name: </strong> {userData.name}
              </p>
              <p className="mb-8">
                <strong>Email: </strong> {userData.email}
              </p>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        <div className="flex justify-center">
          <Button onClick={details}> Order</Button>
          <Button className="ml-4" onClick={handleLogout}>
            
            <LogOut className="text-white mr-2" size={20} />
            Log out
          </Button>
          </div>
        </section>
      </section>
    </main>
  );
};
