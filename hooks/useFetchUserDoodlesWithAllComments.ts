import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodlesWithAllComments = (userId: string) => {
  const {
    data: userDoodlesWithAllCommentsData,
    isLoading: userDoodlesWithAllCommentsIsLoading,
    isError: userDoodlesWithAllCommentsIsError,
    refetch: userDoodlesWithAllCommentsRefetch,
  } = useQuery(
    ['userDoodlesWithAllComments', userId],
    async () => {
      try {
        const response = await fetch(
          `/api/user-doodles-with-all-comments/${userId}`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return {
    userDoodlesWithAllCommentsData,
    userDoodlesWithAllCommentsIsLoading,
    userDoodlesWithAllCommentsIsError,
    userDoodlesWithAllCommentsRefetch,
  };
};

export default useFetchUserDoodlesWithAllComments;
