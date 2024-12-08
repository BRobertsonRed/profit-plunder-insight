import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, isActive, onClick, children, className = "" }: NavLinkProps) => (
  <Link
    to={to}
    className={`text-white hover:text-accent transition-colors ${
      isActive ? 'border-b-2 border-accent' : ''
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default NavLink;