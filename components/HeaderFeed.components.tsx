import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search/SearchInput.components';
import { ThemeButton } from './ThemeButton.components';

export const HeaderFeed = () => {
  return (
    <>
      <header className="flex bg-white h-[75px] px-3.5 rounded-b-3xl border-b border-r border-l border-grayBorder">
        <div className="flex items-center max-w-[375px] justify-between w-full mx-auto">
          <Link href="/">
            <button className="hover:opacity-50 mt-1">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670911646/nudoodle/assets/logo-sm_enm9mh.png"
                alt="logo small"
                width={39}
                height={39}
              />
            </button>
          </Link>
          <SearchInput />
          <ThemeButton />
          <button className="bg-gradient-to-tr from-[#F97E1C] via-sunset to-[#D055D3] aspect-square w-[39px] rounded-full text-white text-3xl flex justify-center hover:from-black hover:via-black hover:to-black">
            +
          </button>
        </div>
      </header>
    </>
  );
};
