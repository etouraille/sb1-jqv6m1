import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

const SWISS_CITIES = [
  'Genève',
  'Lausanne',
  'Zürich',
  'Berne',
  'Bâle',
  'Lugano',
  'Lucerne',
  'St-Gall',
  'Sion',
  'Fribourg',
  'Neuchâtel',
  'Montreux',
] as const;

interface LocationSelectorProps {
  onSelect: (location: string) => void;
  selectedLocation?: string;
}

export default function LocationSelector({ onSelect, selectedLocation }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (city: string) => {
    onSelect(city);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 rounded-lg",
          "bg-white border border-gray-200",
          "hover:bg-gray-50 transition-colors"
        )}
      >
        <MapPin size={20} className="text-gray-500" />
        <span className="text-gray-700">
          {selectedLocation || 'Choisir une ville'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {SWISS_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handleSelect(city)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm",
                  "hover:bg-gray-50 transition-colors",
                  selectedLocation === city && "bg-red-50 text-red-600"
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}