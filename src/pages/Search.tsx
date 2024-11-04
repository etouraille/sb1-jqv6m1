import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { sampleAds } from '../data/sampleData';
import AdCard from '../components/AdCard';
import AdFilters from '../components/AdFilters';
import { cn } from '../utils/cn';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Search() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');

  const [searchTerm, setSearchTerm] = useState(queryParam || '');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredAds = sampleAds
    .filter((ad) => {
      const matchesCategory = !categoryParam || ad.category === categoryParam;
      const matchesSearch = !debouncedSearch || 
        ad.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        ad.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 h-12 flex items-center gap-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <SlidersHorizontal size={20} />
                <span className="hidden sm:inline">Filtres</span>
              </button>
              <div className="flex rounded-lg border border-gray-200 bg-white">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    "p-3 first:rounded-l-lg",
                    view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  )}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    "p-3 last:rounded-r-lg border-l border-gray-200",
                    view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  )}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {showFilters && <AdFilters />}
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredAds.length} résultat{filteredAds.length > 1 ? 's' : ''}
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
          >
            <option value="recent">Plus récent</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

        {filteredAds.length > 0 ? (
          <div className={cn(
            'grid gap-6 animate-fade-in',
            view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
          )}>
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Grid className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun résultat</h3>
            <p className="mt-1 text-sm text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}