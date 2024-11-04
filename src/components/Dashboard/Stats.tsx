import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface StatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  className?: string;
}

export default function Stats({ title, value, icon, trend, className }: StatsProps) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-lg shadow-sm border border-gray-100",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={cn(
            "text-sm font-medium",
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.value}
          </span>
          <span className="ml-2 text-sm text-gray-500">vs période précédente</span>
        </div>
      )}
    </div>
  );
}