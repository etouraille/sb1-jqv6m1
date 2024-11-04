import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import Sidebar from '../../../components/Dashboard/Sidebar';
import { cn } from '../../../utils/cn';

const reports = [
  {
    id: '1',
    type: 'ad',
    targetId: '123',
    title: 'Annonce suspecte',
    description: 'Cette annonce semble être une arnaque',
    reporter: 'John Doe',
    status: 'pending',
    createdAt: new Date(),
  },
  // ... autres signalements
];

export default function Moderation() {
  const [selectedType, setSelectedType] = useState<'all' | 'ad' | 'user'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'resolved'>('all');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Modération</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez les signalements et le contenu inapproprié
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">En attente</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Résolus</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">45</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-red-50 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Rejetés</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un signalement..."
                className="pl-10 w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Tous les types</option>
                <option value="ad">Annonces</option>
                <option value="user">Utilisateurs</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="resolved">Résolus</option>
              </select>
            </div>
          </div>

          {/* Liste des signalements */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signalement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        report.type === 'ad' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      )}>
                        {report.type === 'ad' ? 'Annonce' : 'Utilisateur'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        {
                          'bg-yellow-100 text-yellow-800': report.status === 'pending',
                          'bg-green-100 text-green-800': report.status === 'resolved',
                        }
                      )}>
                        {report.status === 'pending' ? 'En attente' : 'Résolu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-green-600 hover:text-green-700">
                          <CheckCircle size={20} />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <XCircle size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}