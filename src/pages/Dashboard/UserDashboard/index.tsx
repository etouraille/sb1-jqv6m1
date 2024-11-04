import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Grid, List, MessageSquare, Heart, Eye, Clock, TrendingUp, AlertTriangle, DollarSign, Package, Bell } from 'lucide-react';
import { sampleAds } from '../../../data/sampleData';
import AdList from '../../../components/Dashboard/AdList';
import Stats from '../../../components/Dashboard/Stats';
import ActivityLog from '../../../components/Dashboard/ActivityLog';
import RevenueChart from '../../../components/Dashboard/Analytics/RevenueChart';
import AdPerformance from '../../../components/Dashboard/Analytics/AdPerformance';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useUserStats } from '../../../hooks/useUserStats';
import { cn } from '../../../utils/cn';
import QuickActions from '../../../components/Dashboard/QuickActions';
import NotificationCenter from '../../../components/Dashboard/NotificationCenter';
import SubscriptionStatus from '../../../components/Dashboard/SubscriptionStatus';
import MessagePreview from '../../../components/Dashboard/MessagePreview';
import FavoriteAdsPreview from '../../../components/Dashboard/FavoriteAdsPreview';

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  const { stats, isLoading, error } = useUserStats(selectedPeriod);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');

  const userAds = sampleAds.filter(ad => ad.userId === user?.id);
  const filteredAds = selectedStatus === 'all' 
    ? userAds 
    : userAds.filter(ad => ad.status === selectedStatus);

  if (isLoading) {
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bienvenue, {user?.name}
        </p>
      </div>

      {/* Actions rapides */}
      <QuickActions />

      {/* État de l'abonnement */}
      <div className="mb-8">
        <SubscriptionStatus subscription={user?.subscription} />
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
              {period === 'today' ? "Aujourd'hui" : period === 'week' ? '7 jours' : '30 jours'}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Stats
          title="Vues"
          value={stats.views.toLocaleString()}
          icon={<Eye className="h-6 w-6 text-red-600" />}
          trend={{ value: '+12%', direction: 'up' }}
        />
        <Stats
          title="Messages"
          value={stats.messages.toLocaleString()}
          icon={<MessageSquare className="h-6 w-6 text-red-600" />}
          trend={{ value: '+5%', direction: 'up' }}
        />
        <Stats
          title="Annonces actives"
          value={userAds.filter(ad => ad.status === 'active').length.toString()}
          icon={<Package className="h-6 w-6 text-red-600" />}
          trend={{ value: '+8%', direction: 'up' }}
        />
        <Stats
          title="Favoris"
          value={stats.favorites.toLocaleString()}
          icon={<Heart className="h-6 w-6 text-red-600" />}
          trend={{ value: '+15%', direction: 'up' }}
        />
      </div>

      {/* Graphiques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Performance des annonces</h3>
          <RevenueChart data={stats.revenue_chart} />
        </div>
        <AdPerformance data={stats.performance} />
      </div>

      {/* Messages récents et Favoris */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MessagePreview />
        <FavoriteAdsPreview />
      </div>

      {/* Centre de notifications */}
      <div className="mb-8">
        <NotificationCenter />
      </div>

      {/* Liste des annonces */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Mes annonces</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="sold">Vendus</option>
            </select>
            <div className="flex rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setView('grid')}
                className={cn(
                  "p-2 first:rounded-l-lg",
                  view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  "p-2 last:rounded-r-lg border-l border-gray-200",
                  view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <AdList 
          ads={filteredAds}
          onEdit={(ad) => console.log('Edit ad:', ad)}
          onDelete={(ad) => console.log('Delete ad:', ad)}
          onView={(ad) => console.log('View ad:', ad)}
        />
      </div>

      {/* Activité récente */}
      <ActivityLog activities={stats.recent_activity} />
    </div>
  );
}