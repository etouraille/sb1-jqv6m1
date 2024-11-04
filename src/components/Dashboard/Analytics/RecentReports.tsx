import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { formatDate } from '../../../utils/date';

interface Report {
  id: string;
  type: 'ad' | 'user' | 'message';
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: Date;
}

interface RecentReportsProps {
  reports: Report[];
  onResolve: (id: string) => void;
  onReject: (id: string) => void;
}

export default function RecentReports({ reports, onResolve, onReject }: RecentReportsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Signalements récents</h3>

      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="flex items-start space-x-4">
            <div className={cn(
              "p-2 rounded-lg flex-shrink-0",
              {
                'bg-yellow-100': report.status === 'pending',
                'bg-green-100': report.status === 'resolved',
                'bg-red-100': report.status === 'rejected',
              }
            )}>
              <AlertTriangle className={cn(
                "h-5 w-5",
                {
                  'text-yellow-600': report.status === 'pending',
                  'text-green-600': report.status === 'resolved',
                  'text-red-600': report.status === 'rejected',
                }
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">{report.title}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(report.createdAt.toString())}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{report.description}</p>
              {report.status === 'pending' && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => onResolve(report.id)}
                    className="flex items-center text-sm text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approuver
                  </button>
                  <button
                    onClick={() => onReject(report.id)}
                    className="flex items-center text-sm text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}