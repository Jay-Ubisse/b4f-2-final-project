import { Cardsidebar } from "../components/cart/sidebar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";


export const Products = () => {
  return (
  <div>
     <div className="flex justify-center pl-25 ">
    <Cardsidebar/>
    </div>
    <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup >
      <CommandItem>Camisetas</CommandItem>
      <CommandItem>Blusas</CommandItem>
      <CommandItem>Calças</CommandItem>
      <CommandItem>Vestidos</CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>

<section>
  <h1 className="flex justify-center text-2xl font-bold mb-4">Produtos</h1>
  <p className="mb-4">Aqui você pode ver todos os produtos disponíveis.</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
   
    <div className="border p-4 rounded-lg">
      <div><img src="/img/1.jpg" alt="" /></div>
      <h2 className="font-semibold">{Products.name}</h2>
      <p>Descrição do produto 1.</p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="/img/2.jpg" alt="Camisa" /></div>
      <h2 className="font-semibold">Produto 2</h2>
      <p>Descrição do produto 2.</p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="/img/3.jpg" alt="Camisa" /></div>
      <h2 className="font-semibold">Produto 3</h2>
      <p>Descrição do produto 3.</p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="/img/4.jpg" alt="Camisa" /></div>
      <h2 className="font-semibold">Produto 4</h2>
      <p>Descrição do produto 4.</p>
    </div>
  </div>
</section>
  </div>
  );
};