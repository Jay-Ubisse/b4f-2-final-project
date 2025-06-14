import { useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";


export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const linksLeft = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ];

  const linksRight = [
    { label: "Account", href: "/account" },
    { label: "Cart", href: "/cart" },
  ];

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
          <NavLink to="/">B4F ECOMMERCE</NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("Search clicked")}
            className="text-sm font-normal"
          >
            Search
          </Button>
          {linksRight.map((link) => (
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
            <button>
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/90 text-white px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setIsMobileOpen(false)}>
              <X size={28} />
            </button>
            <span className="uppercase font-bold tracking-wider">
              B4F ECOMMERCE
            </span>
            <div className="flex gap-3">
              <Search size={20} />
              <ShoppingCart size={20} />
            </div>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-mono">
            {[...linksLeft, ...linksRight].map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="hover:opacity-70"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}