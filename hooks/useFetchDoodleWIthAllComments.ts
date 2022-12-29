import { useQuery } from '@tanstack/react-query';

const useFetchDoodleWithAllComments = (doodleId: string) => {
  const {
    data: doodleWithCommentsData,
    isLoading: doodleWithCommentsIsLoading,
    isError: doodleWithCommentsIsError,
    refetch: doodleWithCommentsRefetch,
  } = useQuery(['doodleWithComments', doodleId], async () => {
    try {
      const response = await fetch(`/api/doodle-with-all-comments/${doodleId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return {
    doodleWithCommentsData,
    doodleWithCommentsIsLoading,
    doodleWithCommentsIsError,
    doodleWithCommentsRefetch,
  };
};

export default useFetchDoodleWithAllComments;
