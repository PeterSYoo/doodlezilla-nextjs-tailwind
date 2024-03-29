import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';

type Props = {
  setIsUsernameErrorModalOpen: (value: boolean) => void;
};

export const SignupUsernameErrorModal: React.FC<Props> = ({
  setIsUsernameErrorModalOpen,
}) => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-60">
        {/* Close X Top Right Button */}
        <button
          onClick={() => setIsUsernameErrorModalOpen(false)}
          className="fixed right-2 top-2 text-3xl text-white"
        >
          <RiCloseFill />
        </button>
        {/*  */}
        <div className="container mx-auto w-11/12 md:w-8/12 lg:max-w-[600px]">
          <div className="relative flex flex-col items-center gap-10 rounded-3xl bg-white py-14">
            <BsFillExclamationCircleFill className="text-4xl text-sunset" />
            <h1 className="mx-auto text-center text-xl font-semibold md:text-2xl">
              That Username Already Exists!
            </h1>
            <div className="flex w-full justify-center">
              {/* Submit Button */}
              <button
                onClick={() => setIsUsernameErrorModalOpen(false)}
                className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-20 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]"
              >
                Back to Sign up
              </button>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
