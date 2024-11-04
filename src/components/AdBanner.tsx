import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

interface AdBannerProps {
  position: 'top' | 'sidebar' | 'native';
  format: 'banner' | 'square' | 'rectangle';
  onClose?: () => void;
}

export default function AdBanner({ position, format, onClose }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "relative bg-white border border-gray-200 rounded-lg overflow-hidden",
      position === 'top' && "w-full h-24",
      position === 'sidebar' && "w-full h-64",
      position === 'native' && "w-full aspect-video"
    )}>
      {/* Zone de publicité */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400">Espace publicitaire</span>
      </div>

      {/* Badge "Publicité" */}
      <div className="absolute top-2 left-2">
        <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
          Publicité
        </span>
      </div>

      {/* Bouton fermer */}
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
        >
          <X size={16} className="text-gray-400" />
        </button>
      )}
    </div>
  );
}