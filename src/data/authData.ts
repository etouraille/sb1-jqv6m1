import { User } from '../types';

// Données des comptes de test
export const TEST_ACCOUNTS = {
  admin: {
    id: 'admin-1',
    email: 'admin@occasi.ch',
    password: 'admin123',
    name: 'Admin',
    role: 'admin' as const,
    verified: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    subscription: 'professional' as const,
    totalAds: 0,
    activeAds: 0,
    rating: 5,
    reviews: 0,
    location: 'Genève',
    phone: '+41 22 000 00 00',
    stats: {
      views: 0,
      messages: 0,
      favorites: 0,
      sales: 0
    }
  },
  admin2: {
    id: 'admin-2',
    email: 'nderim.bekjiri@gmail.com',
    password: '123456789',
    name: 'Nderim Bekjiri',
    role: 'admin' as const,
    verified: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80',
    subscription: 'professional' as const,
    totalAds: 0,
    activeAds: 0,
    rating: 5,
    reviews: 0,
    location: 'Genève',
    phone: '+41 22 000 00 00',
    stats: {
      views: 0,
      messages: 0,
      favorites: 0,
      sales: 0
    }
  },
  user: {
    id: 'user-1',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user' as const,
    verified: true,
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    subscription: 'basic' as const,
    totalAds: 5,
    activeAds: 3,
    rating: 4.5,
    reviews: 12,
    location: 'Lausanne',
    phone: '+41 21 000 00 00',
    stats: {
      views: 150,
      messages: 25,
      favorites: 12,
      sales: 3
    }
  }
} as const;

// Fonction pour vérifier les identifiants
export function verifyCredentials(email: string, password: string): User | null {
  // Vérifier les admins
  const adminAccount = Object.values(TEST_ACCOUNTS).find(
    account => account.role === 'admin' && 
    account.email === email && 
    account.password === password
  );
  
  if (adminAccount) {
    return { ...adminAccount, lastLogin: new Date() };
  }
  
  // Vérifier l'utilisateur test
  if (email === TEST_ACCOUNTS.user.email && password === TEST_ACCOUNTS.user.password) {
    return { ...TEST_ACCOUNTS.user, lastLogin: new Date() };
  }

  return null;
}

// Fonction pour récupérer les statistiques de l'utilisateur
export function getUserStats(userId: string) {
  const user = Object.values(TEST_ACCOUNTS).find(u => u.id === userId);
  return user?.stats || null;
}

// Fonction pour récupérer les annonces de l'utilisateur
export function getUserAds(userId: string) {
  return sampleAds.filter(ad => ad.userId === userId);
}

// Fonction pour récupérer les messages de l'utilisateur
export function getUserMessages(userId: string) {
  return sampleMessages.filter(msg => msg.senderId === userId || msg.receiverId === userId);
}

// Fonction pour récupérer les favoris de l'utilisateur
export function getUserFavorites(userId: string) {
  return sampleFavorites.filter(fav => fav.userId === userId);
}