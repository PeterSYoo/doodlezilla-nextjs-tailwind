import { useMutation } from '@tanstack/react-query';

const useDeleteLikesNum = (doodleId: string, userId: string) => {
  const {
    mutateAsync: mutateDeleteLikesNum,
    isLoading: isLoadingDeleteLikesNum,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        `/api/doodles/${doodleId}/likes-num/${userId}`,
        Options
      );
      const json = await response.json();

      if (json) {
      }
    } catch (error) {
      return error;
    }
  });

  return {
    mutateDeleteLikesNum,
    isLoadingDeleteLikesNum,
  };
};

export default useDeleteLikesNum;
