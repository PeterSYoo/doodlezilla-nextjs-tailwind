import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteQueriesAllDoodles = () => {
  const {
    data: dataInfiniteQueriesAllDoodles,
    isLoading: isLoadingInfiniteQueriesAllDoodles,
    isError: isErrorInfiniteQueriesAllDoodles,
    error: errorInfiniteQueriesAllDoodles,
    hasNextPage: hasNextPageInfiniteQueriesAllDoodles,
    fetchNextPage: fetchNextPageInfiniteQueriesAllDoodles,
    isFetching: isFetchingInfiniteQueriesAllDoodles,
    isFetchingNextPage: isFetchingNextPageInfiniteQueriesAllDoodles,
    refetch: refetchInfiniteQueriesAllDoodles,
  } = useInfiniteQuery(
    ['infiniteQueriesAllDoodles'],
    async ({ pageParam = 1 }) => {
      try {
        const response = await fetch(
          `/api/all-doodles-with-comments-and-likes?page=${pageParam}`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  return {
    dataInfiniteQueriesAllDoodles,
    isLoadingInfiniteQueriesAllDoodles,
    isErrorInfiniteQueriesAllDoodles,
    errorInfiniteQueriesAllDoodles,
    hasNextPageInfiniteQueriesAllDoodles,
    fetchNextPageInfiniteQueriesAllDoodles,
    isFetchingInfiniteQueriesAllDoodles,
    isFetchingNextPageInfiniteQueriesAllDoodles,
    refetchInfiniteQueriesAllDoodles,
  };
};

export default useInfiniteQueriesAllDoodles;
