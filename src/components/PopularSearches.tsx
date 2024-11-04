import { Sparkles, TrendingUp } from 'lucide-react';

export default function PopularSearches() {
  const popularSearches = [
    'iPhone 14',
    'PS5',
    'Vélo électrique',
    'Canapé',
    'MacBook',
    'Nintendo Switch',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center mb-3">
        <Sparkles className="text-yellow-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold">Recherches populaires</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((search) => (
          <a
            key={search}
            href={`/search?q=${encodeURIComponent(search)}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
          >
            {search}
          </a>
        ))}
      </div>
    </div>
  );
}