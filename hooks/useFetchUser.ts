import { useQuery } from '@tanstack/react-query';

const useFetchUser = (objectId: string) => {
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery(['user'], async () => {
    try {
      const response = await fetch(`/api/users/${objectId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return { userData, userIsLoading, userError };
};

export default useFetchUser;
