import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodlesWithAllComments = (userId: string) => {
  const {
    data: userDoodlesWithAllCommentsData,
    isLoading: userDoodlesWithAllCommentsIsLoading,
    isError: userDoodlesWithAllCommentsIsError,
    refetch: userDoodlesWithAllCommentsRefetch,
    isFetching: userDoodlesWithAllCommentsIsFetching,
  } = useQuery(['userDoodlesWithAllComments', userId], async () => {
    try {
      const response = await fetch(
        `/api/user-doodles-with-all-comments/${userId}`
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return {
    userDoodlesWithAllCommentsData,
    userDoodlesWithAllCommentsIsLoading,
    userDoodlesWithAllCommentsIsError,
    userDoodlesWithAllCommentsRefetch,
    userDoodlesWithAllCommentsIsFetching,
  };
};

export default useFetchUserDoodlesWithAllComments;
