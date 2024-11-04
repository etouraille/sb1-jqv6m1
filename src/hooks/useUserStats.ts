import { useState, useEffect } from 'react';

interface UserStats {
  period: 'today' | 'week' | 'month';
  data: {
    views: number;
    messages: number;
    favorites: number;
    revenue: number;
    performance: {
      views: number;
      clicks: number;
      ctr: number;
      favorites: number;
      messages: number;
      trend: {
        views: number;
        clicks: number;
        ctr: number;
        favorites: number;
        messages: number;
      };
    };
    revenue_chart: {
      labels: string[];
      values: number[];
    };
    recent_activity: Array<{
      id: string;
      type: 'view' | 'message' | 'favorite';
      title: string;
      description: string;
      timestamp: Date;
    }>;
  };
}

export function useUserStats(period: 'today' | 'week' | 'month') {
  const [stats, setStats] = useState<UserStats['data']>({
    views: 1250,
    messages: 45,
    favorites: 32,
    revenue: 850,
    performance: {
      views: 1250,
      clicks: 85,
      ctr: 6.8,
      favorites: 32,
      messages: 14,
      trend: {
        views: 12,
        clicks: 8,
        ctr: 5,
        favorites: 15,
        messages: -3
      }
    },
    revenue_chart: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      values: [500, 800, 1200, 1000, 1500, 2000]
    },
    recent_activity: [
      {
        id: '1',
        type: 'view',
        title: 'Nouvelle vue',
        description: 'Votre annonce a été vue 50 fois',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'message',
        title: 'Nouveau message',
        description: 'Vous avez reçu un nouveau message',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '3',
        type: 'favorite',
        title: 'Annonce favorite',
        description: 'Votre annonce a été ajoutée aux favoris',
        timestamp: new Date(Date.now() - 7200000)
      }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        // Dans un environnement réel, on ferait un appel API ici
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