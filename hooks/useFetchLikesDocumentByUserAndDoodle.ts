import { useQuery } from '@tanstack/react-query';

const useFetchLikesDocumentByUserAndDoodle = (
  doodleId: string,
  userId: string
) => {
  const {
    data: dataLikesDocumentByUserAndDoodle,
    isLoading: isLoadingLikesDocumentByUserAndDoodle,
    isError: isErrorLikesDocumentByUserAndDoodle,
    refetch: refetchLikesDocumentByUserAndDoodle,
  } = useQuery(
    ['likesDocumentByUserAndDoodle', userId],
    async () => {
      try {
        const response = await fetch(
          `/api/doodles/${doodleId}/likes/${userId}`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    { refetchOnMount: 'always' }
  );

  return {
    dataLikesDocumentByUserAndDoodle,
    isLoadingLikesDocumentByUserAndDoodle,
    isErrorLikesDocumentByUserAndDoodle,
    refetchLikesDocumentByUserAndDoodle,
  };
};

export default useFetchLikesDocumentByUserAndDoodle;
