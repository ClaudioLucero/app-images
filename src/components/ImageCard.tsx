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
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleClick = () => {
    navigate(`/image/${image.id}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite(image.id)) {
      setPendingAction(() => () => removeFavorite(image.id));
      setDialogOpen(true);
    } else {
      addFavorite(image);
    }
  };

  const handleConfirm = async () => {
    if (pendingAction) {
      await pendingAction();
    }
    setDialogOpen(false);
    navigate('/home');
  };

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
        afterLoad={() => setLoaded(true)}
      />
      <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg z-20 sm:top-2 sm:right-2">
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
