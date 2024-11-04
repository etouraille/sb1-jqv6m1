import type { SubscriptionType } from '../types';

interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  features: {
    maxPhotos: number;
    durationDays: number;
    urgent: boolean;
    stats: boolean;
    highlighted: boolean;
  };
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionType, SubscriptionPlan> = {
  free: {
    name: 'Gratuit',
    price: 0,
    description: 'Pour commencer',
    features: {
      maxPhotos: 3,
      durationDays: 30,
      urgent: false,
      stats: false,
      highlighted: false,
    },
  },
  basic: {
    name: 'Basic',
    price: 4.99,
    description: 'Pour les particuliers',
    features: {
      maxPhotos: 5,
      durationDays: 30,
      urgent: false,
      stats: true,
      highlighted: false,
    },
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    description: 'Pour les vendeurs réguliers',
    features: {
      maxPhotos: 10,
      durationDays: 30,
      urgent: true,
      stats: true,
      highlighted: true,
    },
  },
  professional: {
    name: 'Professionnel',
    price: 29.99,
    description: 'Pour les professionnels',
    features: {
      maxPhotos: 20,
      durationDays: 60,
      urgent: true,
      stats: true,
      highlighted: true,
    },
  },
};