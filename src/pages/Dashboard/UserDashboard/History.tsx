import { useState } from 'react';
import { Clock, Package, MessageSquare, Heart, Search } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ActivityItem {
  id: string;
  type: 'ad' | 'message' | 'favorite' | 'search';
  title: string;
  description: string;
  date: Date;
}

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'ad',
    title: 'Annonce publiée',
    description: 'iPhone 14 Pro Max',
    date: new Date('2024-03-15T10:30:00')
  },
  {
    id: '2',
    type: 'message',
    title: 'Message envoyé',
    description: 'À propos de "MacBook Pro M3"',
    date: new Date('2024-03-14T15:45:00')
  },
  {
    id: '3',
    type: 'favorite',
    title: 'Annonce ajoutée aux favoris',
    description: 'PS5 Digital Edition',
    date: new Date('2024-03-14T09:20:00')
  }
];

export default function History() {
  const [activities] = useState(sampleActivities);
  const [filter, setFilter] = useState<'all' | 'ads' | 'messages' | 'favorites'>('all');

  const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
    switch (type) {
      case 'ad':
        return <Package className="text-blue-500" />;
      case 'message':
        return <MessageSquare className="text-green-500" />;
      case 'favorite':
        return <Heart className="text-red-500" />;
      case 'search':
        return <Search className="text-purple-500" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Historique</h1>
        <p className="mt-1 text-sm text-gray-500">
          Consultez l'historique de vos activités
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Activités récentes</h2>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Toutes les activités</option>
              <option value="ads">Annonces</option>
              <option value="messages">Messages</option>
              <option value="favorites">Favoris</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <ActivityIcon type={activity.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {activity.date.toLocaleDateString('fr-CH', {
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
    </div>
  );
}