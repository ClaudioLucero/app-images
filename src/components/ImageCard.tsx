// src/components/ImageCard.tsx
import React from 'react';
import LazyLoad from 'react-lazyload';
import Skeleton from './Skeleton'; // Importa el componente Skeleton
import { Image } from '../types/image';
import { HeartIcon } from '@radix-ui/react-icons'; // Suponiendo que este es el ícono de favorito

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <LazyLoad
      height={300} // Ajusta a la altura de tus imágenes
      offset={100} // Cuánto antes de llegar al viewport se cargará la imagen
      placeholder={<Skeleton />} // Muestra el Skeleton mientras carga la imagen
    >
      <div className="relative">
        <img
          src={image.download_url}
          alt={image.author}
          className="w-full h-72 object-cover rounded" // Ajusta la altura si es necesario
        />
        <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg">
          <HeartIcon className="text-red-500 cursor-pointer" />
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
          {image.author}
        </div>
      </div>
    </LazyLoad>
  );
};

export default ImageCard;
