import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ProfileDoodleOptionsModal } from './ProfileDoodleOptionsModal.components';

export const ProfileDoodleCard = ({
  doodleWithCommentsData,
  userData,
}: any) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <>
      {isModal ? <ProfileDoodleOptionsModal setIsModal={setIsModal} /> : null}
      <div className="bg-white border border-grayBorder w-full h-full max-h-[900px] max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:max-w-[575px]">
        {/* Doodle Header */}
        <div className="flex justify-between items-center w-10/12 pb-3">
          <div className="flex gap-3 items-center">
            <Image
              src={
                userData.image
                  ? userData.image
                  : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
              }
              width={43}
              height={43}
              alt="avatar feed"
            />
            <span className="font-semibold">{userData.name}</span>
          </div>
          <HiDotsHorizontal
            onClick={() => setIsModal(true)}
            className="text-2xl cursor-pointer hover:text-sunset"
          />
        </div>
        {/*  */}
        {/* Doodle Image */}

        <Image
          src={doodleWithCommentsData.doodle.image}
          width={533}
          height={900}
          alt="tree"
          className="object-container shrink rounded-3xl w-2/3 mb-3"
        />

        {/*  */}
        <div className="h-[600px] overflow-y-scroll flex flex-col items-center">
          {/* Likes and Comments */}
          <div className="flex flex-col w-10/12 gap-1 mt-4">
            <div className="flex flex-col w-full">
              <div className="text-sm">
                <span className="font-semibold">Apple</span>&nbsp;
                <span className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </span>
              </div>
            </div>
            <p className="text-[10px] text-placeholder">2 HOURS AGO</p>
          </div>
          {/*  */}
          {/* Likes and Comments */}
          <div className="flex flex-col w-10/12 gap-1 mt-4">
            <div className="flex flex-col w-full">
              <div className="text-sm">
                <span className="font-semibold">Apple</span>&nbsp;
                <span className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </span>
              </div>
            </div>
            <p className="text-[10px] text-placeholder">2 HOURS AGO</p>
          </div>
          {/*  */}
        </div>
        <div className="w-full border-t border-grayBorder">
          <div className="w-11/12 flex flex-col mx-auto gap-3 my-3 px-4">
            <div className="flex gap-6">
              <AiOutlineHeart className="text-2xl" />
              <FaRegComment className="text-[22px] mt-[1px]" />
            </div>
            <p className="font-semibold text-xs">20 likes</p>
            <p className="text-xs text-placeholder">22 HOURS AGO</p>
          </div>
        </div>
        <div className="w-full border-t border-grayBorder">
          {/* Write a Comment and Post Button */}
          <div className="w-11/12 flex justify-between mx-auto items-center px-4 mt-3 gap-5">
            <textarea className="w-full h-6 focus:outline-none focus:h-20 overflow-auto" />

            <button type="submit" className="text-cobalt font-semibold text-sm">
              Post
            </button>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};
