import { useQuery } from '@tanstack/react-query';

const useFetchUserIsLikesDoodle = (userId: string) => {
  const {
    data: userIsLikesDoodleData,
    isLoading: userIsLikesDoodleIsLoading,
    isError: userIsLikesDoodleIsError,
    refetch: userIsLikesDoodleRefetch,
  } = useQuery(['userIsLikesDoodle'], async () => {
    try {
      const response = await fetch(`/api/user-is-likes-doodle/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  });

  return {
    userIsLikesDoodleData,
    userIsLikesDoodleIsLoading,
    userIsLikesDoodleIsError,
    userIsLikesDoodleRefetch,
  };
};

export default useFetchUserIsLikesDoodle;
