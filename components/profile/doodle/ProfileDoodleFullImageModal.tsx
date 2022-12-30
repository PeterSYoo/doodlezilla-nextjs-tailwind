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
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-80">
        <div className="flex w-full flex-col items-center justify-center gap-3">
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
            className="aspect-video w-3/4 object-contain"
          />
          {/* Close X Top Right Button */}
          <div>
            <span
              onClick={() => setIsImageModal(false)}
              className="cursor-pointer text-3xl text-egg hover:text-sunset dark:text-egg dark:hover:text-sunset"
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
