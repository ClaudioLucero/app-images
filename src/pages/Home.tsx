// Home.tsx
import React, { useState } from 'react';
import Menu from '../components/Menu'; // Importa el componente Menu

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative flex h-screen">
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      {/* Contenido principal */}
      <div className="flex-1 p-4 overflow-y-auto">
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
