import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFetchUser from '../hooks/useFetchUser';
import { LoaderSpinner } from './LoaderSpinner.components';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdCreate } from 'react-icons/md';

export const Footer = () => {
  // States ------------------------------------------------------------- ***
  const router = useRouter();

  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError, userRefetch } = useFetchUser(
    session?.user?.id
  );

  // Constants ----------------------------------------------------------- ***
  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';

  // JSX ------------------------------------------------------------------ ***
  if (userIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>Error</>;

  return (
    <>
      <footer className="fixed bottom-0 z-40 flex h-[50px] w-full border-t border-grayBorder bg-white bg-opacity-75 px-9 pt-3 text-xl text-placeholder backdrop-blur-sm dark:border-transparent dark:bg-midnight dark:bg-opacity-90 dark:backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[375px] justify-between">
          {/* Feed Button */}
          {isFeedPage ? (
            <div className="flex flex-col items-center justify-between">
              <Link href="/feed">
                <button>
                  <AiFillHome className="text-sunset" />
                </button>
              </Link>
              <div className="h-[4px] w-[35px] rounded-t-2xl bg-sunset"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between dark:text-egg">
              <Link href="/feed">
                <button>
                  <AiFillHome className="hover:text-sunset dark:hover:text-sunset" />
                </button>
              </Link>
              <div className="invisible h-[4px] w-[35px] rounded-t-2xl bg-sunset"></div>
            </div>
          )}
          {/*  */}
          {/* Create Button */}
          {isCreatePage ? (
            <div className="flex flex-col items-center justify-between">
              <Link href="/create">
                <MdCreate className="text-sunset" />
              </Link>
              <div className="h-[4px] w-[35px] rounded-t-2xl bg-sunset"></div>
            </div>
          ) : (
            <Link href="/create">
              <MdCreate className="hover:text-sunset dark:text-egg dark:hover:text-sunset" />
            </Link>
          )}
          {/*  */}
          {/* Profile Button */}
          {isProfilePage ? (
            <div className="-mt-1 flex flex-col items-center justify-between">
              <Link href="/profile">
                <div className="animate-border rounded-full bg-black bg-gradient-to-tr from-[#D055D3] via-sunset to-[#F97E1C] bg-[length:400%_400%] p-0.5 duration-300">
                  <button className="flex items-center justify-center rounded-full bg-white p-0.5">
                    <Image
                      src={
                        userData.image
                          ? userData.image
                          : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                      }
                      alt="avatar 36px"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </button>
                </div>
              </Link>
              <div className="h-[4px] w-[35px] rounded-t-2xl bg-sunset"></div>
            </div>
          ) : (
            <div className="-mt-1 flex flex-col items-center justify-between">
              <Link href="/profile">
                <div className="animate-border rounded-full bg-transparent bg-gradient-to-tr from-transparent via-transparent to-transparent bg-[length:400%_400%] p-0.5 duration-300 dark:hover:from-[#D055D3] dark:hover:via-sunset dark:hover:to-[#F97E1C]">
                  <button className="flex items-center justify-center rounded-full bg-white p-0.5">
                    <Image
                      src={
                        userData.image
                          ? userData.image
                          : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                      }
                      alt="avatar 36px"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </button>
                </div>
              </Link>
              <div className="invisible h-[4px] w-[35px] rounded-t-2xl bg-sunset"></div>
            </div>
          )}
          {/*  */}
          {/* Logout Button */}
          <button onClick={() => signOut()} className="flex">
            <FiLogOut className="hover:text-sunset dark:text-egg dark:hover:text-sunset" />
          </button>
          {/*  */}
        </div>
      </footer>
    </>
  );
};
