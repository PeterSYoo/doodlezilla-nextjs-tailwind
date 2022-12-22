import { useQuery } from '@tanstack/react-query';

const useFetchAllDoodlesWithAllComments = () => {
  const {
    data: allDoodlesWithCommentsData,
    isLoading: allDoodlesWithCommentsIsLoading,
    isError: allDoodlesWithCommentsIsError,
    refetch: allDoodlesWithCommentsRefetch,
  } = useQuery(
    ['allDoodlesWithComments'],
    async () => {
      try {
        const response = await fetch(`/api/doodle-with-all-comments/`);
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return {
    allDoodlesWithCommentsData,
    allDoodlesWithCommentsIsLoading,
    allDoodlesWithCommentsIsError,
    allDoodlesWithCommentsRefetch,
  };
};

export default useFetchAllDoodlesWithAllComments;
