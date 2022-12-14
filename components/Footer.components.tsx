import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

export const Footer = () => {
  const router = useRouter();

  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';

  return (
    <>
      <footer className="z-40 fixed bottom-0 flex w-full h-[75px] bg-white dark:bg-gray-700 border-t border-grayBorder text-4xl px-9 pt-3 text-placeholder backdrop-blur-sm bg-opacity-75">
        <div className="flex justify-between w-full max-w-[375px] mx-auto">
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
          {isCreatePage ? (
            <div className="flex flex-col justify-between">
              <Link href="/create">
                <button className="border-[3px] aspect-square h-[35px] flex justify-center items-center pb-1 text-3xl border-sunset text-sunset rounded-md">
                  +
                </button>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <Link href="/create">
              <button className="border-[3px] aspect-square h-[35px] flex justify-center items-center pb-1 text-3xl border-placeholder rounded-md">
                +
              </button>
            </Link>
          )}
          {isProfilePage ? (
            <div className="-mt-1 flex flex-col justify-between items-center">
              <Link href="/profile">
                <div className="animate-border rounded-full from-[#D055D3] via-sunset to-[#F97E1C] bg-[length:400%_400%] p-0.5 bg-black bg-gradient-to-tr duration-300">
                  <button className="bg-white rounded-full p-0.5 flex justify-center items-center">
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                      alt="avatar 36px"
                      width={36}
                      height={36}
                    />
                  </button>
                </div>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <div className="-mt-1 flex flex-col justify-between items-center">
              <Link href="/profile">
                <div className="animate-border rounded-full from-white via-white to-white bg-[length:400%_400%] p-0.5 bg-black bg-gradient-to-tr duration-300">
                  <button className="bg-white rounded-full p-0.5 flex justify-center items-center">
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                      alt="avatar 36px"
                      width={36}
                      height={36}
                    />
                  </button>
                </div>
              </Link>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl invisible"></div>
            </div>
          )}
          <button className="text-[35px] flex">
            <FiLogOut />
          </button>
        </div>
      </footer>
    </>
  );
};
