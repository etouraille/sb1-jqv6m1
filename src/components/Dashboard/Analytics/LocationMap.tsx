import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationData {
  city: string;
  count: number;
  percentage: number;
}

interface LocationMapProps {
  locations: LocationData[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Répartition géographique</h3>

      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.city} className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900">{location.city}</p>
                <p className="text-sm text-gray-500">{location.count} vues</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}