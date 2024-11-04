import { useState } from 'react';
import { Bell, MessageSquare, Heart, Tag, AlertCircle, Check, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'price' | 'system';
  title: string;
  description: string;
  date: Date;
  read: boolean;
  link?: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Nouveau message',
    description: 'Jean D. a répondu à votre annonce "iPhone 14 Pro"',
    date: new Date('2024-03-15T10:30:00'),
    read: false,
    link: '/messages/1'
  },
  {
    id: '2',
    type: 'like',
    title: 'Nouvelle interaction',
    description: 'Votre annonce "MacBook Pro M3" a été ajoutée aux favoris',
    date: new Date('2024-03-14T15:45:00'),
    read: true,
    link: '/ad/123'
  },
  {
    id: '3',
    type: 'price',
    title: 'Alerte prix',
    description: 'Une nouvelle annonce correspond à votre alerte prix "PS5"',
    date: new Date('2024-03-14T09:20:00'),
    read: false,
    link: '/search?q=ps5'
  },
  {
    id: '4',
    type: 'system',
    title: 'Maintenance prévue',
    description: 'Une maintenance est prévue le 20 mars de 2h à 4h',
    date: new Date('2024-03-13T18:00:00'),
    read: true
  }
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="text-blue-500" />;
    case 'like':
      return <Heart className="text-red-500" />;
    case 'price':
      return <Tag className="text-green-500" />;
    case 'system':
      return <AlertCircle className="text-yellow-500" />;
    default:
      return <Bell className="text-gray-500" />;
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || (filter === 'unread' && !notification.read)
  );

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-gray-400" />
                <h1 className="ml-3 text-lg font-medium text-gray-900">Notifications</h1>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                  className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">Toutes</option>
                  <option value="unread">Non lues</option>
                </select>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Tout marquer comme lu
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune notification</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas de nouvelles notifications pour le moment.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "px-6 py-4 hover:bg-gray-50 transition-colors",
                    !notification.read && "bg-red-50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="pt-1">
                        <NotificationIcon type={notification.type} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.description}
                        </p>
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
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-green-500"
                          title="Marquer comme lu"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {notification.link && (
                    <div className="mt-2">
                      <a
                        href={notification.link}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Voir les détails
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}