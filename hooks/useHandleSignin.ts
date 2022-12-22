import { useMutation } from '@tanstack/react-query';

const useHandleSignin = (
  signIn: any,
  setIsUsernameErrorModalOpen: any,
  setIsPasswordErrorModalOpen: any,
  router: any
) => {
  const { mutateAsync: mutateHandleSignin, isLoading: isLoadingHandleSignin } =
    useMutation(async (data: any) => {
      try {
        const status: any = await signIn('credentials', {
          redirect: false,
          name: data.username.toLowerCase(),
          password: data.password,
          callbackUrl: '/feed',
        });

        if (status.error === 'No user found with that Username!') {
          setIsUsernameErrorModalOpen(true);
        } else if (status.error === 'Wrong password!') {
          setIsPasswordErrorModalOpen(true);
        } else if (status.ok) {
          router.push(status.url);
        }
      } catch (error) {
        return error;
      }
    });

  return {
    mutateHandleSignin,
    isLoadingHandleSignin,
  };
};

export default useHandleSignin;
