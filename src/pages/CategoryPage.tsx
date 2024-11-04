import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import { sampleAds } from '../data/sampleData';
import { CATEGORIES } from '../constants/categories';
import AdCard from '../components/AdCard';
import { cn } from '../utils/cn';
import { useDebounce } from '../hooks/useDebounce';
import PriceRangeSelector from '../components/PriceRangeSelector';
import LocationSelector from '../components/LocationSelector';
import SaveSearchButton from '../components/SaveSearchButton';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = CATEGORIES.find(c => c.id === categoryId);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredAds = sampleAds
    .filter((ad) => {
      const matchesCategory = ad.category === categoryId;
      const matchesSearch = !debouncedSearch || 
        ad.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        ad.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesLocation = !selectedLocation || ad.location === selectedLocation;
      const matchesPrice = ad.price >= priceRange[0] && ad.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesLocation && matchesPrice;
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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Catégorie non trouvée</h2>
          <p className="mt-2 text-gray-600">La catégorie que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <category.icon className="mr-2 h-6 w-6" />
            {category.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Explorez notre sélection d'annonces dans la catégorie {category.name.toLowerCase()}
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une annonce..."
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

          {/* Filtres étendus */}
          {showFilters && (
            <div className="p-6 bg-white rounded-lg border border-gray-200 animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Prix</h3>
                  <PriceRangeSelector
                    min={0}
                    max={100000}
                    onChange={setPriceRange}
                    initialRange={priceRange}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Localisation</h3>
                  <LocationSelector
                    onSelect={setSelectedLocation}
                    selectedLocation={selectedLocation}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Trier par</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="recent">Plus récent</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <SaveSearchButton
                  searchQuery={searchTerm}
                  category={categoryId}
                  location={selectedLocation}
                />
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLocation(null);
                    setPriceRange([0, 100000]);
                    setSortBy('recent');
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredAds.length} annonce{filteredAds.length > 1 ? 's' : ''}
          </h2>
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
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune annonce</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aucune annonce ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}