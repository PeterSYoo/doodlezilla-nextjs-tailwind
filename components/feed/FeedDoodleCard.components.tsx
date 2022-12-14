import Image from 'next/image';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { useState } from 'react';
import { DoodleCardModal } from '../DoodleCardModal.components';

export const FeedDoodleCard = () => {
  const [isModal, setIsModal] = useState<boolean>();

  return (
    <>
      {isModal ? <DoodleCardModal setIsModal={setIsModal} /> : null}
      <div className="bg-white border border-grayBorder w-full max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:max-w-[474px] lg:max-w-[733px]">
        {/* Doodle Header */}
        <div className="flex justify-between items-center w-10/12 pb-3">
          <div className="flex gap-3 items-center">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
              width={43}
              height={43}
              alt="avatar feed"
            />
            <span className="font-semibold">Apple</span>
          </div>
          <HiDotsHorizontal
            onClick={() => setIsModal(true)}
            className="text-2xl cursor-pointer text-placeholder hover:text-neutral-800"
          />
        </div>
        {/*  */}
        {/* Doodle Image */}
        <div className="bg-zinc-50 border border-grayBorder rounded-[50px] w-11/12 flex justify-center items-center py-2">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670922076/nudoodle/assets/image_3_6_gifnqn.png"
            width={272}
            height={400}
            alt="tree"
          />
        </div>
        {/*  */}
        {/* Likes and Comments */}
        <div className="flex flex-col w-10/12 gap-4 mt-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <AiOutlineHeart />
              <span className="font-semibold text-sm">5 likes</span>
            </div>
            <div className="flex items-center gap-3">
              <FaRegComment />
              <span className="font-semibold text-sm">4 Comments</span>
            </div>
          </div>
          <div className="border-b border-grayBorder w-full"></div>
          <div className="flex flex-col w-full">
            <div className="text-sm">
              <span className="font-semibold">Apple</span>&nbsp;
              <span className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat...
              </span>
              &nbsp;
              <span className="text-placeholder">more</span>
            </div>
          </div>
          <p className="font-bold text-placeholder text-sm">
            View all 4 comments
          </p>
          <p className="text-[10px] text-placeholder">2 HOURS AGO</p>
        </div>
        {/*  */}
      </div>
    </>
  );
};
