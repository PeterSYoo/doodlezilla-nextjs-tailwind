import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search/SearchInput.components';
import { ThemeButton } from './ThemeButton.components';

export const HeaderCompressed = () => {
  return (
    <>
      <header className="z-30 fixed top-0 w-full flex bg-white h-[75px] px-3.5 rounded-b-3xl border-b border-r border-l border-grayBorder md:max-w-none md:-ml-5 lg:-ml-5.5 lg:mr-[258px] md:rounded-none md:border-r-0 md:border-l-0 backdrop-blur-sm bg-opacity-75">
        <div className="flex items-center max-w-[375px] md:max-w-[500px] lg:max-w-[700px] mx-auto justify-between w-full md:justify-start">
          <Link href="/feed">
            <button className="mt-1 md:hidden">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670911646/nudoodle/assets/logo-sm_enm9mh.png"
                alt="logo small"
                width={39}
                height={39}
              />
            </button>
          </Link>
          <div className="md:w-5/12 lg:w-11/12 md:flex md:justify-center">
            <SearchInput />
          </div>
          <div className="flex justify-center items-center mt-1 md:justify-center md:w-2/12 lg:justify-end lg:mr-10">
            <ThemeButton />
          </div>
          {/* Create new Doodle for Mobile */}
          <Link href="/create">
            <button className="bg-gradient-to-tr from-[#F97E1C] via-sunset to-[#D055D3] aspect-square w-[39px] rounded-full text-white text-3xl flex justify-center md:hidden transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%]">
              +
            </button>
          </Link>
          {/*  */}
          {/* Create new Doodle for Desktop */}
          <div className="md:w-[184px] md:flex md:justify-end hidden">
            <Link href="/create">
              <button className="hidden bg-gradient-to-tr from-[#F97E1C] via-sunset to-[#D055D3] w-[184px] h-[39px] rounded-full md:flex justify-center items-center gap-2.5 transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%]">
                <div className="aspect-square w-[19px] h-[19px] bg-white bg-opacity-30 rounded-full flex justify-center items-center text-white pb-[2px] mb-0.5 text">
                  +
                </div>
                <span className="text-xs font-semibold text-white">
                  Create new Doodle
                </span>
              </button>
            </Link>
          </div>
          {/*  */}
        </div>
      </header>
    </>
  );
};
