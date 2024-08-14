import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedImagesResponse, Image } from '../types/image';

// Define la función para obtener datos
const fetchImages = async (page: number): Promise<PaginatedImagesResponse> => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=10`,
  );
  if (!response.ok) throw new Error('Network response was not ok');

  // Asumiendo que la respuesta es una lista de imágenes, ajusta el formato si es necesario
  const images: Image[] = await response.json();

  // Devuelve la respuesta en el formato esperado por `PaginatedImagesResponse`
  return {
    images,
    page,
  };
};

// Define el hook para usar `useInfiniteQuery`
export const useImages = () => {
  return useInfiniteQuery<PaginatedImagesResponse, Error>({
    queryKey: ['images'],
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam as number),
    getNextPageParam: (lastPage) => {
      // En este caso, ya que la API no proporciona un total de páginas, ajusta la lógica según tu necesidad.
      return lastPage.images.length === 10
        ? (lastPage.page ?? 1) + 1
        : undefined;
    },
    staleTime: 60000, // Ajusta el tiempo según sea necesario
    initialPageParam: 1, // Valor inicial de la página
  });
};
