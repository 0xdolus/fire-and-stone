import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  ids: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const current = get().ids;
        if (current.includes(productId)) {
          set({ ids: current.filter((id) => id !== productId) });
        } else {
          set({ ids: [...current, productId] });
        }
      },
      isFavorite: (productId) => get().ids.includes(productId),
    }),
    {
      name: 'fire-and-stone-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
