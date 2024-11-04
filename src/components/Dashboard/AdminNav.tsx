import { useState } from 'react';
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
  Briefcase
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  {
    label: 'Vue d\'ensemble',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    label: 'Utilisateurs',
    icon: Users,
    href: '/admin/users',
    badge: '1.2k'
  },
  {
    label: 'Modération',
    icon: AlertTriangle,
    href: '/admin/moderation',
    badge: '12'
  },
  {
    label: 'Base de données',
    icon: Database,
    href: '/admin/database'
  },
  {
    label: 'Notifications',
    icon: Bell,
    href: '/admin/notifications'
  },
  {
    label: 'Emails',
    icon: Mail,
    href: '/admin/emails'
  },
  {
    label: 'Équipe',
    icon: UserPlus,
    href: '/admin/team'
  },
  {
    label: 'Abonnements',
    icon: CreditCard,
    href: '/admin/subscriptions'
  },
  {
    label: 'Carrières',
    icon: Briefcase,
    href: '/admin/careers'
  },
  {
    label: 'Légal',
    icon: BookOpen,
    href: '/admin/legal'
  },
  {
    label: 'Paramètres',
    icon: Settings,
    href: '/admin/settings'
  }
];

export default function AdminNav() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  return (
    <nav className={cn(
      "bg-white border-r border-gray-200 h-screen",
      expanded ? "w-64" : "w-20",
      "transition-all duration-300"
    )}>
      <div className="p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
        >
          {expanded ? (
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-1 px-3 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-gray-100",
              location.pathname === item.href
                ? "bg-red-50 text-red-600"
                : "text-gray-700"
            )}
          >
            <item.icon className={cn(
              "flex-shrink-0",
              expanded ? "mr-3" : "mx-auto",
              "h-5 w-5"
            )} />
            {expanded && (
              <span className="flex-1">{item.label}</span>
            )}
            {expanded && item.badge && (
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
    </nav>
  );
}