import Image from 'next/image';
import useFetchUserByUsername from '../../../hooks/useFetchUserByUsername';
import useFetchUserDoodlesByUsername from '../../../hooks/useFetchUsersDoodlesByUsername';
import { LoaderSpinner } from '../../LoaderSpinner.components';

type Session = {
  expires: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

type Username = {
  username: string;
  session: Session;
};

export const ProfileSlugUsersRightBar = ({ session, username }: Username) => {
  const { userData, userIsLoading, userIsError } =
    useFetchUserByUsername(username);
  const { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError } =
    useFetchUserDoodlesByUsername(username);

  if (userIsLoading || userDoodlesIsLoading) return <LoaderSpinner />;
  if (userIsError || userDoodlesIsError) return <>Error</>;

  return (
    <>
      {userData._id ? (
        <div className="z-40 fixed bg-white dark:bg-midnight right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder dark:border-transparent md:flex-col px-1">
          <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
            <div className="flex justify-between items-center mt-[18px]">
              <h1 className="font-semibold ml-2 lg:ml-0 dark:text-egg">
                Profile
              </h1>
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
                className="lg:hidden rounded-full"
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
                className="md:hidden lg:block rounded-full"
              />
            </div>
            {/*  */}
            <div className="flex flex-col md:px-2 lg:px-0 gap-1 md:items-start lg:items-start">
              {/* Username */}
              <h1 className="font-bold w-full break-all text-lg dark:text-egg">
                {userData.name.toUpperCase()}
              </h1>
              {/*  */}
              <div className="flex flex-col justify-between lg:items-start gap-6">
                {/* Doodles Count */}
                <p className="font-semibold text-xs dark:text-egg">
                  {userDoodlesData.length}&nbsp;
                  <span className="text-placeholder dark:text-shadeText">
                    Doodles
                  </span>
                </p>
                {/*  */}
                {/* Bio */}
                <p className="text-xs text-placeholder dark:text-shadeText">
                  {userData.biography ? (
                    userData.biography
                  ) : (
                    <>This user hasn&apos;t written a biography yet.</>
                  )}
                </p>
                {/*  */}
                {/* Location */}
                <div className="flex flex-col lg:px-0 gap-1 lg:items-start">
                  <p className="font-semibold text-xs dark:text-egg">
                    Location
                  </p>
                  <p className="text-xs text-placeholder dark:text-shadeText">
                    {userData.location ? (
                      userData.location
                    ) : (
                      <>This user hasn&apos;t added their location yet.</>
                    )}
                  </p>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="z-40 fixed bg-white right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder md:flex-col px-1">
            <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6 h-full">
              <div className="flex justify-center items-center h-full">
                <h1 className="font-semibold">No User Found</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
