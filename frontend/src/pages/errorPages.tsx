import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="bg-color flex flex-col gap-2 items-center justify-center h-screen text-black">
      <h1 className="font-bold text-2xl  text-black">
        Ops... Parece que você se perdeu.
      </h1>
      <Link to="/" className="px-2 py-1 rounded-md text-sm text-black">
        Voltar para a página inicial
      </Link>
    </div>
  );
};
