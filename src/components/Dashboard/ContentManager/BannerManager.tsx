import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Banner {
  id: string;
  title: string;
  type: 'promo' | 'info' | 'alert';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'scheduled' | 'ended';
}

const sampleBanners: Banner[] = [
  {
    id: '1',
    title: 'Soldes d\'été',
    type: 'promo',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    id: '2',
    title: 'Maintenance prévue',
    type: 'info',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: 'scheduled'
  }
];

export default function BannerManager() {
  const [banners, setBanners] = useState(sampleBanners);
  const [editingBanner, setEditingBanner] = useState<string | null>(null);

  const handleAddBanner = () => {
    // TODO: Implement banner creation
  };

  const handleEditBanner = (bannerId: string) => {
    setEditingBanner(bannerId);
  };

  const handleDeleteBanner = (bannerId: string) => {
    // TODO: Implement banner deletion with confirmation
  };

  const handlePreviewBanner = (bannerId: string) => {
    // TODO: Implement banner preview
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Bannières</h3>
        <button
          onClick={handleAddBanner}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une bannière
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "flex items-center justify-between p-4",
              index !== banners.length - 1 && "border-b border-gray-200"
            )}
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">{banner.title}</h4>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {banner.startDate.toLocaleDateString()} - {banner.endDate.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                {
                  'bg-green-100 text-green-800': banner.status === 'active',
                  'bg-yellow-100 text-yellow-800': banner.status === 'scheduled',
                  'bg-gray-100 text-gray-800': banner.status === 'ended'
                }
              )}>
                {banner.status === 'active' ? 'Active' :
                 banner.status === 'scheduled' ? 'Planifiée' : 'Terminée'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewBanner(banner.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditBanner(banner.id)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}