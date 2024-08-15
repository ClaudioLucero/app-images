// src/components/Header.tsx

import React from 'react';
import { TextAlignJustifyIcon } from '@radix-ui/react-icons'; // Asegúrate de tener react-icons instalado
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/login';

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore();

  const handleLogout = () => {
    // Elimina el estado de autenticación en localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Actualiza el estado en Zustand
    setIsLoggedIn(false);
    // Redirige al login
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-gray-600 text-white z-50">
      {/* Botón de menú */}
      <button onClick={toggleMenu} aria-label="Abrir menú">
        <TextAlignJustifyIcon />
      </button>

      {/* Espacio reservado para el contenido del medio, como el logo o el título */}
      <div className="flex-1"></div>

      {/* Botón de cerrar sesión */}
      <button
        className="text-red-500 hover:text-red-700"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
