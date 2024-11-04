import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import AdCard from './AdCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/cn';
import type { Ad } from '../types';

interface AdGridProps {
  ads: Ad[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function AdGrid({ ads, loading, hasMore, onLoadMore }: AdGridProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { targetRef, isIntersecting } = useIntersectionObserver();

  // Charger plus d'annonces quand on atteint le bas
  if (isIntersecting && hasMore && onLoadMore && !loading) {
    onLoadMore();
  }

  return (
    <div>
      {/* Contrôles de vue */}
      <div className="flex justify-end mb-4">
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

      {/* Grille d'annonces */}
      <div className={cn(
        'grid gap-6',
        view === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      )}>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} view={view} />
        ))}
      </div>

      {/* Loader et "Charger plus" */}
      {(loading || hasMore) && (
        <div ref={targetRef} className="mt-8 text-center">
          {loading ? (
            <div className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
              Chargement...
            </div>
          ) : hasMore ? (
            <button
              onClick={onLoadMore}
              className="inline-flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              Charger plus d'annonces
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}