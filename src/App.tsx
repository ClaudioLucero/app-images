import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { useStore } from './store'; // Importa tu tienda Zustand

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
      {/* Otras rutas */}
    </Routes>
  );
};

export default App;
