import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFetchUser from '../hooks/useFetchUser';
import { LoaderSpinner } from './LoaderSpinner.components';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

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
      <footer className="z-40 fixed bottom-0 flex w-full h-[75px] bg-white dark:bg-gray-700 border-t border-grayBorder text-4xl px-9 pt-3 text-placeholder backdrop-blur-sm bg-opacity-75">
        <div className="flex justify-between w-full max-w-[375px] mx-auto">
          {/* Feed Button */}
          {isFeedPage ? (
            <div className="flex flex-col justify-between">
              <Link href="/feed">
                <button>
                  <AiFillHome className="text-sunset" />
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <div className="flex flex-col justify-between">
              <Link href="/feed">
                <button>
                  <AiFillHome />
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl invisible"></div>
            </div>
          )}
          {/*  */}
          {/* Create Button */}
          {isCreatePage ? (
            <div className="flex flex-col justify-between">
              <Link href="/create">
                <button className="border-[3px] aspect-square h-[35px] flex justify-center items-center text-3xl border-sunset text-sunset rounded-md">
                  +
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <Link href="/create">
              <button className="border-[3px] aspect-square h-[35px] flex justify-center items-center text-3xl border-placeholder rounded-md">
                +
              </button>
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
                      width={36}
                      height={36}
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
                <div className="animate-border rounded-full from-transparent via-transparent to-transparent bg-[length:400%_400%] p-0.5 bg-transparent bg-gradient-to-tr duration-300">
                  <button className="bg-transparent rounded-full p-0.5 flex justify-center items-center">
                    <Image
                      src={
                        userData.image
                          ? userData.image
                          : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                      }
                      alt="avatar 36px"
                      width={36}
                      height={36}
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
          <button onClick={() => signOut()} className="text-[35px] flex">
            <FiLogOut />
          </button>
          {/*  */}
        </div>
      </footer>
    </>
  );
};
