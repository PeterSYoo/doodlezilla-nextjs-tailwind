import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useFetchDoodleWithAllComments from '../../../hooks/useFetchDoodleWIthAllComments';
import useFetchUser from '../../../hooks/useFetchUser';
import { LoaderSpinner } from '../../LoaderSpinner.components';
import { ProfileDoodleCard } from './ProfileDoodleCard.components';
import { RiCloseFill } from 'react-icons/ri';

type ProfileDoodleCardModalProps = {
  setIsDoodleModal: (arg0: boolean) => void;
  userData: {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
    biography: string;
    image: string;
    location: string;
  };
  doodleId: string;
  userId: string;
  userDoodlesWithAllCommentsRefetch: () => void;
  mutateCreateNewLikesDocument: ({
    doodle,
    user,
  }: {
    doodle: string;
    user: string;
  }) => void;
  refetchInfiniteQueriesAllDoodles?: () => void;
  isFeedPage?: boolean;
};

export const ProfileDoodleCardModal = ({
  setIsDoodleModal,
  userData,
  doodleId,
  userId,
  userDoodlesWithAllCommentsRefetch,
  mutateCreateNewLikesDocument,
  refetchInfiniteQueriesAllDoodles,
  isFeedPage,
}: ProfileDoodleCardModalProps) => {
  const { data: session }: any = useSession();

  const {
    userData: dataSessionUser,
    userIsLoading: isLoadingSessionUser,
    userIsError: isErrorSessionUser,
    userRefetch: refetchSessionUser,
  } = useFetchUser(session?.user?.id);

  const {
    doodleWithCommentsData,
    doodleWithCommentsIsLoading,
    doodleWithCommentsIsError,
    doodleWithCommentsRefetch,
  } = useFetchDoodleWithAllComments(doodleId);

  useEffect(() => {
    mutateCreateNewLikesDocument({
      doodle: doodleId,
      user: userId,
    });
  }, []);

  if (doodleWithCommentsIsLoading || isLoadingSessionUser)
    return <LoaderSpinner />;
  if (doodleWithCommentsIsError || isErrorSessionUser) return <>Error!</>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50 flex justify-center items-center">
        {/* Close X Top Right Button */}
        <button
          onClick={() => setIsDoodleModal(false)}
          className="fixed right-2 top-2 text-3xl text-white dark:text-black"
        >
          <RiCloseFill />
        </button>
        {/*  */}
        <ProfileDoodleCard
          doodleWithCommentsData={doodleWithCommentsData}
          userData={userData}
          dataSessionUser={dataSessionUser}
          doodleWithCommentsRefetch={doodleWithCommentsRefetch}
          userDoodlesWithAllCommentsRefetch={userDoodlesWithAllCommentsRefetch}
          refetchInfiniteQueriesAllDoodles={refetchInfiniteQueriesAllDoodles}
          isFeedPage={isFeedPage}
        />
      </div>
    </>
  );
};
