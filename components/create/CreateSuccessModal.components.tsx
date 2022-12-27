import { useRouter } from 'next/router';
import { RiCloseFill } from 'react-icons/ri';

type Props = {
  setIsSuccessModal: (value: boolean) => void;
};

export const CreateSuccessModal: React.FC<Props> = ({ setIsSuccessModal }) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50 flex justify-center items-center">
        <div className="container mx-auto w-11/12 md:w-10/12 lg:max-w-[768px]">
          <div className="relative pb-10 bg-white dark:bg-midnight rounded-3xl flex flex-col gap-6 items-center md:gap-3">
            {/* Close X Top Right Button */}
            <div className="flex justify-end w-full">
              <span
                onClick={() => setIsSuccessModal(false)}
                className="text-3xl dark:text-egg mx-5 mt-3 cursor-pointer md:flex"
              >
                <RiCloseFill />
              </span>
            </div>
            {/*  */}
            <h1 className="font-semibold text-xl md:text-2xl mx-auto text-center dark:text-egg">
              Your doodle has succesfully been uploaded!
            </h1>
            <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5 w-full px-10 md:mt-10">
              {/* Create new Doodle Button */}
              <span
                onClick={() => router.push('/create')}
                className="border py-1 px-5 rounded-full border-placeholder dark:border-shadeText transition duration-75 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white flex justify-center items-center cursor-pointer font-bold dark:hover:border-transparent dark:text-egg"
              >
                Create new Doodle
              </span>
              {/*  */}
              {/* Go to Profile Button */}
              <button
                onClick={() => router.push('/profile')}
                className="py-2 px-5 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
              >
                Go to Profile
              </button>
              {/*  */}
              {/* Go to Feed Button */}
              <button
                onClick={() => router.push('/feed')}
                className="py-2 px-5 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
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
