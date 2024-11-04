import { Search, MapPin, Bell, ArrowDown } from 'lucide-react';
import { cn } from '../utils/cn';

export default function QuickActions() {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Recherche rapide */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center space-x-4 ml-4">
            <button className="flex items-center text-gray-600 hover:text-red-600">
              <MapPin size={20} className="mr-1" />
              <span>Près de chez vous</span>
              <ArrowDown size={16} className="ml-1" />
            </button>

            <button className="relative p-2 text-gray-600 hover:text-red-600">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}