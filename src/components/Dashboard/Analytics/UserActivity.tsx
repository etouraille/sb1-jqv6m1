import { useState } from 'react';
import { Activity } from 'lucide-react';
import { formatDate } from '../../../utils/date';

interface ActivityItem {
  id: string;
  type: 'view' | 'message' | 'favorite' | 'offer';
  title: string;
  description: string;
  timestamp: Date;
}

interface UserActivityProps {
  activities: ActivityItem[];
}

export default function UserActivity({ activities }: UserActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Activité récente</h3>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Activity className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
              <p className="mt-1 text-xs text-gray-400">
                {formatDate(activity.timestamp.toString())}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}