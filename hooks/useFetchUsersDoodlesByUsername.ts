import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodlesByUsername = (username: string) => {
  const {
    data: userDoodlesData,
    isLoading: userDoodlesIsLoading,
    isError: userDoodlesIsError,
  } = useQuery(['userDoodlesByUsername'], async () => {
    try {
      const response = await fetch(`/api/user-doodles-by-username/${username}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError };
};

export default useFetchUserDoodlesByUsername;
