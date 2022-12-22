import { useMutation } from '@tanstack/react-query';

const useCreateNewUser = (
  setIsUsernameErrorModalOpen: any,
  setIsEmailErrorModalOpen: any,
  setIsSuccessModalOpen: any
) => {
  const {
    mutateAsync: mutateCreateNewUser,
    isLoading: isLoadingCreateNewUser,
  } = useMutation(async (data: any) => {
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
