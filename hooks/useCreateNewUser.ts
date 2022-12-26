import { useMutation } from '@tanstack/react-query';

type Data = {
  email: string;
  name: string;
  password: string;
};

const useCreateNewUser = (
  setIsUsernameErrorModalOpen: (arg0: boolean) => void,
  setIsEmailErrorModalOpen: (arg0: boolean) => void,
  setIsSuccessModalOpen: (arg0: boolean) => void
) => {
  const {
    mutateAsync: mutateCreateNewUser,
    isLoading: isLoadingCreateNewUser,
  } = useMutation(async (data: Data) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
        options
      ).then((response) =>
        response.json().then((data) => {
          if (response.status === 422) {
            if (data.message === 'Username already exists!') {
              setIsUsernameErrorModalOpen(true);
            } else if (data.message === 'Email already exists!') {
              setIsEmailErrorModalOpen(true);
            }
          } else {
            setIsSuccessModalOpen(true);
          }
        })
      );
    } catch (error) {
      return error;
    }
  });

  return {
    mutateCreateNewUser,
    isLoadingCreateNewUser,
  };
};

export default useCreateNewUser;
