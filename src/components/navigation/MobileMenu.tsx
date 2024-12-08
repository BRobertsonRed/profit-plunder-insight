import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  isActive: (path: string) => boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, isActive, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 animate-fade-in">
      <div className="flex flex-col space-y-4">
        {[
          { path: '/companies', label: 'Companies' },
          { path: '/billionaires', label: 'Billionaires' },
          { path: '/trackers', label: 'Trackers' },
          { path: '/about', label: 'About' },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-white hover:text-accent transition-colors ${
              isActive(path) ? 'border-l-2 border-accent pl-2' : ''
            }`}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;