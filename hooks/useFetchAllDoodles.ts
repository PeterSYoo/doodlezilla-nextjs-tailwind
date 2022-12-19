import { useQuery } from '@tanstack/react-query';

const useFetchAllDoodles = () => {
  const {
    data: doodlesData,
    isLoading: doodlesIsLoading,
    error: doodlesError,
  } = useQuery(['allDoodles'], async () => {
    try {
      const response = await fetch(`/api/doodles`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { doodlesData, doodlesIsLoading, doodlesError };
};

export default useFetchAllDoodles;
