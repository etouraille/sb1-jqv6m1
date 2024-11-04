import { Plus, Search, Bell, Settings, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdStore } from '../../stores/useAdStore';
import { cn } from '../../utils/cn';

export default function QuickActions() {
  const { favorites } = useAdStore();

  const actions = [
    {
      label: 'Déposer une annonce',
      icon: Plus,
      href: '/post-ad',
      primary: true
    },
    {
      label: 'Messages',
      icon: MessageSquare,
      href: '/dashboard/messages',
      badge: 3
    },
    {
      label: 'Favoris',
      icon: Heart,
      href: '/dashboard/favorites',
      badge: favorites.length || undefined
    },
    {
      label: 'Notifications',
      icon: Bell,
      href: '/dashboard/notifications',
      badge: 5
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className={cn(
              "flex items-center px-4 py-3 rounded-lg transition-colors",
              action.primary
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            )}
          >
            <action.icon className={cn(
              "h-5 w-5 mr-3",
              action.primary ? "text-white" : "text-gray-400"
            )} />
            <span className="font-medium">{action.label}</span>
            {action.badge && (
              <span className={cn(
                "ml-auto px-2 py-1 rounded-full text-xs font-medium",
                action.primary
                  ? "bg-white text-red-600"
                  : "bg-red-100 text-red-600"
              )}>
                {action.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}