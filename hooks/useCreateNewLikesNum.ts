import { useMutation } from '@tanstack/react-query';

const useCreateNewLikesNum = (doodleId: string, userId: string) => {
  const {
    mutateAsync: mutateCreateNewLikesNum,
    isLoading: isLoadingCreateNewLikesNum,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        `/api/doodles/${doodleId}/likes-num/${userId}`,
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
    mutateCreateNewLikesNum,
    isLoadingCreateNewLikesNum,
  };
};

export default useCreateNewLikesNum;
