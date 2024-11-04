import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/date';

interface Report {
  id: string;
  type: 'ad' | 'user' | 'message';
  targetId: string;
  title: string;
  description: string;
  reporter: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: Date;
}

interface ModerationQueueProps {
  reports: Report[];
  onApprove: (report: Report) => void;
  onReject: (report: Report) => void;
  onBan: (report: Report) => void;
}

export default function ModerationQueue({ reports, onApprove, onReject, onBan }: ModerationQueueProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map(report => report.id));
    }
  };

  const toggleSelect = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedReports.length === reports.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signalement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => toggleSelect(report.id)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500">{report.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    {
                      'bg-blue-100 text-blue-800': report.type === 'ad',
                      'bg-purple-100 text-purple-800': report.type === 'user',
                      'bg-yellow-100 text-yellow-800': report.type === 'message',
                    }
                  )}>
                    {report.type === 'ad' ? 'Annonce' : 
                     report.type === 'user' ? 'Utilisateur' : 'Message'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    {
                      'bg-yellow-100 text-yellow-800': report.status === 'pending',
                      'bg-green-100 text-green-800': report.status === 'resolved',
                      'bg-red-100 text-red-800': report.status === 'rejected',
                    }
                  )}>
                    {report.status === 'pending' ? 'En attente' :
                     report.status === 'resolved' ? 'Résolu' : 'Rejeté'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(report.createdAt.toString())}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onApprove(report)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => onReject(report)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle size={20} />
                    </button>
                    <button
                      onClick={() => onBan(report)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <AlertTriangle size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}