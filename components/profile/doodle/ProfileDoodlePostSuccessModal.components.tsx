import { useRouter } from 'next/router';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';

type Props = {
  setIsPostSuccessModal: (value: boolean) => void;
};

export const ProfileDoodlePostSuccessModal: React.FC<Props> = ({
  setIsPostSuccessModal,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-60 flex justify-center items-center">
        {/* Close X Top Right Button */}
        <button
          onClick={() => setIsPostSuccessModal(false)}
          className="fixed right-2 top-2 text-3xl text-white"
        >
          <RiCloseFill />
        </button>
        {/*  */}
        <div className="container mx-auto w-11/12 md:w-8/12 lg:max-w-[600px]">
          <div className="relative py-14 bg-white rounded-3xl flex flex-col gap-10 items-center">
            <BsFillCheckCircleFill className="text-green-600 text-4xl" />
            <h1 className="font-semibold text-xl md:text-2xl mx-auto text-center">
              Comment Posted!
            </h1>
            <div className="flex justify-center w-full">
              {/* Submit Button */}
              <button
                onClick={() => setIsPostSuccessModal(false)}
                className="py-2 px-20 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
              >
                Back to Doodle
              </button>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
