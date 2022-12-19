import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodles = (userId: string) => {
  const {
    data: userDoodlesData,
    isLoading: userDoodlesIsLoading,
    error: userDoodlesError,
  } = useQuery(['userDoodles'], async () => {
    try {
      const response = await fetch(`/api/user-doodles/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { userDoodlesData, userDoodlesIsLoading, userDoodlesError };
};

export default useFetchUserDoodles;
