import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { sampleAds } from '../../data/sampleData';
import { cn } from '../../utils/cn';
import { formatDate } from '../../utils/date';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  const stats = [
    {
      name: 'Utilisateurs actifs',
      value: '1,234',
      change: '+12.3%',
      trend: 'up' as const,
      icon: Users,
    },
    {
      name: 'Nouvelles annonces',
      value: '45',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingBag,
    },
    {
      name: 'Signalements',
      value: '12',
      change: '-2.5%',
      trend: 'down' as const,
      icon: AlertTriangle,
    },
    {
      name: 'Taux de conversion',
      value: '3.2%',
      change: '+4.1%',
      trend: 'up' as const,
      icon: TrendingUp,
    },
  ];

  // Simuler les annonces en attente de modération
  const pendingAds = sampleAds.filter(ad => ad.status === 'pending');

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble et modération de la plateforme
          </p>
        </div>

        {/* Période */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-lg shadow-sm">
            {(['today', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  "first:rounded-l-lg last:rounded-r-lg",
                  "focus:outline-none focus:ring-2 focus:ring-red-500 focus:z-10",
                  selectedPeriod === period
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:text-gray-900",
                  "border border-gray-200",
                  "first:border-r-0 last:border-l-0"
                )}
              >
                {period === 'today' ? "Aujourd'hui" : period === 'week' ? 'Cette semaine' : 'Ce mois'}
              </button>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <stat.icon size={24} className="text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="text-green-600" size={20} />
                ) : (
                  <ArrowDownRight className="text-red-600" size={20} />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
              </div>
            </div>
          ))}
        </div>

        {/* Annonces à modérer */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Annonces en attente de modération
            </h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annonce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingAds.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={ad.images[0]}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {ad.title}
                        </div>
                        <div className="text-sm text-gray-500">{ad.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">ID: {ad.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(ad.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-700">
                        <CheckCircle size={20} />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <XCircle size={20} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Ban size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}