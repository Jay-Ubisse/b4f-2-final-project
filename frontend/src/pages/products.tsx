import { useEffect, useState } from "react";
import { Cardsidebar } from "../components/cart/sidebar";
import {
  Command,
  //CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";

export const Products = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/category/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const filtered = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-end">
      
      <Command className="w-105 ">
      <CommandInput
      placeholder="Digite uma categoria"
      value={search}
      onValueChange={setSearch}
      />
      <CommandList>
        
        <CommandGroup>
          {filtered.map((Cat: { _id: string; name: string }) =>(
            <CommandItem key={Cat._id}>{Cat.name} </CommandItem>
          ))}
          
        </CommandGroup>
        <CommandSeparator/>
      </CommandList>
      </Command>
        <div >
        <Cardsidebar/>
       </div>
       <div>
        
<section>
  <h1 className="flex justify-center text-2xl font-bold mb-4">Shop on our E-Commerce</h1>
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
    </div>
  );
}





















  