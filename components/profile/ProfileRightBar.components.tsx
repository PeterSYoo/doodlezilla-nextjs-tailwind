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
      <div className="fixed right-0 z-30 hidden h-full border-l border-grayBorder bg-white px-1 dark:border-transparent dark:bg-midnight md:flex md:w-[159px] md:flex-col lg:w-[258px]">
        <div className="md:mx-auto md:flex md:flex-col md:gap-6 lg:w-[187px]">
          <div className="mt-[18px] flex items-center justify-between">
            <h1 className="ml-2 font-semibold dark:text-egg lg:ml-0">
              Profile
            </h1>
            {session.user.name !== 'guest' ? (
              <button
                onClick={() => setIsModal(true)}
                className="mr-2 rounded-lg border border-placeholder bg-gradient-to-tr py-1 px-5 text-xs font-semibold transition duration-100 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeDark dark:text-egg dark:hover:border-transparent"
              >
                Edit
              </button>
            ) : null}
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
              className="aspect-square rounded-full lg:hidden"
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
              className="aspect-square rounded-full md:hidden lg:block"
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-1 md:items-start md:px-2 lg:items-start lg:px-0">
            {/* Username */}
            <h1 className="w-3/4 break-all text-lg font-bold dark:text-egg lg:w-full lg:items-start">
              {userData.name.toUpperCase()}
            </h1>
            {/*  */}
            <div className="flex w-3/4 flex-col justify-between gap-6 lg:w-full lg:items-start">
              {/* Doodles Count */}
              <p className="text-xs font-semibold dark:text-egg">
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
              <div className="flex flex-col gap-1 lg:items-start lg:px-0">
                <p className="text-xs font-semibold dark:text-egg">Location</p>
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
