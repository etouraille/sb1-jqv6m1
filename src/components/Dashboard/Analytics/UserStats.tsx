import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface UserStatsProps {
  data: {
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
}

export default function UserStats({ data }: UserStatsProps) {
  const stats = [
    {
      label: 'Total utilisateurs',
      value: data.total,
      trend: data.trend.total,
      icon: Users,
    },
    {
      label: 'Nouveaux utilisateurs',
      value: data.new,
      trend: data.trend.new,
      icon: UserPlus,
    },
    {
      label: 'Utilisateurs actifs',
      value: data.active,
      trend: data.trend.active,
      icon: UserCheck,
    },
    {
      label: 'Comptes suspendus',
      value: data.suspended,
      trend: data.trend.suspended,
      icon: UserX,
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
                {stat.value.toLocaleString()}
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