export type UserRole = 'admin' | 'user';
export type SubscriptionType = 'free' | 'basic' | 'premium' | 'professional';

export interface UserStats {
  views: number;
  messages: number;
  favorites: number;
  sales: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
  lastLogin: Date;
  avatar?: string;
  subscription: SubscriptionType;
  totalAds: number;
  activeAds: number;
  rating: number;
  reviews: number;
  location?: string;
  phone?: string;
  stats: UserStats;
}