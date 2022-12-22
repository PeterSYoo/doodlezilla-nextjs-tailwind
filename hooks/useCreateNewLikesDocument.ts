import { useMutation } from '@tanstack/react-query';

const useCreateNewLikesDocument = (
  data: any,
  doodleId: string,
  userId: string
) => {
  const {
    mutate: mutateCreateNewLikesDocument,
    isLoading: isLoadingCreateNewLikesDocument,
  } = useMutation(async () => {
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
  });

  return {
    mutateCreateNewLikesDocument,
    isLoadingCreateNewLikesDocument,
  };
};

export default useCreateNewLikesDocument;
