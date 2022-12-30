import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useFetchDoodleWithAllComments from '../../../hooks/useFetchDoodleWIthAllComments';
import useFetchUser from '../../../hooks/useFetchUser';
import { LoaderSpinner } from '../../LoaderSpinner.components';
import { ProfileDoodleCard } from './ProfileDoodleCard.components';

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
  refetchEditorsPick1?: any;
  refetchEditorsPick2?: any;
  refetchEditorsPick3?: any;
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
  refetchEditorsPick1,
  refetchEditorsPick2,
  refetchEditorsPick3,
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
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
        <ProfileDoodleCard
          doodleWithCommentsData={doodleWithCommentsData}
          userData={userData}
          dataSessionUser={dataSessionUser}
          doodleWithCommentsRefetch={doodleWithCommentsRefetch}
          userDoodlesWithAllCommentsRefetch={userDoodlesWithAllCommentsRefetch}
          refetchInfiniteQueriesAllDoodles={refetchInfiniteQueriesAllDoodles}
          isFeedPage={isFeedPage}
          setIsDoodleModal={setIsDoodleModal}
          refetchEditorsPick1={refetchEditorsPick1}
          refetchEditorsPick2={refetchEditorsPick2}
          refetchEditorsPick3={refetchEditorsPick3}
        />
      </div>
    </>
  );
};
