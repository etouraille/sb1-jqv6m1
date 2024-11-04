import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  MessageSquare,
  Heart,
  Bell,
  Settings,
  CreditCard,
  History,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const menuItems = [
  {
    title: 'Principal',
    items: [
      { name: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'Mes annonces', icon: Package, href: '/dashboard/ads' },
      { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages', badge: '3' },
      { name: 'Favoris', icon: Heart, href: '/dashboard/favorites' },
      { name: 'Notifications', icon: Bell, href: '/dashboard/notifications', badge: '5' },
    ]
  },
  {
    title: 'Compte',
    items: [
      { name: 'Abonnement', icon: CreditCard, href: '/dashboard/subscription' },
      { name: 'Historique', icon: History, href: '/dashboard/history' },
      { name: 'Paramètres', icon: Settings, href: '/dashboard/settings' },
      { name: 'Aide', icon: HelpCircle, href: '/dashboard/help' },
    ]
  }
];

export default function UserSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Profil utilisateur */}
        <div className="flex items-center space-x-3 mb-8">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full"
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
              {user?.email}
            </p>
          </div>
        </div>

        {/* Menu de navigation */}
        <nav className="space-y-8">
          {menuItems.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                      "transition-colors duration-150",
                      location.pathname === item.href
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={cn(
                        "ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                        location.pathname === item.href
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

        {/* Bouton de déconnexion */}
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