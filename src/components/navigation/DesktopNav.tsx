import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import NavLink from "./NavLink";

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  onSearchClick: () => void;
}

const DesktopNav = ({ isActive, onSearchClick }: DesktopNavProps) => (
  <div className="hidden md:flex items-center space-x-8">
    {[
      { path: '/companies', label: 'Companies' },
      { path: '/billionaires', label: 'Billionaires' },
      { path: '/trackers', label: 'Trackers' },
      { path: '/about', label: 'About' },
    ].map(({ path, label }) => (
      <NavLink key={path} to={path} isActive={isActive(path)}>
        {label}
      </NavLink>
    ))}
    <button 
      className="text-white hover:text-accent transition-colors"
      onClick={onSearchClick}
    >
      <Search size={20} />
    </button>
  </div>
);

export default DesktopNav;