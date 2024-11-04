import { Check } from 'lucide-react';
import { cn } from '../utils/cn';
import type { SubscriptionType } from '../types';
import { SUBSCRIPTION_PLANS } from '../constants/subscriptions';
import SubscriptionBadge from './SubscriptionBadge';

interface SubscriptionCardProps {
  type: SubscriptionType;
  selected: boolean;
  onSelect: () => void;
}

export default function SubscriptionCard({ type, selected, onSelect }: SubscriptionCardProps) {
  const plan = SUBSCRIPTION_PLANS[type];

  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative p-6 rounded-lg cursor-pointer transition-all",
        "border-2",
        selected
          ? "border-red-500 bg-red-50"
          : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <SubscriptionBadge type={type} />
          <div className="mt-4">
            <span className="text-2xl font-bold">
              {plan.price === 0 ? 'Gratuit' : `${plan.price} CHF`}
            </span>
            <span className="text-gray-500 ml-1">/mois</span>
          </div>
        </div>
        {selected && (
          <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center text-sm">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          Jusqu'à {plan.features.maxPhotos} photos
        </li>
        <li className="flex items-center text-sm">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          Visible {plan.features.durationDays} jours
        </li>
        {plan.features.urgent && (
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            Option "Urgent" disponible
          </li>
        )}
        {plan.features.stats && (
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            Statistiques détaillées
          </li>
        )}
        {plan.features.highlighted && (
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            Annonce mise en avant
          </li>
        )}
      </ul>
    </div>
  );
}