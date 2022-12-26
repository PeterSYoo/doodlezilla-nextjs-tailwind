import { useState } from 'react';
import { useRouter } from 'next/router';
import useDeleteDoodle from '../../../hooks/useDeleteDoodle';
import { RiCloseFill } from 'react-icons/ri';

type DoodleCardModalProps = {
  setIsOptionsModal: (isModal: boolean) => void;
  doodleWithCommentsData: {
    doodle: {
      _id: string;
      user: string;
      image: string;
      likes: number;
      created_at: string;
      updated_at: string;
      __v: number;
    };
  };
};

export const ProfileDoodleOptionsModal = ({
  doodleWithCommentsData,
  setIsOptionsModal,
}: DoodleCardModalProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const router = useRouter();

  const { mutateDeleteDoodle, isLoadingDeleteDoodle } = useDeleteDoodle(router);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50 flex justify-center items-center">
        <button
          onClick={() => setIsOptionsModal(false)}
          className="fixed right-2 top-2 text-3xl text-white dark:text-black"
        >
          <RiCloseFill />
        </button>
        <div className="container mx-auto w-11/12 md:w-96">
          <div className="relative py-6 bg-white dark:bg-midnight rounded-3xl flex flex-col gap-6 items-center">
            {isDelete ? null : (
              <button
                onClick={() => setIsDelete(true)}
                className="font-semibold text-sunset hover:text-neutral-800 dark:hover:text-egg"
              >
                Delete
              </button>
            )}
            {isDelete ? (
              <div className="font-semibold flex gap-3 text-placeholder dark:text-shadeText">
                <span
                  onClick={() =>
                    mutateDeleteDoodle(doodleWithCommentsData.doodle._id)
                  }
                  className="cursor-pointer hover:text-sunset dark:text-egg dark:hover:text-sunset"
                >
                  Yes
                </span>{' '}
                /{' '}
                <span
                  onClick={() => setIsDelete(false)}
                  className="cursor-pointer hover:text-black dark:text-egg dark:hover:text-sunset"
                >
                  No
                </span>
              </div>
            ) : null}
            <div className="border-b border-grayBorder w-11/12 dark:border-shadeDark"></div>
            <button
              onClick={() => setIsOptionsModal(false)}
              className="font-semibold text-grayText hover:text-neutral-800 dark:text-shadeText dark:hover:text-egg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
