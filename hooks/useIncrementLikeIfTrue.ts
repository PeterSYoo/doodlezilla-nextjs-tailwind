import { useMutation } from '@tanstack/react-query';

const useIncrementLikeIfTrue = (doodleId: string, userId: string) => {
  const {
    mutateAsync: mutateIncrementLikeIfTrue,
    isLoading: isLoadingIncrementLikeIfTrue,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'PUT',
      };
      const response = await fetch(
        `/api/doodles/${doodleId}/increment-likes/${userId}`,
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
    mutateIncrementLikeIfTrue,
    isLoadingIncrementLikeIfTrue,
  };
};

export default useIncrementLikeIfTrue;
