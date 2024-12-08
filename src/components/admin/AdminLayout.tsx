import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  AlertTriangle,
  MessageSquare,
  FileText,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === `/admin${path}`;

  const navItems = [
    { path: "", label: "Overview", icon: LayoutDashboard },
    { path: "/companies", label: "Companies", icon: Building2 },
    { path: "/billionaires", label: "Billionaires", icon: Users },
    { path: "/violations", label: "Violations", icon: AlertTriangle },
    { path: "/impact-stories", label: "Impact Stories", icon: MessageSquare },
    { path: "/website-copy", label: "Website Copy", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={`/admin${path}`}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                  isActive(path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;