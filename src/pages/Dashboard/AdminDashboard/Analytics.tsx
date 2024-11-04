import { useState } from 'react';
import UserStats from '../../../components/Dashboard/Analytics/UserStats';
import AdStats from '../../../components/Dashboard/Analytics/AdStats';
import RevenueChart from '../../../components/Dashboard/Analytics/RevenueChart';
import SystemHealth from '../../../components/Dashboard/Analytics/SystemHealth';
import RecentReports from '../../../components/Dashboard/Analytics/RecentReports';
import { sampleAnalytics } from '../../../data/sampleAnalytics';

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  const analyticsData = {
    users: {
      total: 1234,
      new: 56,
      active: 890,
      suspended: 12,
      trend: {
        total: 12,
        new: 8,
        active: 15,
        suspended: -2
      }
    },
    ads: {
      total: 5678,
      pending: 123,
      revenue: 45678,
      rating: 4.5,
      trend: {
        total: 8,
        pending: -5,
        revenue: 12,
        rating: 2
      }
    },
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [4500, 5200, 4800, 5800, 6000, 6500]
    },
    system: {
      uptime: '99.9%',
      responseTime: 250,
      diskUsage: 45,
      lastBackup: '2024-03-15 10:30',
      status: {
        server: 'healthy',
        database: 'healthy',
        cache: 'healthy',
        security: 'healthy'
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble des performances de la plateforme
          </p>
        </div>

        {/* Statistiques utilisateurs */}
        <div className="mb-8">
          <UserStats data={analyticsData.users} />
        </div>

        {/* Statistiques annonces */}
        <div className="mb-8">
          <AdStats data={analyticsData.ads} />
        </div>

        {/* Graphique des revenus et État du système */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Revenus</h3>
            <RevenueChart data={analyticsData.revenue} />
          </div>
          <div>
            <SystemHealth data={analyticsData.system} />
          </div>
        </div>

        {/* Signalements récents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <RecentReports
              reports={sampleAnalytics.reports || []}
              onResolve={(id) => console.log('Resolve report:', id)}
              onReject={(id) => console.log('Reject report:', id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}