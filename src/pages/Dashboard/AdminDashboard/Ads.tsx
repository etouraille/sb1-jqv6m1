import { useState } from 'react';
import { Grid, List, Search, Filter, AlertTriangle } from 'lucide-react';
import { sampleAds } from '../../../data/sampleData';
import AdList from '../../../components/Dashboard/AdList';
import { cn } from '../../../utils/cn';

export default function AdminAds() {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAds = sampleAds.filter(ad => {
    const matchesStatus = selectedStatus === 'all' || ad.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des annonces</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez et modérez les annonces publiées
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="pending">En attente</option>
            <option value="sold">Vendus</option>
          </select>
          <div className="flex rounded-lg border border-gray-200 bg-white">
            <button
              onClick={() => setView('grid')}
              className={cn(
                "p-2 first:rounded-l-lg",
                view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                "p-2 last:rounded-r-lg border-l border-gray-200",
                view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Liste des annonces */}
      <AdList 
        ads={filteredAds}
        onEdit={(ad) => console.log('Edit ad:', ad)}
        onDelete={(ad) => console.log('Delete ad:', ad)}
        onView={(ad) => console.log('View ad:', ad)}
      />
    </div>
  );
}