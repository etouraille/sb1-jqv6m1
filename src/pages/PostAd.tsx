import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { SUBSCRIPTION_PLANS } from '../constants/subscriptions';
import { CATEGORIES } from '../constants/categories';
import SubscriptionSelector from '../components/SubscriptionSelector';
import CategoryFields from '../components/CategoryFields';
import ImageUpload from '../components/ImageUpload';

export default function PostAd() {
  const [images, setImages] = useState<File[]>([]);
  const [subscriptionType, setSubscriptionType] = useState<keyof typeof SUBSCRIPTION_PLANS>('free');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categoryFields, setCategoryFields] = useState<Record<string, any>>({});

  const selectedCategory = CATEGORIES.find(c => c.id === category);
  const maxPhotos = SUBSCRIPTION_PLANS[subscriptionType].features.maxPhotos;

  const handleCategoryFieldChange = (name: string, value: any) => {
    setCategoryFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Déposer une annonce
        </h1>

        {/* Type d'abonnement */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Choisissez votre formule
          </h2>
          <SubscriptionSelector
            onSelect={setSubscriptionType}
            initialType={subscriptionType}
          />
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre de l'annonce
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Ex: BMW Série 3 2020"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
                setCategoryFields({});
              }}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Sélectionner une catégorie</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {category && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sous-catégorie
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {selectedCategory?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Champs spécifiques à la catégorie */}
          {selectedCategory && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informations spécifiques
              </h3>
              <CategoryFields
                fields={selectedCategory.fields}
                values={categoryFields}
                onChange={handleCategoryFieldChange}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prix (CHF)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Décrivez votre article en détail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photos ({images.length}/{maxPhotos})
            </label>
            <ImageUpload
              maxPhotos={maxPhotos}
              images={images}
              onImagesChange={setImages}
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                J'accepte les conditions générales
              </label>
              <p className="text-gray-500">
                En publiant cette annonce, vous acceptez nos conditions d'utilisation.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-gray-500">
                  Votre annonce sera examinée avant publication
                </p>
              </div>
              <button
                type="submit"
                className={cn(
                  "px-6 py-2 text-white rounded-lg",
                  "bg-red-600 hover:bg-red-700",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                )}
              >
                Publier l'annonce
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}