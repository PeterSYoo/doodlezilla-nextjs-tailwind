import Image from 'next/image';
import { useState } from 'react';
import { ProfileEditModal } from '../../components/profile/ProfileEditModal.components';

const UserIdPage = () => {
  const [isModal, setIsModal] = useState<boolean>();

  return (
    <>
      {isModal ? <ProfileEditModal setIsModal={setIsModal} /> : null}
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col items-center gap-5 mt-24 mb-32 md:justify-start">
        {/* Profile Avatar & bio */}
        <div className="md:hidden grid grid-cols-12 w-[375px]">
          <div className="col-start-1 col-span-4 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1671059751/nudoodle/assets/download_2_qkqj5l.png"
                width={75}
                height={75}
                alt="profile avatar mobile"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-bold break-all">Apple</h1>
              <p className="font-semibold text-xs">
                20 <span className="font-normal text-placeholder">DOODLES</span>
              </p>
            </div>
            <p className="font-semibold text-xs text-placeholder">
              Based in Japan
            </p>
          </div>
          <div className="col-start-5 col-span-8 mt-3 flex flex-col gap-3">
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              quibusdam officiis cum excepturi libero harum quaerat aliquid
              veritatis? Quis aliquid eligendi obcaecati aperiam voluptas veniam
              est qui quam molestias mollitia!
            </p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="border-b border-grayBorder w-[375px] md:hidden"></div>
        {/*  */}
        {/* Header Text */}
        <h1 className="hidden font-bold text-2xl md:flex justify-start md:w-3/4 lg:w-[733px] md:mt-5">
          Doodles
        </h1>
        {/*  */}
        <div className="border-b border-grayBorder md:w-3/4 lg:w-[733px]"></div>
        {/* Doodles List */}
        <div className="w-[375px] md:w-3/4 lg:w-[733px] grid grid-cols-3 gap-2 md:gap-4 lg:gap-5 px-3 md:px-0">
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
          <div className="bg-purple-300 w-full rounded-xl aspect-[3/4]"></div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default UserIdPage;
