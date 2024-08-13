import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store'; // Importa tu tienda Zustand

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore(); // Usa Zustand para actualizar el estado de autenticación

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    // Elimina el estado de autenticación en localStorage
    localStorage.removeItem('isLoggedIn');
    // Actualiza el estado en Zustand
    setIsLoggedIn(false);
    // Redirige al login
    navigate('/login');
  };

  return (
    <div className="relative flex">
      {/* Menú */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg z-30 transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64`}
        style={{ width: '25vw' }}
      >
        <div className="p-4">
          {/* Imagen de usuario */}
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Usuario"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold">Nombre Usuario</p>
            </div>
          </div>
          {/* Línea separadora */}
          <hr className="my-4 border-gray-300" />
          {/* Items del menú */}
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Mis imágenes
                </a>
              </li>
            </ul>
          </nav>
          {/* Botón de cerrar sesión */}
          <button
            className="absolute bottom-4 left-4 text-red-600 hover:text-red-800"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>
      {/* Contenido principal */}
      <div className="flex-1 p-4">
        <button
          className="md:hidden p-2 mb-4 bg-gray-700 text-white rounded"
          onClick={toggleMenu}
        >
          Menu
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="relative">
              <img
                src={`https://via.placeholder.com/300?text=Imagen+${index + 1}`}
                alt={`Imagen ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
