// Home.tsx
import React, { useState } from 'react';
import Menu from '../components/Menu'; // Importa el componente Menu
import { useImages } from '../services/imageService'; // Importa el hook de imágenes
import { Image } from '../types/image'; // Importa el tipo

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: images, error, isLoading } = useImages(); // Usa React Query para obtener imágenes

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative flex h-screen">
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      {/* Contenido principal */}
      <div
        className={`flex-1 p-4 ${menuOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300`}
      >
        <button
          className="md:hidden p-2 mb-4 bg-gray-700 text-white rounded"
          onClick={toggleMenu}
        >
          Menu
        </button>
        {isLoading && <div>Cargando...</div>}
        {error && <div>{`Error al cargar imágenes: ${error.message}`}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image: Image) => (
            <div key={image.id} className="relative">
              <img
                src={image.download_url}
                alt={image.author}
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
