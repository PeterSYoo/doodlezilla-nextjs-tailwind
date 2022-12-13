import Image from 'next/image';
import { AiFillHome } from 'react-icons/ai';

export const NavBar = () => {
  return (
    <>
      <div className="fixed bg-white h-full hidden md:flex md:w-[94px] lg:w-[213px] md:mr-[159px] lg:mr-[258px] border-r border-grayBorder md:flex-col">
        <div className="w-full h-[362px] border-b border-grayBorder">
          <div className="w-full h-[41px] flex flex-col items-center justify-center mt-[22px]">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910331/nudoodle/assets/logo-md_eantja.png"
              alt="logo md"
              width={137}
              height={41}
            />
          </div>
          <div className="flex justify-between items-center w-full bg-red-100">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
              alt="avatar"
              width={72}
              height={72}
            />
          </div>
        </div>
        <div className="w-full h-[173px] border-b border-grayBorder flex items-center gap-5">
          <AiFillHome className="text-2xl" />
          <span className="text-[15px] font-bold">Feed</span>
        </div>
        <div className="w-full"></div>
      </div>
    </>
  );
};
