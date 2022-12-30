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
        <div className="fixed right-0 z-40 hidden h-full border-l border-grayBorder bg-white px-1 dark:border-transparent dark:bg-midnight md:flex md:w-[159px] md:flex-col lg:w-[258px]">
          <div className="md:mx-auto md:flex md:flex-col md:gap-6 lg:w-[187px]">
            <div className="mt-[18px] flex items-center justify-between">
              <h1 className="ml-2 font-semibold dark:text-egg lg:ml-0">
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
                className="rounded-full lg:hidden"
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
                className="rounded-full md:hidden lg:block"
              />
            </div>
            {/*  */}
            <div className="flex flex-col gap-1 md:items-start md:px-2 lg:items-start lg:px-0">
              {/* Username */}
              <h1 className="w-full break-all text-lg font-bold dark:text-egg">
                {userData.name.toUpperCase()}
              </h1>
              {/*  */}
              <div className="flex flex-col justify-between gap-6 lg:items-start">
                {/* Doodles Count */}
                <p className="text-xs font-semibold dark:text-egg">
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
                <div className="flex flex-col gap-1 lg:items-start lg:px-0">
                  <p className="text-xs font-semibold dark:text-egg">
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
          <div className="fixed right-0 z-40 hidden h-full border-l border-grayBorder bg-white px-1 md:flex md:w-[159px] md:flex-col lg:w-[258px]">
            <div className="h-full md:mx-auto md:flex md:flex-col md:gap-6 lg:w-[187px]">
              <div className="flex h-full items-center justify-center">
                <h1 className="font-semibold">No User Found</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
