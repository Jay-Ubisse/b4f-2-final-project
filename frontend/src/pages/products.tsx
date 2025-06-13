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
  <p className="mb-4"></p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
   
    <div className="border p-4 rounded-lg">
      <div><img src="https://www.taibobacar.com/media/GRG-JGP-LP.1-570x570.jpg" alt="" /></div>
      <h2 className="font-semibold"></h2>
      <p></p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="https://www.taibobacar.com/media/TB-SS17-BD01-01.jpg" alt="vestido" /></div>
      <h2 className="font-semibold"></h2>
      <p></p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="https://www.taibobacar.com/media/M2-WHT-05.jpg" alt="Camisa" /></div>
      <h2 className="font-semibold"></h2>
      <p></p>
    </div>

    <div className="border p-4 rounded-lg">
      <div><img src="https://www.taibobacar.com/media/TB-SS17-BD12-01.jpg" alt="vestido" /></div>
      <h2 className="font-semibold"></h2>
      <p></p>
    </div>
  </div>
</section>
  </div>
  );
};