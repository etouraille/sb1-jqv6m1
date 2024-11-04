import { useState } from 'react';
import { Mail, Search, Filter, Play, Pause, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

const emails = [
  {
    id: '1',
    subject: 'Bienvenue sur OCCASI.CH',
    recipient: 'john@example.com',
    status: 'sent',
    type: 'welcome',
    sentAt: new Date()
  },
  {
    id: '2',
    subject: 'Confirmation de votre annonce',
    recipient: 'jane@example.com',
    status: 'failed',
    type: 'notification',
    sentAt: new Date()
  },
  // ... autres emails
];

export default function AdminEmails() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'sent' | 'failed' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isQueuePaused, setIsQueuePaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredEmails = emails.filter(email => {
    const matchesStatus = selectedStatus === 'all' || email.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleToggleQueue = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsQueuePaused(!isQueuePaused);
      toast.success(isQueuePaused ? 'File d\'attente reprise' : 'File d\'attente mise en pause');
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Emails</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les emails du système
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Envoyés aujourd'hui</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        {/* ... autres statistiques */}
      </div>

      {/* Contrôles de la file d'attente */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">File d'attente</h2>
            <p className="text-sm text-gray-500">12 emails en attente</p>
          </div>
          <button
            onClick={handleToggleQueue}
            disabled={isProcessing}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "flex items-center space-x-2",
              isQueuePaused
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-yellow-600 text-white hover:bg-yellow-700",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <RefreshCw className="animate-spin h-5 w-5" />
            ) : isQueuePaused ? (
              <>
                <Play className="h-5 w-5" />
                <span>Reprendre</span>
              </>
            ) : (
              <>
                <Pause className="h-5 w-5" />
                <span>Mettre en pause</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as any)}
          className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="sent">Envoyés</option>
          <option value="failed">Échoués</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      {/* Liste des emails */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
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
            {filteredEmails.map((email) => (
              <tr key={email.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{email.subject}</div>
                  <div className="text-sm text-gray-500">{email.recipient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    {
                      'bg-blue-100 text-blue-800': email.type === 'welcome',
                      'bg-green-100 text-green-800': email.type === 'notification',
                    }
                  )}>
                    {email.type === 'welcome' ? 'Bienvenue' : 'Notification'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    {
                      'bg-green-100 text-green-800': email.status === 'sent',
                      'bg-red-100 text-red-800': email.status === 'failed',
                      'bg-yellow-100 text-yellow-800': email.status === 'pending',
                    }
                  )}>
                    {email.status === 'sent' ? 'Envoyé' :
                     email.status === 'failed' ? 'Échoué' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.sentAt.toLocaleDateString()}
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
  );
}