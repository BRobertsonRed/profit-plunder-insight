import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  onSearchClick: () => void;
}

const DesktopNav = ({ isActive, onSearchClick }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {[
        { path: '/companies', label: 'Companies' },
        { path: '/billionaires', label: 'Billionaires' },
        { path: '/trackers', label: 'Trackers' },
        { path: '/filter', label: 'Filter' },
        { path: '/about', label: 'About' },
      ].map(({ path, label }) => (
        <NavLink key={path} to={path} isActive={isActive(path)}>
          {label}
        </NavLink>
      ))}
      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchClick}
        className="text-white hover:text-white/80"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DesktopNav;