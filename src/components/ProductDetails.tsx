import { useMemo } from 'react';
import { CATEGORIES } from '../constants/categories';
import type { Ad } from '../types';
import { cn } from '../utils/cn';

interface ProductDetailsProps {
  ad: Ad;
}

export default function ProductDetails({ ad }: ProductDetailsProps) {
  const category = useMemo(() => 
    CATEGORIES.find(c => c.id === ad.category),
    [ad.category]
  );

  if (!category) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Caractéristiques détaillées</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Caractéristiques de base */}
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-500">État</span>
            <span className={cn(
              "ml-2 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
              {
                'bg-green-100 text-green-800': ad.condition === 'new',
                'bg-blue-100 text-blue-800': ad.condition === 'like-new',
                'bg-yellow-100 text-yellow-800': ad.condition === 'good',
                'bg-orange-100 text-orange-800': ad.condition === 'fair',
                'bg-red-100 text-red-800': ad.condition === 'poor',
              }
            )}>
              {ad.condition === 'new' ? 'Neuf' :
               ad.condition === 'like-new' ? 'Comme neuf' :
               ad.condition === 'good' ? 'Bon état' :
               ad.condition === 'fair' ? 'État moyen' :
               'À rénover'}
            </span>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Catégorie</span>
            <p className="mt-1 text-sm text-gray-900">{category.name}</p>
          </div>

          {ad.subcategory && (
            <div>
              <span className="text-sm font-medium text-gray-500">Sous-catégorie</span>
              <p className="mt-1 text-sm text-gray-900">{ad.subcategory}</p>
            </div>
          )}
        </div>

        {/* Caractéristiques spécifiques à la catégorie */}
        <div className="space-y-4">
          {category.fields.map((field) => (
            <div key={field.name}>
              <span className="text-sm font-medium text-gray-500">{field.label}</span>
              {field.type === 'boolean' ? (
                <span className={cn(
                  "ml-2 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                  ad[field.name] ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                )}>
                  {ad[field.name] ? 'Oui' : 'Non'}
                </span>
              ) : field.type === 'select' ? (
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {ad[field.name]}
                </p>
              ) : field.type === 'number' ? (
                <p className="mt-1 text-sm text-gray-900">
                  {ad[field.name]}
                  {field.unit && <span className="text-gray-500 ml-1">{field.unit}</span>}
                </p>
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {ad[field.name] || '-'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}