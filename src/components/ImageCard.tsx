import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Image } from '../types/image';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import Skeleton from './Skeleton';
import { useFavoritesStore } from '../stores/favorites';
import ConfirmationDialog from '../components/ConfirmDialog';

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  // Estados locales para controlar la carga de la imagen, el estado del diálogo de confirmación, y la acción pendiente
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Estado de la tienda de favoritos, utilizando Zustand
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  // Maneja el clic en la imagen para navegar a la página de detalles
  const handleClick = () => {
    navigate(`/image/${image.id}`);
  };

  // Maneja el cambio en el estado de favorito
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic en el ícono de favorito active la navegación

    // Si la imagen ya está en favoritos, abre el diálogo de confirmación antes de eliminarla
    if (isFavorite(image.id)) {
      setPendingAction(() => () => removeFavorite(image.id));
      setDialogOpen(true);
    } else {
      addFavorite(image); // Si no está en favoritos, la agrega directamente
    }
  };

  // Maneja la confirmación del diálogo para remover de favoritos
  const handleConfirm = async () => {
    if (pendingAction) {
      await pendingAction(); // Ejecuta la acción pendiente, en este caso, remover de favoritos
    }
    setDialogOpen(false); // Cierra el diálogo
    navigate('/home'); // Redirige a la página principal
  };

  // Maneja la cancelación del diálogo de confirmación
  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <div className="relative w-full h-72 sm:h-auto" onClick={handleClick}>
      {!loaded && <Skeleton />}

      <LazyLoadImage
        src={image.download_url}
        alt={image.author}
        effect="blur"
        height={300}
        className="w-full h-72 object-cover rounded cursor-pointer"
        afterLoad={() => setLoaded(true)} // Actualiza el estado cuando la imagen ha cargado
      />

      <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg z-20 sm:top-2 sm:right-2">
        {isFavorite(image.id) ? (
          <HeartFilledIcon
            className="text-red-500 cursor-pointer"
            onClick={handleFavoriteToggle} // Llama a la función para alternar el estado de favorito
          />
        ) : (
          <HeartIcon
            className="text-gray-500 cursor-pointer"
            onClick={handleFavoriteToggle}
          />
        )}
      </div>

      {/* Información del autor de la imagen, que aparece en la parte inferior izquierda */}
      <div className="absolute bottom-5 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
        {image.author}
      </div>

      {/* Diálogo de confirmación para remover de favoritos */}
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCancel} // Cierra el diálogo sin hacer nada
        onConfirm={handleConfirm} // Confirma y ejecuta la acción pendiente
        onCancel={handleCancel} // Cancela la acción y cierra el diálogo
      />
    </div>
  );
};

export default ImageCard;
