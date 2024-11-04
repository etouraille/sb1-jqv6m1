import { useState, useEffect } from 'react';

interface SystemHealth {
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
}

export function useSystemHealth() {
  const [health, setHealth] = useState<SystemHealth>({
    uptime: '99.9%',
    responseTime: 250,
    diskUsage: 65,
    lastBackup: new Date().toISOString(),
    status: {
      server: 'healthy',
      database: 'healthy',
      cache: 'healthy',
      security: 'healthy'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      setIsLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        // Dans un environnement réel, on ferait un appel API ici
        setError(null);
      } catch (err) {
        setError('Erreur lors de la vérification de l\'état du système');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return { health, isLoading, error };
}