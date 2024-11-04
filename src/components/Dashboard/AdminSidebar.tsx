import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Settings,
  Database,
  Server,
  Bell,
  Mail,
  UserPlus,
  BookOpen,
  CreditCard,
  Briefcase,
  LogOut,
  MessageSquare,
  Package,
  BarChart,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const menuItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Vue d\'ensemble', icon: LayoutDashboard, href: '/admin', badge: null },
      { name: 'Utilisateurs', icon: Users, href: '/admin/users', badge: '1.2k' },
      { name: 'Modération', icon: AlertTriangle, href: '/admin/moderation', badge: '12' },
      { name: 'Annonces', icon: Package, href: '/admin/ads', badge: null },
      { name: 'Messages', icon: MessageSquare, href: '/admin/messages', badge: '45' },
      { name: 'Notifications', icon: Bell, href: '/admin/notifications', badge: '8' },
    ]
  },
  {
    title: 'Contenu',
    items: [
      { name: 'Pages', icon: FileText, href: '/admin/pages', badge: null },
      { name: 'Emails', icon: Mail, href: '/admin/emails', badge: null },
      { name: 'Bannières', icon: Bell, href: '/admin/banners', badge: null },
    ]
  },
  {
    title: 'Système',
    items: [
      { name: 'Analytics', icon: BarChart, href: '/admin/analytics', badge: null },
      { name: 'Base de données', icon: Database, href: '/admin/database', badge: null },
      { name: 'Équipe', icon: UserPlus, href: '/admin/team', badge: null },
      { name: 'Abonnements', icon: CreditCard, href: '/admin/subscriptions', badge: null },
      { name: 'Légal', icon: BookOpen, href: '/admin/legal', badge: null },
      { name: 'Carrières', icon: Briefcase, href: '/admin/careers', badge: null },
      { name: 'Paramètres', icon: Settings, href: '/admin/settings', badge: null },
    ]
  }
];

export default function AdminSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Admin Profile */}
        <div className="flex items-center space-x-3 mb-8">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              Administrateur
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-8">
          {menuItems.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                      "transition-colors duration-150",
                      isActive(item.href)
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={cn(
                        "ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                        isActive(item.href)
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-8 w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}