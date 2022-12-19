import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import { useState } from 'react';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { ProfileEditModal } from '../../components/profile/ProfileEditModal.components';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchUserDoodles from '../../hooks/useFetchUsersDoodles';
import { authOptions } from '../api/auth/[...nextauth]';

const ProfilePage = ({ session }: any) => {
  const [isModal, setIsModal] = useState<boolean>();

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session.user.id
  );
  const { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError } =
    useFetchUserDoodles(session.user.id);

  if (userIsLoading || userDoodlesIsLoading) return <LoaderSpinner />;
  if (userIsError || userDoodlesIsError) return <>Error</>;

  return (
    <>
      {isModal ? <ProfileEditModal setIsModal={setIsModal} /> : null}
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col items-center gap-5 mt-24 mb-32 md:justify-start">
        {/* Profile Avatar & bio */}
        <div className="md:hidden grid grid-cols-12 w-[375px] gap-3">
          <div className="col-start-1 col-span-4 flex flex-col items-center gap-4 border border-grayBorder rounded-2xl py-4">
            <div className="flex flex-col items-center gap-1">
              <Image
                src={
                  userData.image
                    ? userData.image
                    : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                }
                width={75}
                height={75}
                alt="profile avatar mobile"
                className="rounded-full"
              />
              <h1 className="font-bold break-all">{userData.name}</h1>
              <p className="font-semibold text-xs">
                {userDoodlesData.length}&nbsp;
                <span className="font-normal text-placeholder">DOODLES</span>
              </p>
            </div>
            <p className="font-semibold text-xs text-placeholder">
              {userData.location ? userData.location : null}
            </p>
            <button
              onClick={() => setIsModal(true)}
              className="border py-1 w-10/12 text-xs rounded-lg border-placeholder transition duration-100 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white font-semibold"
            >
              Edit
            </button>
          </div>
          <div className="col-start-5 col-span-8 mt-4 flex flex-col gap-3">
            <p className="text-xs">
              {userData.biography ? (
                userData.biography
              ) : (
                <>Please edit your profile to write your biography.</>
              )}
            </p>
          </div>
        </div>
        <div className="border-b border-grayBorder w-[375px] md:hidden"></div>
        {/*  */}
        {/* Header Text */}
        <h1 className="hidden font-bold text-2xl md:flex justify-start md:w-3/4 lg:w-[733px] md:mt-5">
          Doodles
        </h1>
        {/*  */}
        <div className="border-b border-grayBorder md:w-3/4 lg:w-[733px]"></div>
        {/* Doodles List */}
        <div className="w-[375px] md:w-3/4 lg:w-[733px] grid grid-cols-3 gap-2 md:gap-4 lg:gap-5 px-3 md:px-0">
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-sunset w-full rounded-xl aspect-[3/4]"></div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
