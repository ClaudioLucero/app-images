import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate
import { useImageDetails } from '../services/imageService';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Importa LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Importa el efecto de desenfoque
import Skeleton from '../components/Skeleton'; // Asegúrate de importar el componente Skeleton
import { HeartIcon } from '@radix-ui/react-icons'; // Suponiendo que este es el ícono de favorito

const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL
  const navigate = useNavigate(); // Hook para la navegación

  // Usa el hook useImageDetails para obtener los detalles de la imagen
  const { data: image, isLoading, isError } = useImageDetails(id ?? '');

  const handleBack = () => {
    navigate(-1); // Navega hacia atrás
  };

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

  // Asegúrate de que el tipo `Image` tenga estas propiedades
  const { download_url, author } = image;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <LazyLoadImage
            src={download_url}
            alt={author}
            effect="blur"
            height={600} // Ajusta a la altura deseada
            className="w-full object-cover"
          />
          <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg">
            <HeartIcon className="text-red-500 cursor-pointer" />
          </div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
            {author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
