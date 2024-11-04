import { Clock } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface Activity {
  id: string;
  type: 'ad_created' | 'ad_sold' | 'message' | 'favorite' | 'view';
  title: string;
  description: string;
  timestamp: Date;
}

interface ActivityLogProps {
  activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-sm text-gray-500">
                {formatDate(activity.timestamp.toString())}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}