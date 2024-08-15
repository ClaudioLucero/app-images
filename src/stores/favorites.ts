// store/favorites.ts
import create from 'zustand';
import { Image } from '../types/image';
import {
  saveToFavorites,
  removeFromFavorites,
  getFavorites,
} from '../services/indexedDB';

interface FavoritesState {
  favorites: Image[];
  addFavorite: (image: Image) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  initializeFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: async (image) => {
    await saveToFavorites(image);
    set((state) => ({
      favorites: [...state.favorites, image],
    }));
  },
  removeFavorite: async (id) => {
    await removeFromFavorites(id);
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    }));
  },
  isFavorite: (id) => {
    const state = get();
    return state.favorites.some((fav: Image) => fav.id === id);
  },
  initializeFavorites: async () => {
    try {
      const favorites = await getFavorites();
      set({ favorites });
    } catch (error) {
      console.error('Error initializing favorites:', error);
    }
  },
}));
