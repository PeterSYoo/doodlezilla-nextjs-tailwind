import { useRouter } from 'next/router';
import { RiCloseFill } from 'react-icons/ri';

type Props = {
  setIsSuccessModal: (value: boolean) => void;
};

export const CreateSuccessModal: React.FC<Props> = ({ setIsSuccessModal }) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
        <div className="container mx-auto w-11/12 md:w-10/12 lg:max-w-[768px]">
          <div className="relative flex flex-col items-center gap-6 rounded-3xl bg-white py-10 dark:bg-midnight md:gap-3">
            <h1 className="mx-auto text-center text-xl font-semibold dark:text-egg md:text-2xl">
              Your doodle has succesfully been uploaded!
            </h1>
            <div className="flex w-full flex-col justify-center gap-2 px-10 md:mt-10 md:flex-row md:gap-5">
              {/* Create new Doodle Button */}
              <span
                onClick={() => router.push('/create')}
                className="flex cursor-pointer items-center justify-center rounded-full border border-placeholder bg-gradient-to-tr py-1 px-5 font-bold transition duration-75 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeText dark:text-egg dark:hover:border-transparent"
              >
                Create new Doodle
              </span>
              {/*  */}
              {/* Go to Profile Button */}
              <button
                onClick={() => router.push('/profile')}
                className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-5 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]"
              >
                Go to Profile
              </button>
              {/*  */}
              {/* Go to Feed Button */}
              <button
                onClick={() => router.push('/feed')}
                className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-5 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]"
              >
                Go to Feed
              </button>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
