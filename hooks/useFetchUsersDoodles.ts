import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodles = (userId: string) => {
  const {
    data: userDoodlesData,
    isLoading: userDoodlesIsLoading,
    isError: userDoodlesIsError,
  } = useQuery(['userDoodles'], async () => {
    try {
      const response = await fetch(`/api/user-doodles/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError };
};

export default useFetchUserDoodles;
