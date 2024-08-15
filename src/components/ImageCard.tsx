import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Image } from '../types/image';
import { HeartIcon } from '@radix-ui/react-icons'; // Suponiendo que este es el ícono de favorito
import Skeleton from './Skeleton'; // Importa el componente Skeleton

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const handleClick = () => {
    navigate(`/image/${image.id}`); // Redirige a la página de detalle
  };

  return (
    <div className="relative" onClick={handleClick}>
      {!loaded && <Skeleton />}{' '}
      {/* Muestra el Skeleton mientras la imagen no esté cargada */}
      <LazyLoadImage
        src={image.download_url}
        alt={image.author}
        effect="blur"
        height={300} // Ajusta a la altura de tus imágenes
        className="w-full h-72 object-cover rounded cursor-pointer"
        afterLoad={() => setLoaded(true)} // Establece el estado a true cuando la imagen se cargue
      />
      <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg">
        <HeartIcon className="text-red-500 cursor-pointer" />
      </div>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
        {image.author}
      </div>
    </div>
  );
};

export default ImageCard;
