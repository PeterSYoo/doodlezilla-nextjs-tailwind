import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search/SearchInput.components';
import { ThemeButton } from './ThemeButton.components';

export const Header = () => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <header className="fixed top-0 z-30 flex h-[75px] w-full rounded-b-3xl border-b border-r border-l border-grayBorder bg-white bg-opacity-75 px-3.5 backdrop-blur-sm dark:border-transparent dark:bg-midnight md:ml-[80px] md:max-w-none md:rounded-none md:border-r-0 md:border-l-0 md:pr-[80px] lg:ml-[199px] lg:pr-[199px]">
        <div className="mx-auto flex w-full max-w-[375px] items-center justify-between  md:max-w-none md:justify-center md:px-20 lg:max-w-[1000px] lg:justify-center lg:px-20">
          {/* Logo Mobile */}
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
          {/*  */}
          {/* Search Input */}
          <div className="md:flex md:w-5/12 md:justify-center lg:w-11/12">
            <SearchInput />
          </div>
          {/*  */}
          {/* Theme Changer Button */}
          <div className="mt-1 flex items-center justify-center md:w-2/12 md:justify-center lg:mr-10 lg:justify-end">
            <ThemeButton />
          </div>
          {/*  */}
          {/* Create new Doodle for Mobile */}
          <Link href="/create">
            <button className="flex aspect-square w-[39px] justify-center rounded-full bg-gradient-to-tr from-[#F97E1C] via-sunset to-[#D055D3] text-3xl text-white transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] md:hidden">
              +
            </button>
          </Link>
          {/*  */}
          {/* Create new Doodle for Desktop */}
          <div className="hidden md:flex md:w-[184px] md:justify-end">
            <Link href="/create">
              <button className="hidden h-[39px] w-[184px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-tr from-[#F97E1C] via-sunset to-[#D055D3] transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] md:flex">
                <div className="text mb-0.5 flex aspect-square h-[19px] w-[19px] items-center justify-center rounded-full bg-white bg-opacity-30 pb-[2px] text-white">
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
