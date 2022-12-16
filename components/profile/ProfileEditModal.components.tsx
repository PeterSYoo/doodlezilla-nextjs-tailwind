import { RiCloseFill } from 'react-icons/ri';

export const ProfileEditModal = ({ setIsModal }: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-60 flex justify-center items-center">
        {/* Close X Top Right Button */}
        <button
          onClick={() => setIsModal(false)}
          className="fixed right-2 top-2 text-3xl text-white"
        >
          <RiCloseFill />
        </button>
        {/*  */}
        <div className="container mx-auto w-11/12 md:w-6/12">
          <div className="relative py-6 bg-white rounded-3xl flex flex-col gap-6 items-center">
            <div className="flex justify-end gap-5 w-full mr-20">
              {/* Cancel Button */}
              <span
                onClick={() => setIsModal(false)}
                className="border py-1 px-5 rounded-full border-placeholder transition duration-75 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white flex justify-center items-center cursor-pointer font-bold"
              >
                Cancel
              </span>
              {/*  */}
              {/* Submit Button */}
              <button
                type="submit"
                className="py-2 px-5 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
              >
                Submit
              </button>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};