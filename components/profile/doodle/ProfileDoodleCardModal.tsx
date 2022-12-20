import { RiCloseFill } from 'react-icons/ri';
import useFetchDoodleWithAllComments from '../../../hooks/useFetchDoodleWIthAllComments';
import { LoaderSpinner } from '../../LoaderSpinner.components';
import { ProfileDoodleCard } from './ProfileDoodleCard.components';

export const ProfileDoodleCardModal = ({
  setIsDoodleModal,
  userData,
  doodleId,
}: any) => {
  const {
    doodleWithCommentsData,
    doodleWithCommentsIsLoading,
    doodleWithCommentsIsError,
  } = useFetchDoodleWithAllComments(doodleId);

  if (doodleWithCommentsIsLoading) return <LoaderSpinner />;
  if (doodleWithCommentsIsError) return <>Error!</>;

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
        />
      </div>
    </>
  );
};
