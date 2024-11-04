import { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AdPerformanceProps {
  data: {
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
}

export default function AdPerformance({ data }: AdPerformanceProps) {
  const metrics = [
    { label: 'Vues', value: data.views, trend: data.trend.views },
    { label: 'Clics', value: data.clicks, trend: data.trend.clicks },
    { label: 'CTR', value: `${data.ctr}%`, trend: data.trend.ctr },
    { label: 'Favoris', value: data.favorites, trend: data.trend.favorites },
    { label: 'Messages', value: data.messages, trend: data.trend.messages },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Performance des annonces</h3>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              </p>
            </div>
            <div className="flex items-center">
              {metric.trend > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              )}
              <span className={cn(
                "ml-1 text-sm font-medium",
                metric.trend > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(metric.trend)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}