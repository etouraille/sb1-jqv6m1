import { Server, Database, Clock, Shield } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SystemHealthProps {
  data: {
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
}

export default function SystemHealth({ data }: SystemHealthProps) {
  const metrics = [
    {
      label: 'Serveur',
      value: data.uptime,
      status: data.status.server,
      icon: Server,
    },
    {
      label: 'Base de données',
      value: `${data.responseTime}ms`,
      status: data.status.database,
      icon: Database,
    },
    {
      label: 'Dernière sauvegarde',
      value: data.lastBackup,
      status: data.status.cache,
      icon: Clock,
    },
    {
      label: 'Sécurité',
      value: `${data.diskUsage}% utilisé`,
      status: data.status.security,
      icon: Shield,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">État du système</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center space-x-4">
            <div className={cn(
              "p-2 rounded-lg",
              {
                'bg-green-100': metric.status === 'healthy',
                'bg-yellow-100': metric.status === 'warning',
                'bg-red-100': metric.status === 'critical',
              }
            )}>
              <metric.icon className={cn(
                "h-6 w-6",
                {
                  'text-green-600': metric.status === 'healthy',
                  'text-yellow-600': metric.status === 'warning',
                  'text-red-600': metric.status === 'critical',
                }
              )} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{metric.label}</p>
              <p className="text-sm text-gray-500">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}