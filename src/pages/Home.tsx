import React, { useRef, useCallback, useState } from 'react';
import { useImages } from '../services/imageService';
import ImageCard from '../components/ImageCard';
import Menu from '../components/Menu'; // Asegúrate de importar el componente Menu
import { Image } from '../types/image';

const Home: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useImages();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la apertura del menú

  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, hasNextPage],
  );

  const images: Image[] = data?.pages.flatMap((page) => page.images) ?? [];

  // Función para alternar la apertura del menú
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div>
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <button
        className="fixed top-4 left-4 z-30 md:hidden"
        onClick={toggleMenu}
      >
        <span className="material-icons">menu</span>
      </button>
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>{`Error al cargar imágenes: ${error.message}`}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={index === images.length - 1 ? lastImageElementRef : null}
            >
              <ImageCard image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
