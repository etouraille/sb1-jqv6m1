import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Ad } from '../types';

interface AdStore {
  favorites: string[];
  recentlyViewed: string[];
  addToFavorites: (adId: string) => void;
  removeFromFavorites: (adId: string) => void;
  addToRecentlyViewed: (adId: string) => void;
  isFavorite: (adId: string) => boolean;
}

export const useAdStore = create<AdStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],
      addToFavorites: (adId) => {
        set((state) => ({
          favorites: [...state.favorites, adId],
        }));
      },
      removeFromFavorites: (adId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== adId),
        }));
      },
      addToRecentlyViewed: (adId) => {
        set((state) => {
          const newRecentlyViewed = [
            adId,
            ...state.recentlyViewed.filter((id) => id !== adId),
          ].slice(0, 10);
          return { recentlyViewed: newRecentlyViewed };
        });
      },
      isFavorite: (adId) => {
        return get().favorites.includes(adId);
      },
    }),
    {
      name: 'ad-storage',
    }
  )
);