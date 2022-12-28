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
  const router = useRouter();

  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError, userRefetch } = useFetchUser(
    session?.user?.id
  );

  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';

  if (userIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>Error</>;

  return (
    <>
      <footer className="z-40 fixed bottom-0 flex w-full h-[50px] bg-white dark:bg-midnight border-t border-grayBorder dark:border-transparent text-xl px-9 pt-3 text-placeholder backdrop-blur-sm bg-opacity-75 dark:bg-opacity-90 dark:backdrop-blur-sm">
        <div className="flex justify-between w-full max-w-[375px] mx-auto">
          {/* Feed Button */}
          {isFeedPage ? (
            <div className="flex flex-col justify-between items-center">
              <Link href="/feed">
                <button>
                  <AiFillHome className="text-sunset" />
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <div className="flex flex-col justify-between dark:text-egg items-center">
              <Link href="/feed">
                <button>
                  <AiFillHome className="hover:text-sunset dark:hover:text-sunset" />
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl invisible"></div>
            </div>
          )}
          {/*  */}
          {/* Create Button */}
          {isCreatePage ? (
            <div className="flex flex-col justify-between items-center">
              <Link href="/create">
                <MdCreate className="text-sunset" />
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <Link href="/create">
              <MdCreate className="dark:text-egg hover:text-sunset dark:hover:text-sunset" />
            </Link>
          )}
          {/*  */}
          {/* Profile Button */}
          {isProfilePage ? (
            <div className="-mt-1 flex flex-col justify-between items-center">
              <Link href="/profile">
                <div className="animate-border rounded-full from-[#D055D3] via-sunset to-[#F97E1C] bg-[length:400%_400%] p-0.5 bg-black bg-gradient-to-tr duration-300">
                  <button className="bg-white rounded-full p-0.5 flex justify-center items-center">
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
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <div className="-mt-1 flex flex-col justify-between items-center">
              <Link href="/profile">
                <div className="animate-border rounded-full from-transparent via-transparent to-transparent bg-[length:400%_400%] p-0.5 bg-transparent bg-gradient-to-tr duration-300 dark:hover:from-[#D055D3] dark:hover:via-sunset dark:hover:to-[#F97E1C]">
                  <button className="bg-white rounded-full p-0.5 flex justify-center items-center">
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
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl invisible"></div>
            </div>
          )}
          {/*  */}
          {/* Logout Button */}
          <button onClick={() => signOut()} className="flex">
            <FiLogOut className="dark:text-egg hover:text-sunset dark:hover:text-sunset" />
          </button>
          {/*  */}
        </div>
      </footer>
    </>
  );
};
