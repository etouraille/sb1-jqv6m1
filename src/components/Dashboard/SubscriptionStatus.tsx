import { Crown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '../../constants/subscriptions';
import type { SubscriptionType } from '../../types';
import { cn } from '../../utils/cn';

interface SubscriptionStatusProps {
  subscription?: SubscriptionType;
}

export default function SubscriptionStatus({ subscription = 'free' }: SubscriptionStatusProps) {
  const plan = SUBSCRIPTION_PLANS[subscription];
  const nextPlan = subscription === 'free' ? 'basic' :
                   subscription === 'basic' ? 'premium' :
                   subscription === 'premium' ? 'professional' : null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Plan {plan.name}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {plan.description}
          </p>
        </div>
        {nextPlan && (
          <Link
            to="/dashboard/subscription"
            className="flex items-center text-sm text-red-600 hover:text-red-700"
          >
            Passer au plan {SUBSCRIPTION_PLANS[nextPlan].name}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Photos max</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {plan.features.maxPhotos}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Durée</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {plan.features.durationDays}j
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Option urgent</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {plan.features.urgent ? 'Oui' : 'Non'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Statistiques</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {plan.features.stats ? 'Oui' : 'Non'}
          </p>
        </div>
      </div>
    </div>
  );
}