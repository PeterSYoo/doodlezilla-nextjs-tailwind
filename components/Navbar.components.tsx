import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

export const NavBar = () => {
  const router = useRouter();

  const isFeedPage = router.asPath === '/feed';

  return (
    <>
      <div className="z-50 fixed bg-white h-full hidden md:flex md:w-[94px] lg:w-[213px] md:mr-[159px] lg:mr-[258px] border-r border-grayBorder md:flex-col">
        <div className="w-full h-[362px] border-b border-grayBorder flex flex-col justify-between">
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
          <div className="flex flex-col justify-between items-center w-full">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
              alt="avatar"
              width={72}
              height={72}
            />
            <p className="font-semibold mt-6 w-full break-words px-2 text-center">
              Apple
            </p>
            <div className="flex flex-col items-center my-9">
              <p className="text-xs font-bold">20</p>
              <p className="text-xs text-placeholder">POSTS</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="w-full border-b border-grayBorder flex flex-col items-center gap-11 text-placeholder pt-11 pb-11">
          {isFeedPage ? (
            <div className="flex justify-start w-full pr-1">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl"></div>
              <button className="flex justify-center items-center text-xl text-sunset mx-auto lg:pr-10 lg:gap-5">
                <AiFillHome />
                <span className="text-[15px] font-bold hidden text-sunset lg:block">
                  Feed
                </span>
              </button>
            </div>
          ) : (
            <div className="flex justify-start w-full pr-1">
              <div className="w-[4px] h-[35px] bg-sunset rounded-r-2xl invisible"></div>
              <button className="flex justify-center items-center text-xl mx-auto lg:pr-10 lg:gap-5">
                <AiFillHome />
                <span className="text-[15px] font-bold hidden lg:block">
                  Feed
                </span>
              </button>
            </div>
          )}
          <div className="flex justify-start w-full pr-1">
            <div className="w-[4px] h-[35px] bg-sunset rounded-t-2xl invisible"></div>
            <div className="lg:flex lg:items-center mx-auto lg:gap-5 lg:pr-6">
              <button className="border-[2px] aspect-square h-5 w-5 flex justify-center items-center text-lg border-placeholder rounded-md pl-[1px] lg:pl-0 lg:pr-[1px] pb-[2px] mx-auto">
                +
              </button>
              <span className="text-[15px] font-bold hidden lg:block">
                Create
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full">
          <button className="text-[22px] flex items-center justify-center mt-11 w-full text-placeholder lg:gap-5 lg:pr-6">
            <FiLogOut />
            <span className="text-[15px] font-bold hidden lg:block">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
