import { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdStore } from '../../stores/useAdStore';
import { sampleAds } from '../../data/sampleData';
import { cn } from '../../utils/cn';

export default function FavoriteAdsPreview() {
  const { favorites, removeFromFavorites } = useAdStore();
  const favoriteAds = sampleAds
    .filter(ad => favorites.includes(ad.id))
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Annonces favorites</h3>
        <Link
          to="/dashboard/favorites"
          className="flex items-center text-sm text-red-600 hover:text-red-700"
        >
          Voir tous les favoris
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {favoriteAds.length === 0 ? (
          <div className="text-center py-6">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun favori</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez à ajouter des annonces à vos favoris
            </p>
          </div>
        ) : (
          favoriteAds.map((ad) => (
            <div
              key={ad.id}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {ad.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  CHF {ad.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => removeFromFavorites(ad.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Heart className="h-5 w-5" fill="currentColor" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}