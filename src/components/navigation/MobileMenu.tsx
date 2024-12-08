import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  isActive: (path: string) => boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, isActive, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-secondary p-4">
      <nav className="flex flex-col space-y-4">
        {[
          { path: '/companies', label: 'Companies' },
          { path: '/billionaires', label: 'Billionaires' },
          { path: '/trackers', label: 'Trackers' },
          { path: '/filter', label: 'Filter' },
          { path: '/about', label: 'About' },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-white hover:text-white/80 ${
              isActive(path) ? 'font-bold' : ''
            }`}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white/80 justify-start px-0"
          onClick={onClose}
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;