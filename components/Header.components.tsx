import Link from 'next/link';
import { ThemeButton } from './ThemeButton.components';

export const Header = () => {
  return (
    <>
      <header className="flex justify-between py-6 bg-gray-300 dark:bg-gray-800">
        <div className="max-w-[1024px] w-full flex justify-between items-center mx-auto px-20">
          <Link href="/">
            <h1 className="text-3xl font-bold">Doodlezilla</h1>
          </Link>
          <ThemeButton />
        </div>
      </header>
    </>
  );
};
