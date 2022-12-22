import { useMutation } from '@tanstack/react-query';

const useCreateNewComment = (setIsPostSuccessModal: any) => {
  const {
    mutateAsync: mutateCreateNewComment,
    isLoading: isLoadingCreateNewComment,
  } = useMutation(async (data: any) => {
    try {
      const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      const response = await fetch(`/api/comments/`, Options);
      const json = await response.json();

      if (json) {
        setIsPostSuccessModal(true);
        return json;
      }
    } catch (error) {
      return error;
    }
  });

  return {
    mutateCreateNewComment,
    isLoadingCreateNewComment,
  };
};

export default useCreateNewComment;
