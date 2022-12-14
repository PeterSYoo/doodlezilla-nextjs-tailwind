import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

export const Footer = () => {
  const router = useRouter();

  const isFeedPage = router.asPath === '/feed';

  return (
    <>
      <footer className="z-40 fixed bottom-0 flex w-full h-[75px] bg-white dark:bg-gray-700 border-t border-grayBorder text-4xl px-9 pt-3 text-placeholder backdrop-blur-sm bg-opacity-75">
        <div className="flex justify-between w-full max-w-[375px] mx-auto">
          {isFeedPage ? (
            <div className="flex flex-col justify-between">
              <button>
                <AiFillHome className="text-sunset" />
              </button>
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <button>
              <AiFillHome />
            </button>
          )}
          <button className="border-[3px] aspect-square h-[35px] flex justify-center items-center pb-1 text-3xl border-placeholder rounded-md">
            +
          </button>
          <button className="w-[36px] height-[36px] flex">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
              alt="avatar 36px"
              width={36}
              height={36}
            />
          </button>
          <button className="text-[35px] flex">
            <FiLogOut />
          </button>
        </div>
      </footer>
    </>
  );
};
