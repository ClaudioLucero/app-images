// Menu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store'; // Asegúrate de importar tu tienda Zustand

interface MenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore(); // Usa Zustand para actualizar el estado de autenticación

  const handleLogout = () => {
    // Elimina el estado de autenticación en localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Actualiza el estado en Zustand
    setIsLoggedIn(false);
    // Redirige al login
    navigate('/login');
  };

  // Recupera el nombre de usuario del localStorage
  const username = localStorage.getItem('username') || 'Nombre Usuario';

  return (
    <>
      {/* Menú */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg z-30 transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-1/4`} // Oculto en mobile, visible en desktop
        style={{ width: '25vw' }} // Menú ocupa un cuarto del ancho de la pantalla
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
              <p className="font-bold">{username}</p>
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
    </>
  );
};

export default Menu;
