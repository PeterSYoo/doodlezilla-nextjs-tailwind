import { RiCloseFill } from 'react-icons/ri';

export const DoodleCardModal = ({ setIsModal }: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-60 flex justify-center items-center">
        <button
          onClick={() => setIsModal(false)}
          className="fixed right-2 top-2 text-3xl text-white"
        >
          <RiCloseFill />
        </button>
        <div className="container mx-auto w-11/12 md:w-96">
          <div className="relative py-6 bg-white rounded-3xl flex flex-col gap-6 items-center">
            <button className="font-semibold text-sunset hover:text-neutral-800">
              Delete
            </button>
            <div className="border-b border-grayBorder w-11/12"></div>
            <button className="font-semibold text-grayText hover:text-neutral-800">
              Go to Doodle
            </button>
            <div className="border-b border-grayBorder w-11/12"></div>
            <button
              onClick={() => setIsModal(false)}
              className="font-semibold text-grayText hover:text-neutral-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
