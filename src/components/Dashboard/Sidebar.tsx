import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Heart,
  Settings,
  LogOut,
  ShieldCheck,
  Users,
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  userRole: 'user' | 'admin';
}

export default function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const userLinks = [
    { name: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Mes annonces', icon: Package, href: '/dashboard/ads' },
    { name: 'Favoris', icon: Heart, href: '/dashboard/favorites' },
    { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Paramètres', icon: Settings, href: '/dashboard/settings' },
  ];

  const adminLinks = [
    { name: 'Vue d\'ensemble', icon: LayoutDashboard, href: '/admin' },
    { name: 'Utilisateurs', icon: Users, href: '/admin/users' },
    { name: 'Modération', icon: AlertCircle, href: '/admin/moderation' },
    { name: 'Paramètres', icon: Settings, href: '/admin/settings' },
  ];

  const links = userRole === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          {userRole === 'admin' ? (
            <ShieldCheck className="text-red-600" size={24} />
          ) : (
            <User className="text-red-600" size={24} />
          )}
          <span className="font-semibold">
            {userRole === 'admin' ? 'Admin Panel' : 'Mon Compte'}
          </span>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg",
                "transition-colors",
                location.pathname === link.href
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          ))}
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg mt-8"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </nav>
      </div>
    </div>
  );
}