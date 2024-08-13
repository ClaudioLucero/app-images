import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido a la Página de Inicio
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
