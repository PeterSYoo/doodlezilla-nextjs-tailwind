import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import useFetchUser from '../hooks/useFetchUser';
import useFetchUserDoodles from '../hooks/useFetchUsersDoodles';
import { LoaderSpinner } from './LoaderSpinner.components';

export const LeftNavBar = () => {
  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session.user.id
  );
  const { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError } =
    useFetchUserDoodles(session.user.id);

  const router = useRouter();

  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';

  if (userIsLoading || userDoodlesIsLoading) return <LoaderSpinner />;
  if (userIsError || userDoodlesIsError) return <>Error</>;

  return (
    <>
      <div className="z-40 fixed bg-white h-full hidden md:flex md:w-[94px] lg:w-[213px] md:mr-[159px] lg:mr-[258px] border-r border-grayBorder md:flex-col">
        <div className="w-full h-[425px] border-b border-grayBorder flex flex-col justify-between">
          {/* Logo for Mobile and Desktop */}
          <div className="w-full h-[41px] flex flex-col items-center justify-center mt-[19px]">
            <Link href="/feed">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670911646/nudoodle/assets/logo-sm_enm9mh.png"
                alt="logo md"
                width={39}
                height={39}
                className="md:block lg:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910331/nudoodle/assets/logo-md_eantja.png"
                alt="logo lg"
                width={137}
                height={41}
                className="md:hidden lg:block"
              />
            </Link>
          </div>
          {/*  */}
          <div className="flex flex-col justify-between items-center w-full">
            {/* Profile Avatar */}
            {isProfilePage ? (
              <div className="flex justify-start w-full pr-1 items-center">
                <div className="w-[4px] h-[60px] lg:h-[72px] bg-sunset rounded-r-2xl"></div>
                <div className="flex w-full justify-center">
                  <Link href="/profile">
                    <div className="animate-border rounded-full from-[#D055D3] via-sunset to-[#F97E1C] bg-[length:200%_200%] p-0.5 bg-black bg-gradient-to-tr duration-500">
                      <div className="bg-white rounded-full p-0.5 flex justify-center items-center h-[60px] w-[60px] lg:h-[72px] lg:w-[72px]">
                        <Image
                          src={
                            userData.image
                              ? userData.image
                              : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                          }
                          alt="avatar"
                          width={72}
                          height={72}
                          className="rounded-full aspect-square"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex justify-start w-full pr-1 items-center">
                <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl invisible"></div>
                <div className="flex w-full justify-center">
                  <Link href="/profile">
                    <div className="hover:animate-border rounded-full hover:from-[#D055D3] hover:via-sunset hover:to-[#F97E1C] bg-[length:200%_200%] p-0.5 bg-white bg-gradient-to-tr duration-500">
                      <div className="bg-white rounded-full p-0.5 flex justify-center items-center h-[60px] w-[60px] lg:h-[72px] lg:w-[72px]">
                        <Image
                          src={
                            userData.image
                              ? userData.image
                              : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                          }
                          alt="avatar"
                          width={72}
                          height={72}
                          className="rounded-full aspect-square"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {/*  */}
            {/* Username */}
            <p className="font-semibold mt-6 w-full break-words px-2 text-center">
              {userData.name}
            </p>
            {/*  */}
            {/* Location */}
            <p className="mt-1 w-full break-words px-2 text-center text-xs text-grayText">
              {userData.location}
            </p>
            {/*  */}
            {/* Number of Doodles */}
            <div className="flex flex-col items-center my-9">
              <p className="text-xs font-semibold">{userDoodlesData.length}</p>
              <p className="text-xs text-grayText">DOODLES</p>
            </div>
            {/*  */}
          </div>
        </div>
        {/* Navigation */}
        <div className="w-full border-b border-grayBorder flex flex-col items-center gap-11 text-grayText pt-11 pb-11">
          {/* If Feed Page */}
          {isFeedPage ? (
            <div className="flex justify-start w-full pr-1 items-center">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl"></div>
              <Link
                href="/feed"
                className="flex justify-start mx-auto lg:ml-[45px]"
              >
                <div className="flex justify-center items-center">
                  <button className="flex justify-center items-center text-xl text-sunset mx-auto lg:gap-5">
                    <AiFillHome />
                    <span className="text-[15px] font-bold hidden text-sunset lg:block">
                      Feed
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex justify-start w-full pr-1 items-center">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl invisible"></div>
              <Link
                href="/feed"
                className="flex justify-start mx-auto lg:ml-[45px] group"
              >
                <div className="flex justify-center items-center">
                  <button className="flex justify-center items-center text-xl text-grayText group-hover:text-sunset mx-auto lg:gap-5">
                    <AiFillHome />
                    <span className="text-[15px] font-bold hidden text-grayText group-hover:text-sunset lg:block">
                      Feed
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          )}
          {/*  */}
          {/* If Create Page */}
          {isCreatePage ? (
            <div className="flex justify-start w-full pr-1 items-center">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl"></div>
              <div className="lg:flex lg:items-center mx-auto lg:gap-5 lg:pr-6 text-sunset">
                <Link
                  href="/create"
                  className="flex justify-start items-center mx-auto group lg:gap-5"
                >
                  <button className="border-[2px] aspect-square h-5 w-5 flex justify-center items-center text-lg border-sunset rounded-md pl-[1px] lg:pl-0 lg:pr-[1px] pb-[2px] mx-auto">
                    +
                  </button>
                  <span className="text-[15px] font-bold hidden lg:block">
                    Create
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-start w-full pr-1 items-center">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl invisible"></div>
              <div className="lg:flex lg:items-center mx-auto lg:gap-5 lg:pr-6">
                <Link
                  href="/create"
                  className="flex justify-start items-center mx-auto group lg:gap-5"
                >
                  <button className="border-[2px] aspect-square h-5 w-5 flex justify-center items-center text-lg border-grayText group-hover:border-sunset group-hover:text-sunset rounded-md pl-[1px] lg:pl-0 lg:pr-[1px] pb-[2px] mx-auto">
                    +
                  </button>
                  <span className="text-[15px] font-bold hidden lg:block group-hover:text-sunset">
                    Create
                  </span>
                </Link>
              </div>
            </div>
          )}
          {/*  */}
        </div>
        {/*  */}
        <div className="w-full">
          {/* Logout */}
          <button
            onClick={() => signOut()}
            className="text-[22px] flex items-center justify-center mt-11 ml-[37px] lg:ml-[48px] text-grayText hover:text-sunset lg:gap-5"
          >
            <FiLogOut />
            <span className="text-[15px] font-bold hidden lg:block">
              Logout
            </span>
          </button>
          {/*  */}
        </div>
      </div>
    </>
  );
};
