import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchUserDoodles from '../../hooks/useFetchUsersDoodles';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { ProfileEditModal } from './ProfileEditModal.components';

export const ProfileRightBar = () => {
  const [isModal, setIsModal] = useState<boolean>();

  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session?.user?.id
  );
  const { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError } =
    useFetchUserDoodles(session?.user?.id);

  if (userIsLoading || userDoodlesIsLoading) return <LoaderSpinner />;
  if (userIsError || userDoodlesIsError) return <>Error</>;

  return (
    <>
      {isModal ? <ProfileEditModal setIsModal={setIsModal} /> : null}
      <div className="z-30 fixed bg-white dark:bg-midnight right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder dark:border-transparent md:flex-col px-1">
        <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
          <div className="flex justify-between items-center mt-[18px]">
            <h1 className="font-semibold ml-2 lg:ml-0 dark:text-egg">
              Profile
            </h1>
            <button
              onClick={() => setIsModal(true)}
              className="border py-1 px-5 text-xs rounded-lg border-placeholder dark:border-shadeDark transition duration-100 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white font-semibold mr-2 dark:text-egg dark:hover:border-transparent"
            >
              Edit
            </button>
          </div>
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <Image
              src={
                userData.image
                  ? userData.image
                  : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
              }
              width={140}
              height={140}
              alt="profile avatar"
              className="lg:hidden rounded-full aspect-square"
            />
            <Image
              src={
                userData.image
                  ? userData.image
                  : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
              }
              width={200}
              height={200}
              alt="profile avatar"
              className="md:hidden lg:block rounded-full aspect-square"
            />
          </div>
          {/*  */}
          <div className="flex flex-col md:px-2 lg:px-0 gap-1 md:items-start lg:items-start">
            {/* Username */}
            <h1 className="font-bold break-all text-lg lg:items-start w-3/4 lg:w-full dark:text-egg">
              {userData.name.toUpperCase()}
            </h1>
            {/*  */}
            <div className="flex flex-col justify-between lg:items-start gap-6 w-3/4 lg:w-full">
              {/* Doodles Count */}
              <p className="font-semibold text-xs dark:text-egg">
                {userDoodlesData.length}&nbsp;
                <span className="text-placeholder dark:text-shadeText">
                  Doodles
                </span>
              </p>
              {/*  */}
              {/* Bio */}
              <p className="text-xs text-placeholder">
                {userData.biography ? (
                  userData.biography
                ) : (
                  <>Please edit your profile to write your biography.</>
                )}
              </p>
              {/*  */}
              {/* Location */}
              <div className="flex flex-col lg:px-0 gap-1 lg:items-start">
                <p className="font-semibold text-xs dark:text-egg">Location</p>
                <p className="text-xs text-placeholder dark:text-shadeText">
                  {userData.location ? (
                    userData.location
                  ) : (
                    <>Please edit your profile for location.</>
                  )}
                </p>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
