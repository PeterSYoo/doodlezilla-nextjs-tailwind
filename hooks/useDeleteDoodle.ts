import { useMutation } from '@tanstack/react-query';

const useDeleteDoodle = (router: any) => {
  const { mutateAsync: mutateDeleteDoodle, isLoading: isLoadingDeleteDoodle } =
    useMutation(async (doodleId: string) => {
      try {
        const Options = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`/api/doodles/${doodleId}`, Options);
        const json = await response.json();

        if (json) {
          router.push('/profile');
        }
      } catch (error) {
        return error;
      }
    });

  return {
    mutateDeleteDoodle,
    isLoadingDeleteDoodle,
  };
};

export default useDeleteDoodle;
