import { useMutation } from '@tanstack/react-query';

const useCreateNewLikesDocument = (doodleId: string, userId: string) => {
  const {
    mutate: mutateCreateNewLikesDocument,
    isLoading: isLoadingCreateNewLikesDocument,
  } = useMutation(
    async (data: any) => {
      try {
        const Options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        };
        const response = await fetch(
          `/api/doodles/${doodleId}/likes/${userId}`,
          Options
        );
        const json = await response.json();

        if (json) {
          return json;
        }
      } catch (error) {
        return error;
      }
    },
    { retry: true }
  );

  return {
    mutateCreateNewLikesDocument,
    isLoadingCreateNewLikesDocument,
  };
};

export default useCreateNewLikesDocument;
