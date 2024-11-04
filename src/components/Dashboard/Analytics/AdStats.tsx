import { ShoppingBag, AlertTriangle, DollarSign, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AdStatsProps {
  data: {
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
}

export default function AdStats({ data }: AdStatsProps) {
  const stats = [
    {
      label: 'Total annonces',
      value: data.total,
      trend: data.trend.total,
      icon: ShoppingBag,
      format: (v: number) => v.toLocaleString(),
    },
    {
      label: 'En attente',
      value: data.pending,
      trend: data.trend.pending,
      icon: AlertTriangle,
      format: (v: number) => v.toLocaleString(),
    },
    {
      label: 'Revenus',
      value: data.revenue,
      trend: data.trend.revenue,
      icon: DollarSign,
      format: (v: number) => `CHF ${v.toLocaleString()}`,
    },
    {
      label: 'Note moyenne',
      value: data.rating,
      trend: data.trend.rating,
      icon: Star,
      format: (v: number) => v.toFixed(1),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stat.format(stat.value)}
              </p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <stat.icon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={cn(
              "text-sm font-medium",
              stat.trend > 0 ? "text-green-600" : "text-red-600"
            )}>
              {stat.trend > 0 ? '+' : ''}{stat.trend}%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
          </div>
        </div>
      ))}
    </div>
  );
}