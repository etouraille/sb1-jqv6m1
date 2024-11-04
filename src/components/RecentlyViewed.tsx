import { History } from 'lucide-react';
import { useAdStore } from '../stores/useAdStore';
import { sampleAds } from '../data/sampleData';
import { cn } from '../utils/cn';

export default function RecentlyViewed() {
  const { recentlyViewed } = useAdStore();
  const recentAds = recentlyViewed
    .map(id => sampleAds.find(ad => ad.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (recentAds.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center mb-4">
        <History className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold">Vus récemment</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recentAds.map((ad) => (
          <a
            key={ad.id}
            href={`/ad/${ad.id}`}
            className="group relative aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
              <p className="text-sm font-medium truncate">{ad.title}</p>
              <p className="text-sm font-bold">{ad.price} CHF</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}