import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-secondary py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-white font-display text-2xl">
            Profit & Plunder
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/companies" 
              className={`text-white hover:text-accent transition-colors ${isActive('/companies') ? 'border-b-2 border-accent' : ''}`}
            >
              Companies
            </Link>
            <Link 
              to="/billionaires" 
              className={`text-white hover:text-accent transition-colors ${isActive('/billionaires') ? 'border-b-2 border-accent' : ''}`}
            >
              Billionaires
            </Link>
            <Link 
              to="/trackers" 
              className={`text-white hover:text-accent transition-colors ${isActive('/trackers') ? 'border-b-2 border-accent' : ''}`}
            >
              Trackers
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-accent transition-colors ${isActive('/about') ? 'border-b-2 border-accent' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-white hover:text-accent transition-colors ${isActive('/contact') ? 'border-b-2 border-accent' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/privacy" 
              className={`text-white hover:text-accent transition-colors ${isActive('/privacy') ? 'border-b-2 border-accent' : ''}`}
            >
              Privacy
            </Link>
            <button className="text-white hover:text-accent transition-colors">
              <Search size={20} />
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/companies"
                className={`text-white hover:text-accent transition-colors ${isActive('/companies') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/billionaires"
                className={`text-white hover:text-accent transition-colors ${isActive('/billionaires') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Billionaires
              </Link>
              <Link
                to="/trackers"
                className={`text-white hover:text-accent transition-colors ${isActive('/trackers') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Trackers
              </Link>
              <Link
                to="/about"
                className={`text-white hover:text-accent transition-colors ${isActive('/about') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-white hover:text-accent transition-colors ${isActive('/contact') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className={`text-white hover:text-accent transition-colors ${isActive('/privacy') ? 'border-l-2 border-accent pl-2' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Privacy
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;