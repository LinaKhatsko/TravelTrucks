import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (camperId: string) => {
        const { favorites } = get();
        const isAlreadyFav = favorites.includes(camperId);

        if (isAlreadyFav) {
          set({ favorites: favorites.filter((id) => id !== camperId) });
        } else {
          set({ favorites: [...favorites, camperId] });
        }
      },

      isFavorite: (camperId: string) => {
        return get().favorites.includes(camperId);
      },
    }),
    {
      name: 'camper-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);