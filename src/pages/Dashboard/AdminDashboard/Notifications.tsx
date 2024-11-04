import { useState } from 'react';
import { Bell, Search, Filter } from 'lucide-react';
import { cn } from '../../../utils/cn';

const notifications = [
  {
    id: '1',
    title: 'Nouvelle inscription',
    message: 'Un nouvel utilisateur s\'est inscrit',
    type: 'user',
    status: 'unread',
    createdAt: new Date()
  },
  // ... autres notifications
];

export default function AdminNotifications() {
  const [selectedType, setSelectedType] = useState<'all' | 'user' | 'system' | 'alert'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les notifications système
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une notification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as any)}
          className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
        >
          <option value="all">Tous les types</option>
          <option value="user">Utilisateurs</option>
          <option value="system">Système</option>
          <option value="alert">Alertes</option>
        </select>
      </div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "bg-white rounded-lg shadow-sm p-4",
              notification.status === 'unread' && "bg-red-50"
            )}
          >
            <div className="flex items-start space-x-3">
              <Bell className="h-5 w-5 text-red-600 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {notification.createdAt.toLocaleString()}
                </p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">
                Marquer comme lu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}