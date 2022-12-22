import { useMutation } from '@tanstack/react-query';

const useDecrementLikeIfFalse = (doodleId: string, userId: string) => {
  const {
    mutateAsync: mutateDecrementLikeIfFalse,
    isLoading: isLoadingDecrementLikeIfFalse,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'PUT',
      };
      const response = await fetch(
        `/api/doodles/${doodleId}/decrement-likes/${userId}`,
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
    mutateDecrementLikeIfFalse,
    isLoadingDecrementLikeIfFalse,
  };
};

export default useDecrementLikeIfFalse;
