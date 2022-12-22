import { useQuery } from '@tanstack/react-query';

const useFetchUserByUsername = (username: string) => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery(
    ['userByUsername', username],
    async () => {
      try {
        const response = await fetch(`/api/user-by-username/${username}`);
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return { userData, userIsLoading, userIsError };
};

export default useFetchUserByUsername;
