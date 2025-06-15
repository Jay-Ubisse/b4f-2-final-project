"use client";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "./ui/button";
import { Cart } from "./shoppingcart";
import { useCart } from "../contexts/cartContext";
import { getProducts } from "../services/products";
import type { Product } from "../types/products";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isOpen, setIsOpen } = useCart();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const linksLeft = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const result = await getProducts({ data: {} });

        if (Array.isArray(result)) {
          const filtered = result.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [search]);

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6 md:px-6">
        <nav className="hidden md:flex gap-8 text-sm">
          {linksLeft.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="text-lg font-bold tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
          <NavLink to="/">B4F E-COMMERCE</NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="text-sm font-normal"
          >
            Search
          </Button>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `transition hover:opacity-60 ${isActive ? "font-semibold" : ""}`
            }
          >
            Account
          </NavLink>

          <button onClick={() => setIsOpen(true)} className="transition hover:opacity-60">
            Cart
          </button>
        </nav>

        <div className="md:hidden w-full flex items-center justify-between text-base">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <button>
              <Search size={20} />
            </button>
            <button onClick={() => setIsOpen(true)}>
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {showSearchBar && (
        <div className="w-full bg-white shadow-md border-b px-4 md:px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <Command className="w-full">
              <CommandInput
                placeholder="Search product..."
                value={search}
                onValueChange={setSearch}
              />
              {search.length >= 2 && (
                <CommandList>
                  <CommandGroup heading="Results">
                    {suggestions.length > 0 ? (
                      suggestions.map((product, index) => (
                        <CommandItem key={index}>
                          {product.name}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandItem disabled>No product found</CommandItem>
                    )}
                  </CommandGroup>
                  <CommandSeparator />
                </CommandList>
              )}
            </Command>
          </div>
        </div>
      )}

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/90 text-white px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setIsMobileOpen(false)}>
              <X size={28} />
            </button>
            <span className="uppercase font-bold tracking-wider">B4F ECOMMERCE</span>
            <div className="flex gap-3">
              <Search size={20} />
              <ShoppingCart size={20} />
            </div>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-mono">
            {[...linksLeft, { label: "Account", href: "/account" }].map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="hover:opacity-70"
              >
                {link.label}
              </NavLink>
            ))}
            <span
              onClick={() => {
                setIsMobileOpen(false);
                setIsOpen(true);
              }}
              className="cursor-pointer hover:opacity-70"
            >
              Cart
            </span>
          </nav>
        </div>
      )}

      {/* Cart overlay */}
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
