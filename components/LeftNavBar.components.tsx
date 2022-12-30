import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFetchUser from '../hooks/useFetchUser';
import useFetchUserDoodles from '../hooks/useFetchUsersDoodles';
import { LoaderSpinner } from './LoaderSpinner.components';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export const LeftNavBar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const { data: session }: any = useSession();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session?.user?.id
  );
  const { userDoodlesData, userDoodlesIsLoading, userDoodlesIsError } =
    useFetchUserDoodles(session?.user?.id);

  const router = useRouter();

  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';

  if (userIsLoading || userDoodlesIsLoading) return <LoaderSpinner />;
  if (userIsError || userDoodlesIsError) return <>Error</>;

  return (
    <>
      <div className="fixed z-40 hidden h-full border-r border-grayBorder bg-white dark:border-midnight dark:bg-midnight md:mr-[159px] md:flex md:w-[94px] md:flex-col lg:mr-[258px] lg:w-[213px]">
        <div className="flex h-[425px] w-full flex-col justify-between border-b border-grayBorder dark:border-shadeDark">
          {/* Logo for Mobile and Desktop */}
          <div className="mt-[19px] flex h-[41px] w-full flex-col items-center justify-center">
            <Link href="/feed">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670911646/nudoodle/assets/logo-sm_enm9mh.png"
                alt="logo md"
                width={39}
                height={39}
                className="md:block lg:hidden"
              />
              <Image
                src={
                  currentTheme === 'dark'
                    ? 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1672020986/nudoodle/assets/logo-dark_fruvjv.png'
                    : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910331/nudoodle/assets/logo-md_eantja.png'
                }
                alt="logo lg"
                width={137}
                height={41}
                className="md:hidden lg:block"
              />
            </Link>
          </div>
          {/*  */}
          <div className="flex w-full flex-col items-center justify-between">
            {/* Profile Avatar */}
            {isProfilePage ? (
              <div className="flex w-full items-center justify-start pr-1">
                <div className="h-[60px] w-[4px] rounded-r-2xl bg-sunset lg:h-[72px]"></div>
                <div className="flex w-full justify-center">
                  <Link href="/profile">
                    <div className="animate-border rounded-full bg-black bg-gradient-to-tr from-[#D055D3] via-sunset to-[#F97E1C] bg-[length:200%_200%] p-0.5 duration-500">
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white p-0.5 dark:bg-shadeDark lg:h-[72px] lg:w-[72px]">
                        <Image
                          src={
                            userData.image
                              ? userData.image
                              : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                          }
                          alt="avatar"
                          width={72}
                          height={72}
                          className="aspect-square rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-start pr-1">
                <div className="invisible h-[35px] w-[4px] rounded-r-2xl bg-sunset"></div>
                <div className="flex w-full justify-center">
                  <Link href="/profile">
                    <div className="rounded-full bg-white bg-gradient-to-tr bg-[length:200%_200%] p-0.5 duration-500 hover:animate-border hover:from-[#D055D3] hover:via-sunset hover:to-[#F97E1C] dark:bg-shadeDark">
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white p-0.5 dark:bg-shadeDark lg:h-[72px] lg:w-[72px]">
                        <Image
                          src={
                            userData.image
                              ? userData.image
                              : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                          }
                          alt="avatar"
                          width={72}
                          height={72}
                          className="aspect-square rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {/*  */}
            {/* Username */}
            <p className="mt-6 w-full break-words px-2 text-center font-semibold dark:text-egg">
              {userData.name}
            </p>
            {/*  */}
            {/* Location */}
            <p className="mt-1 w-full break-words px-2 text-center text-xs text-grayText dark:text-shadeText">
              {userData.location}
            </p>
            {/*  */}
            {/* Number of Doodles */}
            <div className="my-9 flex flex-col items-center">
              <p className="text-xs font-semibold dark:text-egg">
                {userDoodlesData.length}
              </p>
              <p className="text-xs text-grayText dark:text-shadeText">
                DOODLES
              </p>
            </div>
            {/*  */}
          </div>
        </div>
        {/* Navigation */}
        <div className="flex w-full flex-col items-center gap-11 border-b border-grayBorder pt-11 pb-11 text-grayText dark:border-shadeDark dark:text-egg">
          {/* If Feed Page */}
          {isFeedPage ? (
            <div className="flex w-full items-center justify-start pr-1">
              <div className="h-[35px] w-[4px] rounded-r-2xl bg-sunset"></div>
              <Link
                href="/feed"
                className="mx-auto flex justify-start lg:ml-[45px]"
              >
                <div className="flex items-center justify-center">
                  <button className="mx-auto flex items-center justify-center text-xl text-sunset lg:gap-5">
                    <AiFillHome />
                    <span className="hidden text-[15px] font-bold text-sunset lg:block">
                      Feed
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex w-full items-center justify-start pr-1">
              <div className="invisible h-[35px] w-[4px] rounded-r-2xl bg-sunset"></div>
              <Link
                href="/feed"
                className="group mx-auto flex justify-start lg:ml-[45px]"
              >
                <div className="flex items-center justify-center">
                  <button className="mx-auto flex items-center justify-center text-xl text-grayText group-hover:text-sunset dark:text-egg lg:gap-5">
                    <AiFillHome />
                    <span className="hidden text-[15px] font-bold text-grayText group-hover:text-sunset dark:text-shadeText lg:block">
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
            <div className="flex w-full items-center justify-start pr-1">
              <div className="h-[35px] w-[4px] rounded-r-2xl bg-sunset"></div>
              <div className="mx-auto text-sunset lg:flex lg:items-center lg:gap-5 lg:pr-6">
                <Link
                  href="/create"
                  className="group mx-auto flex items-center justify-start lg:gap-5"
                >
                  <button className="mx-auto flex aspect-square h-5 w-5 items-center justify-center rounded-md border-[2px] border-sunset pl-[1px] pb-[2px] text-lg lg:pl-0 lg:pr-[1px]">
                    +
                  </button>
                  <span className="hidden text-[15px] font-bold lg:block">
                    Create
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-start pr-1">
              <div className="invisible h-[35px] w-[4px] rounded-r-2xl bg-sunset"></div>
              <div className="mx-auto lg:flex lg:items-center lg:gap-5 lg:pr-6">
                <Link
                  href="/create"
                  className="group mx-auto flex items-center justify-start lg:gap-5"
                >
                  <button className="mx-auto flex aspect-square h-5 w-5 items-center justify-center rounded-md border-[2px] border-grayText pl-[1px] pb-[2px] text-lg group-hover:border-sunset group-hover:text-sunset lg:pl-0 lg:pr-[1px]">
                    +
                  </button>
                  <span className="hidden text-[15px] font-bold group-hover:text-sunset dark:text-shadeText lg:block">
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
            className="group mt-11 ml-[37px] flex items-center justify-center text-[22px] text-grayText hover:text-sunset lg:ml-[48px] lg:gap-5"
          >
            <FiLogOut className="group-hover:text-sunset dark:text-egg" />
            <span className="hidden text-[15px] font-bold group-hover:text-sunset dark:text-shadeText lg:block">
              Logout
            </span>
          </button>
          {/*  */}
        </div>
      </div>
    </>
  );
};
