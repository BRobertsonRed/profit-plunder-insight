import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNav from "./navigation/DesktopNav";
import MobileMenu from "./navigation/MobileMenu";
import SearchDialog from "./search/SearchDialog";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-secondary py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-white font-display text-2xl">
            Profit & Plunder
          </Link>

          <DesktopNav 
            isActive={isActive} 
            onSearchClick={() => setIsSearchOpen(true)} 
          />

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileMenu 
          isOpen={isOpen} 
          isActive={isActive} 
          onClose={() => setIsOpen(false)} 
        />
      </div>

      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;