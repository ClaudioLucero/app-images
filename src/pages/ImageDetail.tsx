// src/pages/ImageDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useImageDetails } from '../services/imageService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Importa el efecto de desenfoque
import Skeleton from '../components/Skeleton';
import {
  HeartIcon,
  HeartFilledIcon,
  DownloadIcon,
  DoubleArrowLeftIcon,
} from '@radix-ui/react-icons';
import { useFavoritesStore } from '../stores/favorites';

const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL
  const navigate = useNavigate(); // Hook para la navegación

  // Usa el hook useImageDetails para obtener los detalles de la imagen
  const { data: image, isLoading, isError } = useImageDetails(id ?? '');

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [isImageFavorite, setIsImageFavorite] = useState(false);

  const handleBack = () => {
    navigate(-1); // Navega hacia atrás
  };

  const handleDownload = async () => {
    if (!image || !image.download_url) return;

    try {
      // Obtiene la imagen como Blob
      const response = await fetch(image.download_url);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Crea un enlace temporal para descargar la imagen
      const link = document.createElement('a');
      link.href = url;
      link.download = image.download_url.split('/').pop() || 'image.jpg'; // Nombre del archivo para la descarga
      link.style.display = 'none'; // Oculta el enlace
      document.body.appendChild(link);
      link.click();

      // Limpia el URL objeto y elimina el enlace
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(id!)) {
      removeFavorite(id!);
    } else {
      addFavorite(image!);
    }
    setIsImageFavorite(!isImageFavorite);
  };

  useEffect(() => {
    const checkIfFavorite = () => {
      setIsImageFavorite(isFavorite(id!));
    };
    checkIfFavorite();
  }, [id, isFavorite]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error fetching image details</p>
      </div>
    );

  if (!image)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Image not found
      </div>
    );

  const { download_url, author } = image;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 px-4 py-2 bg-black text-white rounded"
      >
        <DoubleArrowLeftIcon />
      </button>
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <LazyLoadImage
            src={download_url}
            alt={author}
            effect="blur"
            height={600}
            className="w-full object-cover"
          />
          <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg">
            {isImageFavorite ? (
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
          <div className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg">
            <DownloadIcon
              className="text-blue-500 cursor-pointer"
              onClick={handleDownload}
            />
          </div>
          <div className="absolute bottom-4 left-16 bg-black bg-opacity-50 text-white p-2 rounded">
            {author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
