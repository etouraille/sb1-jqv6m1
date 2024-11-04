import { useState } from 'react';
import { Search, User, Shield, Ban, CheckCircle, MoreVertical, Mail, Eye } from 'lucide-react';
import { sampleUsers } from '../../../data/sampleUsers';
import { cn } from '../../../utils/cn';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AdminUsers() {
  const [selectedRole, setSelectedRole] = useState<'all' | 'user' | 'admin'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'suspended'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  const filteredUsers = sampleUsers.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' ? user.verified : !user.verified);
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleBanUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir suspendre cet utilisateur ?')) {
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success('Utilisateur suspendu');
      } catch (error) {
        toast.error('Erreur lors de la suspension');
      }
    }
  };

  const handlePromoteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir promouvoir cet utilisateur en administrateur ?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success('Utilisateur promu administrateur');
      } catch (error) {
        toast.error('Erreur lors de la promotion');
      }
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Utilisateur vérifié');
    } catch (error) {
      toast.error('Erreur lors de la vérification');
    }
  };

  const handleEmailUser = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Email envoyé à l\'utilisateur');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les comptes utilisateurs
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total utilisateurs</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {sampleUsers.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Administrateurs</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {sampleUsers.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <User className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Non vérifiés</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {sampleUsers.filter(u => !u.verified).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <Ban className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Suspendus</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {sampleUsers.filter(u => !u.verified).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as any)}
            className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tous les rôles</option>
            <option value="user">Utilisateurs</option>
            <option value="admin">Administrateurs</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
          </select>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annonces
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  )}>
                    {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                    {user.verified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link 
                    to={`/admin/ads?user=${user.id}`}
                    className="hover:text-red-600"
                  >
                    {user.totalAds} annonce{user.totalAds > 1 ? 's' : ''}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEmailUser(user.id)}
                      title="Envoyer un email"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Mail size={20} />
                    </button>
                    <Link
                      to={`/admin/users/${user.id}`}
                      title="Voir le profil"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Eye size={20} />
                    </Link>
                    {!user.verified && (
                      <button
                        onClick={() => handleVerifyUser(user.id)}
                        title="Vérifier l'utilisateur"
                        className="text-gray-400 hover:text-green-600"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handlePromoteUser(user.id)}
                        title="Promouvoir en administrateur"
                        className="text-gray-400 hover:text-purple-600"
                      >
                        <Shield size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleBanUser(user.id)}
                      title="Suspendre l'utilisateur"
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Ban size={20} />
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