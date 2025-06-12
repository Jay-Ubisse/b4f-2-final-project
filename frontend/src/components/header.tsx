import { useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const linksLeft = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ];

  const linksRight = [
    { label: "Account", href: "/shop" },
    { label: "Cart", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <nav className="hidden md:flex gap-8 text-sm">
          {linksLeft.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:opacity-60 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-lg font-semibold tracking-wider uppercase absolute left-1/2 -translate-x-1/2">
          <a href="/" target="_blank">
            B4F ECOMMERCE
          </a>
        </div>

        <nav className="hidden md:flex gap-8 text-sm ml-auto">
          <button
            onClick={() => console.log("Search clicked")}
            className="hover:opacity-60 transition"
          >
            Search
          </button>
          {linksRight.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:opacity-60 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="md:hidden w-full flex items-center justify-between px-4 text-lg font-mono">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
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
        <div className="fixed inset-0 z-50 bg-black/90 text-white px-6 py-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button onClick={() => setIsMobileOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="text-sm font-semibold tracking-wider uppercase">
              B4F-ECOMMERCE
            </div>
            <div className="flex gap-4">
              <button>
                <Search size={20} />
              </button>
              <button>
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-5 text-lg font-mono">
            {[...linksLeft, ...linksRight].map((link) => (
              <a key={link.label} href={link.href} className="hover:opacity-70">
                {link.label}
              </a>
            ))}
          </nav>
          <hr className="my-6 border-white/40" />
        </div>
      )}
    </header>
  );
}
