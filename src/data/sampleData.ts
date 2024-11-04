import { Ad } from '../types';

export const sampleAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max',
    description: 'Excellent état, débloqué tout opérateur',
    price: 999,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Genève',
    category: 'electronics',
    subcategory: 'Smartphones',
    userId: 'user1',
    status: 'active',
    views: 150,
    favorites: 12,
    condition: 'like-new',
    deliveryType: 'both',
    createdAt: new Date('2024-03-15T10:30:00.000Z'),
    subscriptionType: 'premium'
  },
  {
    id: '2',
    title: 'MacBook Pro M3',
    description: 'MacBook Pro 14" M3 Pro, 18GB RAM, 512GB SSD',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Lausanne',
    category: 'electronics',
    subcategory: 'Ordinateurs portables',
    userId: 'user2',
    status: 'active',
    views: 234,
    favorites: 18,
    condition: 'new',
    deliveryType: 'pickup',
    createdAt: new Date('2024-03-14T15:45:00.000Z'),
    subscriptionType: 'professional'
  },
  {
    id: '3',
    title: 'Vélo électrique VanMoof',
    description: 'VanMoof S3, parfait état, batterie neuve',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Zürich',
    category: 'vehicles',
    subcategory: 'Vélos électriques',
    userId: 'user3',
    status: 'active',
    views: 89,
    favorites: 7,
    condition: 'good',
    deliveryType: 'pickup',
    createdAt: new Date('2024-03-13T09:20:00.000Z'),
    subscriptionType: 'basic'
  }
];