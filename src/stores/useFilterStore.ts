import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterStore {
  priceRange: [number, number];
  location: string | null;
  condition: string | null;
  sortBy: 'recent' | 'price-asc' | 'price-desc';
  setPriceRange: (range: [number, number]) => void;
  setLocation: (location: string | null) => void;
  setCondition: (condition: string | null) => void;
  setSortBy: (sort: 'recent' | 'price-asc' | 'price-desc') => void;
  reset: () => void;
}

const initialState = {
  priceRange: [0, 1000000],
  location: null,
  condition: null,
  sortBy: 'recent' as const,
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPriceRange: (range) => set({ priceRange: range }),
      setLocation: (location) => set({ location }),
      setCondition: (condition) => set({ condition }),
      setSortBy: (sortBy) => set({ sortBy }),
      reset: () => set(initialState),
    }),
    {
      name: 'filter-storage',
    }
  )
);