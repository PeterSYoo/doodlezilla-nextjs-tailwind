import { useMutation } from '@tanstack/react-query';

const usePostUserIsLikesDoodle = (dataObject: any) => {
  const {
    mutate: mutatePostUserIsLikesDoodle,
    isLoading: isLoadingPostUserIsLikesDoodle,
  } = useMutation(async () => {
    try {
      const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObject),
      };

      const response = await fetch(
        `/api/user-is-likes-doodle/${dataObject.user}/${dataObject.doodle}`,
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

  return { mutatePostUserIsLikesDoodle, isLoadingPostUserIsLikesDoodle };
};

export default usePostUserIsLikesDoodle;
