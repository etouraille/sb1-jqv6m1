import { useState } from 'react';
import { Bell, MessageSquare, Heart, Tag, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'price' | 'system';
  title: string;
  description: string;
  date: Date;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Nouveau message',
    description: 'Jean D. a répondu à votre annonce "iPhone 14 Pro"',
    date: new Date('2024-03-15T10:30:00'),
    read: false
  },
  {
    id: '2',
    type: 'like',
    title: 'Nouvelle interaction',
    description: 'Votre annonce "MacBook Pro M3" a été ajoutée aux favoris',
    date: new Date('2024-03-14T15:45:00'),
    read: true
  },
  {
    id: '3',
    type: 'price',
    title: 'Alerte prix',
    description: 'Une nouvelle annonce correspond à votre alerte prix "PS5"',
    date: new Date('2024-03-14T09:20:00'),
    read: false
  }
];

export default function NotificationCenter() {
  const [notifications] = useState(sampleNotifications);

  const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="text-blue-500" />;
      case 'like':
        return <Heart className="text-red-500" />;
      case 'price':
        return <Tag className="text-green-500" />;
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Notifications récentes</h2>
          </div>
          <Link
            to="/dashboard/notifications"
            className="flex items-center text-sm text-red-600 hover:text-red-700"
          >
            Voir toutes les notifications
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "px-6 py-4 hover:bg-gray-50 transition-colors",
              !notification.read && "bg-red-50"
            )}
          >
            <div className="flex items-start space-x-3">
              <NotificationIcon type={notification.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.description}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {notification.date.toLocaleDateString('fr-CH', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}