import { useState } from 'react';
import { Eye, PenSquare, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Ad } from '../../types';

interface AdListProps {
  ads: Ad[];
  onEdit?: (ad: Ad) => void;
  onDelete?: (ad: Ad) => void;
  onView?: (ad: Ad) => void;
}

export default function AdList({ ads, onEdit, onDelete, onView }: AdListProps) {
  const [selectedAds, setSelectedAds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedAds.length === ads.length) {
      setSelectedAds([]);
    } else {
      setSelectedAds(ads.map(ad => ad.id));
    }
  };

  const toggleSelect = (adId: string) => {
    if (selectedAds.includes(adId)) {
      setSelectedAds(selectedAds.filter(id => id !== adId));
    } else {
      setSelectedAds([...selectedAds, adId]);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedAds.length === ads.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annonce
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vues
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedAds.includes(ad.id)}
                    onChange={() => toggleSelect(ad.id)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </td>
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
                    {onView && (
                      <button 
                        onClick={() => onView(ad)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    {onEdit && (
                      <button 
                        onClick={() => onEdit(ad)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PenSquare size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(ad)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
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