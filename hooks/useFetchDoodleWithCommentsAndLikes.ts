import { useQuery } from '@tanstack/react-query';

const useFetchDoodleWithCommentsAndLikes = (doodleId: string) => {
  const {
    data: dataDoodleWithCommentsAndLikes,
    isLoading: isLoadingDoodleWithCommentsAndLikes,
    isError: isErrorDoodleWithCommentsAndLikes,
    refetch: refetchDoodleWithCommentsAndLikes,
  } = useQuery(['doodleWithCommentsAndLikes', doodleId], async () => {
    try {
      const response = await fetch(
        `/api/doodle-with-comments-and-likes/${doodleId}`
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return {
    dataDoodleWithCommentsAndLikes,
    isLoadingDoodleWithCommentsAndLikes,
    isErrorDoodleWithCommentsAndLikes,
    refetchDoodleWithCommentsAndLikes,
  };
};

export default useFetchDoodleWithCommentsAndLikes;
