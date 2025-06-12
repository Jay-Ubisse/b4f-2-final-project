import { Link } from "react-router-dom";

// export const ErrorPage = () => {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="bg-gray-500 flex flex-col gap-2 items-center justify-center h-2/3 w-2/3 text-black">
//         <h1 className="font-bold text-2xl  text-black">
//           Ops... Parece que você se perdeu.
//         </h1>
//         <Link to="/" className="px-2 py-1 rounded-md text-sm text-black">
//           Voltar para a página inicial
//         </Link>
//       </div>
//     </div>
//   );
// };

export const ErrorPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-gray-500 flex flex-col gap-2 items-center justify-center h-2/3 w-2/3 text-black">
        <h1 className="font-bold text-2xl text-black">
          Ops... Parece que você se perdeu.
        </h1>
        <Link to="/" className="px-2 py-1 rounded-md text-sm text-black">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};