import { User } from '../types';

export const sampleUsers: User[] = [
  {
    id: 'user1',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    verified: true,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-03-15'),
    subscription: 'basic',
    totalAds: 5,
    activeAds: 3,
    rating: 4.5,
    reviews: 12
  },
  {
    id: 'user2',
    email: 'marie@example.com',
    name: 'Marie Dupont',
    role: 'user',
    verified: true,
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date('2024-03-14'),
    subscription: 'premium',
    totalAds: 8,
    activeAds: 6,
    rating: 4.8,
    reviews: 15
  },
  {
    id: 'user3',
    email: 'pierre@example.com',
    name: 'Pierre Martin',
    role: 'user',
    verified: false,
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-03-15'),
    subscription: 'free',
    totalAds: 2,
    activeAds: 2,
    rating: 0,
    reviews: 0
  },
  {
    id: 'admin1',
    email: 'admin@occasi.ch',
    name: 'Admin',
    role: 'admin',
    verified: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-03-15'),
    subscription: 'professional',
    totalAds: 0,
    activeAds: 0,
    rating: 0,
    reviews: 0
  }
];