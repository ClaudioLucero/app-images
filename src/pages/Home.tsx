import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useImages } from '../services/imageService';
import ImageCard from '../components/ImageCard';
import Menu from '../components/Menu';
import { Image } from '../types/image';
import { useFavoritesStore } from '../stores/favorites';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useImages();
  const { favorites, initializeFavorites } = useFavoritesStore();

  useEffect(() => {
    initializeFavorites(); // Inicializa favoritos al montar el componente
  }, [initializeFavorites]);

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

  const images: Image[] = showFavorites
    ? favorites
    : (data?.pages.flatMap((page) => page.images) ?? []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleViewFavorites = () => setShowFavorites(true);
  const handleViewAll = () => setShowFavorites(false);

  return (
    <div>
      <Menu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        onViewFavorites={handleViewFavorites}
        onViewAll={handleViewAll}
      />
      <button
        className="fixed top-4 left-4 z-30 md:hidden"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="material-icons">menu</span>
      </button>
      <div>
        {isLoading && <div className="text-center">Loading...</div>}
        {error && (
          <div className="text-red-500">{`Error al cargar imágenes: ${error.message}`}</div>
        )}
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
