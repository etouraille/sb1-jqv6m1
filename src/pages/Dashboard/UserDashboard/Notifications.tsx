import { useState } from 'react';
import { Bell, MessageSquare, Heart, Tag, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

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

export default function Notifications() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'message' | 'like' | 'price' | 'system'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || (filter === 'unread' && !notification.read);
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesFilter && matchesType;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos notifications et alertes
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Centre de notifications</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Tous les types</option>
                <option value="message">Messages</option>
                <option value="like">Interactions</option>
                <option value="price">Alertes prix</option>
                <option value="system">Système</option>
              </select>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
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
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}