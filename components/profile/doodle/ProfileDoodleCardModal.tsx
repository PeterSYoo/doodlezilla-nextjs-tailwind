import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import useCreateNewLikesDocument from '../../../hooks/useCreateNewLikesDocument';
import useFetchDoodleWithAllComments from '../../../hooks/useFetchDoodleWIthAllComments';
import useFetchUser from '../../../hooks/useFetchUser';
import { LoaderSpinner } from '../../LoaderSpinner.components';
import { ProfileDoodleCard } from './ProfileDoodleCard.components';

export const ProfileDoodleCardModal = ({
  setIsDoodleModal,
  userData,
  doodleId,
  userDoodlesWithAllCommentsRefetch,
  mutateCreateNewLikesDocument,
}: any) => {
  const { data: session }: any = useSession();

  const {
    userData: dataSessionUser,
    userIsLoading: isLoadingSessionUser,
    userIsError: isErrorSessionUser,
    userRefetch: refetchSessionUser,
  } = useFetchUser(session.user.id);

  const {
    doodleWithCommentsData,
    doodleWithCommentsIsLoading,
    doodleWithCommentsIsError,
    doodleWithCommentsRefetch,
  } = useFetchDoodleWithAllComments(doodleId);

  useEffect(() => {
    mutateCreateNewLikesDocument();
  }, []);

  if (doodleWithCommentsIsLoading || isLoadingSessionUser)
    return <LoaderSpinner />;
  if (doodleWithCommentsIsError || isErrorSessionUser) return <>Error!</>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex justify-center items-center">
        {/* Close X Top Right Button */}
        <button
          onClick={() => setIsDoodleModal(false)}
          className="fixed right-2 top-2 text-3xl text-white"
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
        />
      </div>
    </>
  );
};
