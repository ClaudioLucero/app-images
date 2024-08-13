// store.ts
import create from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  username: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUsername: (username: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  username: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUsername: (username: string | null) => set({ username }),
}));
