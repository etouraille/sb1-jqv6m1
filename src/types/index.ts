export type SubscriptionType = 'free' | 'basic' | 'premium' | 'professional';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  category: string;
  subcategory?: string;
  subscriptionType: SubscriptionType;
  urgent?: boolean;
  createdAt: Date;
  userId: string;
  status: 'active' | 'pending' | 'sold' | 'expired';
  views: number;
  favorites: number;
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  deliveryType: 'pickup' | 'shipping' | 'both';
  shippingPrice?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  subscriptionType: SubscriptionType;
  createdAt: Date;
  location?: string;
  phone?: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  totalAds: number;
  activeAds: number;
  lastLogin: Date;
}