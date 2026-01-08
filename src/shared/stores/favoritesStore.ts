import { create } from 'zustand';
import { FavoriteRepository } from '../repositories/FavoriteRepository';
import { FavoriteType } from '../../types';

interface FavoritesState {
  favorites: Set<string>; // Set of "type:id" strings
  isLoading: boolean;
  loadFavorites: () => Promise<void>;
  isFavorite: (type: FavoriteType, id: string) => boolean;
  toggleFavorite: (type: FavoriteType, id: string) => Promise<void>;
}

const favoriteRepo = new FavoriteRepository();

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),
  isLoading: false,

  loadFavorites: async () => {
    set({ isLoading: true });
    try {
      const favorites = await favoriteRepo.getAll();
      const favoritesSet = new Set(
        favorites.map((fav) => `${fav.itemType}:${fav.itemId}`)
      );
      set({ favorites: favoritesSet, isLoading: false });
    } catch (error) {
      console.error('Failed to load favorites:', error);
      set({ isLoading: false });
    }
  },

  isFavorite: (type, id) => {
    const key = `${type}:${id}`;
    return get().favorites.has(key);
  },

  toggleFavorite: async (type, id) => {
    try {
      await favoriteRepo.toggleFavorite(type, id);
      const current = get().favorites;
      const key = `${type}:${id}`;
      const newFavorites = new Set(current);

      if (newFavorites.has(key)) {
        newFavorites.delete(key);
      } else {
        newFavorites.add(key);
      }

      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  },
}));

