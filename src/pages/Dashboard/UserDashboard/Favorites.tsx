import { useState } from 'react';
import { Grid, List, Heart, Share2, MessageCircle } from 'lucide-react';
import { useAdStore } from '../../../stores/useAdStore';
import { sampleAds } from '../../../data/sampleData';
import { cn } from '../../../utils/cn';

export default function UserFavorites() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { favorites, removeFromFavorites } = useAdStore();
  
  const favoriteAds = sampleAds.filter(ad => favorites.includes(ad.id));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes favoris</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos annonces favorites
        </p>
      </div>

      <div className="flex justify-end mb-6">
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

      {favoriteAds.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun favori</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez à ajouter des annonces à vos favoris
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteAds.map((ad) => (
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
                  <span className="text-sm text-gray-500">{ad.location}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
                      <MessageCircle size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-500">
                      <Share2 size={18} />
                    </button>
                    <button 
                      onClick={() => removeFromFavorites(ad.id)}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      <Heart size={18} fill="currentColor" />
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
                  Lieu
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {favoriteAds.map((ad) => (
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
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      CHF {ad.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-blue-500">
                        <MessageCircle size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-green-500">
                        <Share2 size={18} />
                      </button>
                      <button 
                        onClick={() => removeFromFavorites(ad.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Heart size={18} fill="currentColor" />
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