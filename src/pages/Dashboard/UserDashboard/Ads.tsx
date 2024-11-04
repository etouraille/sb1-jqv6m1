import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Grid, List, Eye, Trash2, PenSquare } from 'lucide-react';
import { sampleAds } from '../../../data/sampleData';
import { cn } from '../../../utils/cn';

export default function UserAds() {
  const { user } = useAuth();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');

  const userAds = sampleAds.filter(ad => ad.userId === user?.id);
  const filteredAds = selectedStatus === 'all' 
    ? userAds 
    : userAds.filter(ad => ad.status === selectedStatus);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes annonces</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos annonces publiées
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="pending">En attente</option>
            <option value="sold">Vendus</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('grid')}
            className={cn(
              "p-2 rounded-md",
              view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
            )}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn(
              "p-2 rounded-md",
              view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
            )}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{ad.title}</h3>
                  <span className="text-lg font-bold text-red-600">
                    CHF {ad.price.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    {
                      'bg-green-100 text-green-800': ad.status === 'active',
                      'bg-yellow-100 text-yellow-800': ad.status === 'pending',
                      'bg-gray-100 text-gray-800': ad.status === 'sold',
                    }
                  )}>
                    {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                      <Eye size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                      <PenSquare size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annonce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vues
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAds.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={ad.images[0]}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {ad.title}
                        </div>
                        <div className="text-sm text-gray-500">{ad.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      CHF {ad.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      {
                        'bg-green-100 text-green-800': ad.status === 'active',
                        'bg-yellow-100 text-yellow-800': ad.status === 'pending',
                        'bg-gray-100 text-gray-800': ad.status === 'sold',
                      }
                    )}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <PenSquare size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}