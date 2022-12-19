import { useQuery } from '@tanstack/react-query';

const useFetchUser = (objectId: string) => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery(['user'], async () => {
    try {
      const response = await fetch(`/api/users/${objectId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { userData, userIsLoading, userIsError };
};

export default useFetchUser;
