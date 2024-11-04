import { useState } from 'react';
import { BarChart, Calendar } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface VisitorStatsProps {
  period: 'day' | 'week' | 'month';
  data: {
    visitors: number;
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
  };
}

export default function VisitorStats({ period, data }: VisitorStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Statistiques visiteurs</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            {period === 'day' ? 'Aujourd\'hui' :
             period === 'week' ? '7 derniers jours' : '30 derniers jours'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Visiteurs</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.visitors.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Pages vues</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.pageViews.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Visiteurs uniques</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.uniqueVisitors.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Taux de rebond</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.bounceRate}%
          </p>
        </div>
      </div>
    </div>
  );
}