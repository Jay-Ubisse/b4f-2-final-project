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
      <CommandItem>Saia</CommandItem>
      <CommandItem>Casacos</CommandItem>
      <CommandItem>Calçados</CommandItem>
      <CommandItem>Roupas íntimas</CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>
  </div>
  
  );
};