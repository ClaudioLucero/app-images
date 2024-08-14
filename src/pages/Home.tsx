// src/pages/Home.tsx
import React from 'react';
import Menu from '../components/Menu';
import { useImages } from '../services/imageService';
import { Image } from '../types/image';
import ImageCard from '../components/ImageCard'; // Asegúrate de importar ImageCard

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { data: images, error, isLoading } = useImages();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative flex h-screen">
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
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
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
