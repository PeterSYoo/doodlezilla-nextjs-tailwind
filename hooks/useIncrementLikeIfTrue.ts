import { useMutation } from '@tanstack/react-query';

const useIncrementLikeIfTrue = (dataObject: any) => {
  const {
    mutateAsync: mutateIncrementLikeIfTrue,
    isLoading: isLoadingIncrementLikeIfTrue,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObject),
      };
      const response = await fetch(
        `/api/increment-likes-by-1/${dataObject.doodle}`,
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
