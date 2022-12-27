import { useMutation } from '@tanstack/react-query';

type Data = {
  biography: string;
  image: string;
  location: string;
  name: string;
};

const useUpdateSessionUser = (
  userId: string,
  setIsUsernameErrorModal: (arg0: boolean) => void,
  setIsModal: (arg0: boolean) => void
) => {
  const {
    mutateAsync: mutateUpdateSessionUser,
    isLoading: isLoadingUpdateSessionUser,
  } = useMutation(async (data: Data) => {
    try {
      const Options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      const response = await fetch(`/api/users/${userId}`, Options);
      const json = await response.json();

      if (json.error === 'Name already exists') {
        setIsUsernameErrorModal(true);
      } else {
        setIsModal(false);
        return json;
      }
    } catch (error) {
      return error;
    }
  });

  return {
    mutateUpdateSessionUser,
    isLoadingUpdateSessionUser,
  };
};

export default useUpdateSessionUser;
