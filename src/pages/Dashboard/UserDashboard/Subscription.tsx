import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Crown, Check } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../../constants/subscriptions';
import { cn } from '../../../utils/cn';

export default function UserSubscription() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscription || 'free');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Abonnement</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez votre abonnement et découvrez nos différentes offres
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([type, plan]) => (
          <div
            key={type}
            className={cn(
              "bg-white rounded-lg shadow-sm p-6",
              "border-2 transition-colors",
              selectedPlan === type
                ? "border-red-500 ring-2 ring-red-500"
                : "border-transparent hover:border-red-200"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              {selectedPlan === type && (
                <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                {plan.price === 0 ? 'Gratuit' : `${plan.price} CHF`}
                <span className="text-sm font-normal text-gray-500">/mois</span>
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="flex items-center text-sm text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Jusqu'à {plan.features.maxPhotos} photos
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Visible {plan.features.durationDays} jours
              </li>
              {plan.features.urgent && (
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Option "Urgent" disponible
                </li>
              )}
              {plan.features.stats && (
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Statistiques détaillées
                </li>
              )}
              {plan.features.highlighted && (
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Annonce mise en avant
                </li>
              )}
            </ul>

            <button
              onClick={() => setSelectedPlan(type as any)}
              className={cn(
                "mt-8 w-full px-4 py-2 rounded-lg font-medium",
                selectedPlan === type
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {selectedPlan === type ? 'Plan actuel' : 'Choisir ce plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}