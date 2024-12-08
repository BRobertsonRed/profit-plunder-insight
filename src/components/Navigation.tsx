import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-secondary py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-display text-2xl">
            Profit & Plunder
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/companies" className="text-white hover:text-accent transition-colors">
              Companies
            </Link>
            <Link to="/billionaires" className="text-white hover:text-accent transition-colors">
              Billionaires
            </Link>
            <Link to="/trackers" className="text-white hover:text-accent transition-colors">
              Trackers
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
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/billionaires"
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Billionaires
              </Link>
              <Link
                to="/trackers"
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Trackers
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;