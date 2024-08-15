// App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importa React Query
import Login from './pages/Login';
import Home from './pages/Home';
import ImageDetail from './pages/ImageDetail';
import { useStore } from './stores/login'; // Importa tu tienda Zustand

const queryClient = new QueryClient(); // Crea una instancia de QueryClient

const App: React.FC = () => {
  const { isLoggedIn } = useStore(); // Usa Zustand para obtener el estado de autenticación

  // Verifica el estado de autenticación desde localStorage al inicio
  React.useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn !== isLoggedIn) {
      // Actualiza Zustand si es necesario
      useStore.getState().setIsLoggedIn(storedIsLoggedIn);
    }
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/image/:id"
          element={
            isLoggedIn ? <ImageDetail /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
