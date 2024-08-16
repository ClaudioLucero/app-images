import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useImages } from '../services/imageService';
import ImageCard from '../components/ImageCard';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Loader from '../components/Loader';
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
      if (isLoading) return; // Si se están cargando imágenes, no se hace nada
      if (observer.current) observer.current.disconnect(); // Desconecta el observer si ya está observando algo

      observer.current = new IntersectionObserver((entries) => {
        // El callback se ejecuta cuando las entradas (entries) observadas cambian
        if (entries[0].isIntersecting && hasNextPage) {
          // Si la primera entrada (entries[0]) está intersectando con el viewport y hay más páginas
          fetchNextPage(); // Llama a la función para cargar la siguiente página de imágenes
        }
      });

      if (node) observer.current.observe(node); // Si el nodo no es nulo, comienza a observarlo
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
    <div className="relative">
      <Header toggleMenu={toggleMenu} />
      <Menu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        onViewFavorites={handleViewFavorites}
        onViewAll={handleViewAll}
      />
      <div
        className={`transition-all duration-300 pt-16`} // Asegura que el margen izquierdo no cambie
        style={{ marginLeft: menuOpen ? '0' : '0' }} // Ajusta el espacio para el menú en móvil
      >
        {isLoading && <Loader />}
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
