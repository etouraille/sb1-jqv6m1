import { useState, useEffect } from 'react';
import { sampleAnalytics } from '../data/sampleAnalytics';

interface AdminStats {
  period: 'today' | 'week' | 'month';
  data: {
    users: {
      total: number;
      new: number;
      active: number;
      suspended: number;
      trend: {
        total: number;
        new: number;
        active: number;
        suspended: number;
      };
    };
    ads: {
      total: number;
      pending: number;
      revenue: number;
      rating: number;
      trend: {
        total: number;
        pending: number;
        revenue: number;
        rating: number;
      };
    };
    revenue: {
      labels: string[];
      values: number[];
    };
    system: {
      uptime: string;
      responseTime: number;
      diskUsage: number;
      lastBackup: string;
      status: {
        server: 'healthy' | 'warning' | 'critical';
        database: 'healthy' | 'warning' | 'critical';
        cache: 'healthy' | 'warning' | 'critical';
        security: 'healthy' | 'warning' | 'critical';
      };
    };
  };
}

export function useAdminStats(period: 'today' | 'week' | 'month') {
  const [stats, setStats] = useState<AdminStats['data']>(sampleAnalytics);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        setStats(sampleAnalytics);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  return { stats, isLoading, error };
}