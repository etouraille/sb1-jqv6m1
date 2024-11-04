import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Ad } from '../types';
import { cn } from '../utils/cn';

interface SimilarAdsProps {
  currentAd: Ad;
  ads: Ad[];
}

export default function SimilarAds({ currentAd, ads }: SimilarAdsProps) {
  const navigate = useNavigate();
  
  const similarAds = ads
    .filter(ad => 
      ad.id !== currentAd.id && 
      ad.category === currentAd.category &&
      Math.abs(ad.price - currentAd.price) < currentAd.price * 0.5
    )
    .slice(0, 4);

  if (similarAds.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Annonces similaires</h3>
        <button 
          onClick={() => navigate(`/search?category=${currentAd.category}`)}
          className="text-red-600 hover:text-red-700 flex items-center"
        >
          Voir plus
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {similarAds.map(ad => (
          <div
            key={ad.id}
            onClick={() => navigate(`/ad/${ad.id}`)}
            className={cn(
              "flex space-x-4 p-3 rounded-lg cursor-pointer",
              "hover:bg-gray-50 transition-colors"
            )}
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{ad.title}</h4>
              <p className="text-sm text-gray-500 truncate">{ad.location}</p>
              <p className="mt-1 font-bold text-red-600">{ad.price} CHF</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}