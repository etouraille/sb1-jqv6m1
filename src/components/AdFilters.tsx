import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useFilterStore } from '../stores/useFilterStore';
import { cn } from '../utils/cn';

const locations = [
  'Genève',
  'Lausanne',
  'Zürich',
  'Berne',
  'Bâle',
  'Lugano',
  'Lucerne',
  'St-Gall',
];

const conditions = [
  { value: 'new', label: 'Neuf' },
  { value: 'like-new', label: 'Comme neuf' },
  { value: 'good', label: 'Bon état' },
  { value: 'fair', label: 'État moyen' },
  { value: 'poor', label: 'À rénover' },
];

export default function AdFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    priceRange,
    location,
    condition,
    setPriceRange,
    setLocation,
    setCondition,
    reset,
  } = useFilterStore();

  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleApply = () => {
    setPriceRange(localPriceRange);
    setIsOpen(false);
  };

  const handleReset = () => {
    reset();
    setLocalPriceRange([0, 1000000]);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix (CHF)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) => setLocalPriceRange([+e.target.value, localPriceRange[1]])}
              className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) => setLocalPriceRange([localPriceRange[0], +e.target.value])}
              className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Lieu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu
          </label>
          <select
            value={location || ''}
            onChange={(e) => setLocation(e.target.value || null)}
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Tous les lieux</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* État */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            État
          </label>
          <select
            value={condition || ''}
            onChange={(e) => setCondition(e.target.value || null)}
            className="w-full rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Tous les états</option>
            {conditions.map((cond) => (
              <option key={cond.value} value={cond.value}>{cond.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
        >
          Réinitialiser
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}