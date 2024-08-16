import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Image } from '../types/image';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import Skeleton from './Skeleton';
import { useFavoritesStore } from '../stores/favorites';
import ConfirmationDialog from '../components/ConfirmDialog'; // Asegúrate de que el nombre del archivo sea correcto

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleClick = () => {
    navigate(`/image/${image.id}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic en el ícono de favorito propague el evento

    if (isFavorite(image.id)) {
      // Si es un favorito, muestra el diálogo para confirmar su eliminación
      setPendingAction(() => () => removeFavorite(image.id));
      setDialogOpen(true);
    } else {
      // Si no es un favorito, simplemente agrégalo
      addFavorite(image);
    }
  };

  const handleConfirm = async () => {
    if (pendingAction) {
      await pendingAction(); // Ejecuta la acción pendiente
    }
    setDialogOpen(false);
    navigate('/home'); // Redirige a la página de inicio después de la confirmación
  };

  const handleCancel = () => {
    setDialogOpen(false); // Solo cierra el diálogo sin hacer nada más
    // No hacemos ninguna redirección aquí
  };

  return (
    <div className="relative" onClick={handleClick}>
      {!loaded && <Skeleton />}
      <LazyLoadImage
        src={image.download_url}
        alt={image.author}
        effect="blur"
        height={300}
        className="w-full h-72 object-cover rounded cursor-pointer"
        afterLoad={() => setLoaded(true)}
      />
      <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg">
        {isFavorite(image.id) ? (
          <HeartFilledIcon
            className="text-red-500 cursor-pointer"
            onClick={handleFavoriteToggle}
          />
        ) : (
          <HeartIcon
            className="text-gray-500 cursor-pointer"
            onClick={handleFavoriteToggle}
          />
        )}
      </div>
      <div className="absolute bottom-5 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
        {image.author}
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ImageCard;
