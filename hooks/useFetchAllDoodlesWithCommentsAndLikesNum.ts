import { useQuery } from '@tanstack/react-query';

const useFetchAllDoodlesWithCommentsAndLikesNum = () => {
  const {
    data: dataAllDoodlesWithCommentsAndLikesNum,
    isLoading: isLoadingAllDoodlesWithCommentsAndLikesNum,
    isError: isErrorAllDoodlesWithCommentsAndLikesNum,
    refetch: refetchAllDoodlesWithCommentsAndLikesNum,
  } = useQuery(
    ['allDoodlesWithCommentsAndLikesNum'],
    async () => {
      try {
        const response = await fetch(
          `/api/all-doodles-with-comments-and-likes`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return {
    dataAllDoodlesWithCommentsAndLikesNum,
    isLoadingAllDoodlesWithCommentsAndLikesNum,
    isErrorAllDoodlesWithCommentsAndLikesNum,
    refetchAllDoodlesWithCommentsAndLikesNum,
  };
};

export default useFetchAllDoodlesWithCommentsAndLikesNum;
