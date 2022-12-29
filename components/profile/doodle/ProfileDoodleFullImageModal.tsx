import Image from 'next/image';
import { RiCloseFill } from 'react-icons/ri';

type ProfileDoodleFullImageModalProps = {
  setIsImageModal: (arg0: boolean) => void;
  doodleImage: string;
};

export const ProfileDoodleFullImageModal = ({
  setIsImageModal,
  doodleImage,
}: ProfileDoodleFullImageModalProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black dark:bg-black dark:bg-opacity-80 bg-opacity-50 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          <Image
            src={
              doodleImage
                ? doodleImage
                : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
            }
            width="0"
            height="0"
            sizes="100vw"
            alt="doodle full image"
            className="w-3/4 aspect-video object-contain"
          />
          {/* Close X Top Right Button */}
          <div>
            <span
              onClick={() => setIsImageModal(false)}
              className="text-3xl text-egg dark:text-egg cursor-pointer dark:hover:text-sunset hover:text-sunset"
            >
              <RiCloseFill />
            </span>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};
