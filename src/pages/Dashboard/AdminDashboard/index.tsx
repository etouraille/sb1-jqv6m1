import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useAdminStats } from '../../../hooks/useAdminStats';
import { useModeration } from '../../../hooks/useModeration';
import { useSystemHealth } from '../../../hooks/useSystemHealth';
import { 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Ban,
  CheckCircle,
  XCircle,
  DollarSign,
  MessageSquare,
  Eye
} from 'lucide-react';
import UserStats from '../../../components/Dashboard/Analytics/UserStats';
import AdStats from '../../../components/Dashboard/Analytics/AdStats';
import RevenueChart from '../../../components/Dashboard/Analytics/RevenueChart';
import SystemHealth from '../../../components/Dashboard/Analytics/SystemHealth';
import RecentReports from '../../../components/Dashboard/Analytics/RecentReports';
import DeviceStats from '../../../components/Dashboard/Analytics/DeviceStats';
import LocationMap from '../../../components/Dashboard/Analytics/LocationMap';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  const { stats, isLoading, error } = useAdminStats(selectedPeriod);
  const { health, isLoading: isLoadingHealth } = useSystemHealth();
  const { approveReport, rejectReport } = useModeration();

  const handleResolveReport = async (id: string) => {
    try {
      await approveReport(id);
    } catch (error) {
      console.error('Error resolving report:', error);
    }
  };

  const handleRejectReport = async (id: string) => {
    try {
      await rejectReport(id);
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  if (isLoading || isLoadingHealth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Erreur</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-red-600 hover:text-red-500"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
              <p className="mt-1 text-sm text-gray-500">
                Bienvenue, {user?.name}
              </p>
            </div>

            {/* Période */}
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
                  {period === 'today' ? "Aujourd'hui" : period === 'week' ? '7 jours' : '30 jours'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Utilisateurs actifs</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.users.active.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.users.trend.active > 0 ? (
                <ArrowUpRight className="text-green-500" size={20} />
              ) : (
                <ArrowDownRight className="text-red-500" size={20} />
              )}
              <span className={cn(
                "text-sm font-medium",
                stats.users.trend.active > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(stats.users.trend.active)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nouvelles annonces</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.ads.total.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.ads.trend.total > 0 ? (
                <ArrowUpRight className="text-green-500" size={20} />
              ) : (
                <ArrowDownRight className="text-red-500" size={20} />
              )}
              <span className={cn(
                "text-sm font-medium",
                stats.ads.trend.total > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(stats.ads.trend.total)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  CHF {stats.ads.revenue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.ads.trend.revenue > 0 ? (
                <ArrowUpRight className="text-green-500" size={20} />
              ) : (
                <ArrowDownRight className="text-red-500" size={20} />
              )}
              <span className={cn(
                "text-sm font-medium",
                stats.ads.trend.revenue > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(stats.ads.trend.revenue)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Signalements</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.ads.pending.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.ads.trend.pending > 0 ? (
                <ArrowUpRight className="text-red-500" size={20} />
              ) : (
                <ArrowDownRight className="text-green-500" size={20} />
              )}
              <span className={cn(
                "text-sm font-medium",
                stats.ads.trend.pending > 0 ? "text-red-600" : "text-green-600"
              )}>
                {Math.abs(stats.ads.trend.pending)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
            </div>
          </div>
        </div>

        {/* Graphiques et statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Revenus</h3>
              <RevenueChart data={stats.revenue} />
            </div>
          </div>
          <div>
            <SystemHealth data={health} />
          </div>
        </div>

        {/* Statistiques utilisateurs et appareils */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UserStats data={stats.users} />
          <div className="space-y-8">
            <DeviceStats data={stats.devices} />
            <LocationMap locations={stats.locations} />
          </div>
        </div>

        {/* Signalements et activité récente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentReports
            reports={stats.reports}
            onResolve={handleResolveReport}
            onReject={handleRejectReport}
          />
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Activité récente</h3>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">
                      {activity.type === 'view' ? '👁️' : 
                       activity.type === 'message' ? '💬' : 
                       activity.type === 'favorite' ? '❤️' : '📊'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.timestamp).toLocaleString('fr-CH')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}