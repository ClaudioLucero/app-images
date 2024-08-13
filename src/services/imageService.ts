// services/imageService.ts
import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Image } from '../types/image'; // Importa el tipo

const fetchImages = async (): Promise<Image[]> => {
  const response = await axios.get<Image[]>('https://picsum.photos/v2/list');
  return response.data;
};

export const useImages = (): UseQueryResult<Image[], Error> => {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
    staleTime: 60000, // Ajusta el tiempo según sea necesario
  });
};
