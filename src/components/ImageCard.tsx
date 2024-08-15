import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Image } from '../types/image';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import Skeleton from './Skeleton';
import { useFavoritesStore } from '../stores/favorites';

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleClick = () => {
    navigate(`/image/${image.id}`);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(image.id)) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
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
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
          />
        ) : (
          <HeartIcon
            className="text-gray-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
          />
        )}
      </div>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
        {image.author}
      </div>
    </div>
  );
};

export default ImageCard;
