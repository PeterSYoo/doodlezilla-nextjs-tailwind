import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { BsFillSunFill, BsMoonStars } from 'react-icons/bs';

export const ThemeButton = () => {
  // States ------------------------------------------------------------- ***
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    setMounted(true);
  }, []);

  // JSX ------------------------------------------------------------------ ***
  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <>
          <button onClick={() => setTheme('light')} type="button">
            <BsFillSunFill className="text-[28px] hover:text-sunset dark:text-egg dark:hover:text-sunset md:text-[28px]" />
          </button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => setTheme('dark')} type="button">
            <BsMoonStars className="text-[28px] hover:text-sunset dark:text-egg dark:hover:text-sunset md:text-[28px]" />
          </button>
        </>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
};
