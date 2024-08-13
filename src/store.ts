import create from 'zustand';

// Define el estado y los métodos de la tienda
interface StoreState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Crea la tienda usando Zustand
export const useStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));
