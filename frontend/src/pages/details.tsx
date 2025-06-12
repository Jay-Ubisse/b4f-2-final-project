import { Link } from "react-router-dom";

export const Details = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-700">
      <h1 className="text-4xl font-bold ">Details Page</h1>
      <p>
        <Link to="/" className="px-2 py-1 bg-white  rounded-md text-sm">
          Home
        </Link>
        /
        <Link to="/" className="px-2 py-1 bg-white  rounded-md text-sm">
          colocar nome do produto pegar na base de dados
        </Link>
      </p>
      <section></section>

      <p className="text-lg">This is the details page.</p>
    </div>
  );
};
