import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { CgAddR } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

export const Footer = () => {
  const router = useRouter();

  const isFeedPage = router.asPath === '/feed';

  return (
    <>
      <footer className="flex w-full h-[75px] bg-white dark:bg-gray-700 border-t border-grayBorder text-4xl px-9 pt-3">
        <div className="flex justify-between w-full max-w-[375px] mx-auto">
          {isFeedPage ? (
            <div className="flex flex-col justify-between">
              <AiFillHome className="text-sunset" />
              <div className="w-[35px] h-[4px] bg-sunset rounded-t-2xl"></div>
            </div>
          ) : (
            <AiFillHome />
          )}
          <CgAddR />
          <div className="w-[35px] height-[35px]">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
              alt="avatar 35px"
              width={35}
              height={35}
            />
          </div>
          <FiLogOut />
        </div>
      </footer>
    </>
  );
};
