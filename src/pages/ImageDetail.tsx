import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate
import { Image } from '../types/image'; // Asegúrate de importar tu tipo de imagen
import ImageCard from '../components/ImageCard';

const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la obtención de los detalles de la imagen
    // Aquí deberías hacer una llamada a la API para obtener los detalles de la imagen por ID
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        const data = await response.json();
        setImage(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImage();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Navega hacia atrás
  };

  if (loading) return <div>Loading...</div>;

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <div>
        <img src={image.download_url} alt={image.author} />
        <p>{image.author}</p>
        {/* Muestra otros detalles de la imagen aquí */}
      </div>
    </div>
  );
};

export default ImageDetail;
