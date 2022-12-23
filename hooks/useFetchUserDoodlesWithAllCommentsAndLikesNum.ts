import { useQuery } from '@tanstack/react-query';

const useFetchUserDoodlesWithAllCommentsAndLikesNum = (userId: string) => {
  const {
    data: userDoodlesWithAllCommentsAndLikesNumData,
    isLoading: userDoodlesWithAllCommentsAndLikesNumIsLoading,
    isError: userDoodlesWithAllCommentsAndLikesNumIsError,
    refetch: userDoodlesWithAllCommentsAndLikesNumRefetch,
    isFetching: userDoodlesWithAllCommentsAndLikesNumIsFetching,
  } = useQuery(
    ['userDoodlesWithAllCommentsAndLikesNum', userId],
    async () => {
      try {
        const response = await fetch(
          `/api/user-doodles-with-all-comments-and-likes-num/${userId}`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return {
    userDoodlesWithAllCommentsAndLikesNumData,
    userDoodlesWithAllCommentsAndLikesNumIsLoading,
    userDoodlesWithAllCommentsAndLikesNumIsError,
    userDoodlesWithAllCommentsAndLikesNumRefetch,
    userDoodlesWithAllCommentsAndLikesNumIsFetching,
  };
};

export default useFetchUserDoodlesWithAllCommentsAndLikesNum;
