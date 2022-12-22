import { useQuery } from '@tanstack/react-query';

const useFetchUser = (userId: string) => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    refetch: userRefetch,
  } = useQuery(
    ['user', userId],
    async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return { userData, userIsLoading, userIsError, userRefetch };
};

export default useFetchUser;
