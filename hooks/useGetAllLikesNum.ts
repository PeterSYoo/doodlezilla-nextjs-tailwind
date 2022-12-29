import { useQuery } from '@tanstack/react-query';

const useGetAllLikesNum = (doodleId: string) => {
  const {
    data: dataGetAllLikesNum,
    isLoading: isLoadingGetAllLikesNum,
    isError: isErrorGetAllLikesNum,
    refetch: refetchGetAllLikesNum,
  } = useQuery(['allDoodles'], async () => {
    try {
      const response = await fetch(`/api/doodles/${doodleId}/likes-num`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return {
    dataGetAllLikesNum,
    isLoadingGetAllLikesNum,
    isErrorGetAllLikesNum,
    refetchGetAllLikesNum,
  };
};

export default useGetAllLikesNum;
