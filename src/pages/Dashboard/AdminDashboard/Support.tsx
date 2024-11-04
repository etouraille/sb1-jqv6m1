import { useState } from 'react';
import { MessageSquare, User, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const tickets = [
  {
    id: '1',
    user: 'John Doe',
    subject: 'Problème de paiement',
    status: 'open',
    priority: 'high',
    createdAt: new Date(),
    lastUpdate: new Date(),
  },
  {
    id: '2',
    user: 'Jane Smith',
    subject: 'Question sur l\'abonnement',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(),
    lastUpdate: new Date(),
  },
  {
    id: '3',
    user: 'Bob Wilson',
    subject: 'Annonce non publiée',
    status: 'closed',
    priority: 'low',
    createdAt: new Date(),
    lastUpdate: new Date(),
  },
];

export default function AdminSupport() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'pending' | 'closed'>('all');

  const filteredTickets = selectedStatus === 'all'
    ? tickets
    : tickets.filter(ticket => ticket.status === selectedStatus);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestion des tickets de support
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total tickets</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">125</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Résolus</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Temps moyen</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">2h 15m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des tickets */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Tickets</h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="open">Ouverts</option>
              <option value="pending">En attente</option>
              <option value="closed">Fermés</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorité
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
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                    <div className="text-sm text-gray-500">{ticket.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{ticket.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      {
                        'bg-green-100 text-green-800': ticket.status === 'open',
                        'bg-yellow-100 text-yellow-800': ticket.status === 'pending',
                        'bg-gray-100 text-gray-800': ticket.status === 'closed',
                      }
                    )}>
                      {ticket.status === 'open' ? 'Ouvert' :
                       ticket.status === 'pending' ? 'En attente' : 'Fermé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      {
                        'bg-red-100 text-red-800': ticket.priority === 'high',
                        'bg-yellow-100 text-yellow-800': ticket.priority === 'medium',
                        'bg-blue-100 text-blue-800': ticket.priority === 'low',
                      }
                    )}>
                      {ticket.priority === 'high' ? 'Haute' :
                       ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-700">
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}