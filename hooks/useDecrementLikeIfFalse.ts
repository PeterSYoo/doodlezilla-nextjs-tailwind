import { useMutation } from '@tanstack/react-query';

const useDecrementLikeIfTrue = (dataObject: any) => {
  const {
    mutateAsync: mutateDecrementLikeIfTrue,
    isLoading: isLoadingDecrementLikeIfTrue,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObject),
      };
      const response = await fetch(
        `/api/decrement-likes-by-1/${dataObject.doodle}`,
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
    mutateDecrementLikeIfTrue,
    isLoadingDecrementLikeIfTrue,
  };
};

export default useDecrementLikeIfTrue;
