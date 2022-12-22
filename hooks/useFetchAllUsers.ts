import { useQuery } from '@tanstack/react-query';

const useFetchAllUsers = () => {
  const {
    data: allUsersData,
    isLoading: allUsersIsLoading,
    isError: allUsersIsError,
  } = useQuery(
    ['allUsers'],
    async () => {
      try {
        const response = await fetch(`/api/users`);
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return { allUsersData, allUsersIsLoading, allUsersIsError };
};

export default useFetchAllUsers;
