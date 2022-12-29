import { useMutation } from '@tanstack/react-query';

type Data = {
  comment: String;
  doodle: string;
  user: string;
};

const useCreateNewComment = () => {
  const {
    mutateAsync: mutateCreateNewComment,
    isLoading: isLoadingCreateNewComment,
  } = useMutation(async (data: Data) => {
    try {
      const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      const response = await fetch(`/api/comments/`, Options);
      const json = await response.json();

      if (json) {
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
