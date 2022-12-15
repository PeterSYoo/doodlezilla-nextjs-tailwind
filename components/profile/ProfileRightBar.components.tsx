import Image from 'next/image';
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ProfileEditModal } from './ProfileEditModal.components';

export const ProfileRightBar = () => {
  const [isModal, setIsModal] = useState<boolean>();

  return (
    <>
      {isModal ? <ProfileEditModal setIsModal={setIsModal} /> : null}
      <div className="z-40 fixed bg-white right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder md:flex-col px-1">
        <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
          <div className="flex justify-between items-center mt-[18px]">
            <h1 className="font-semibold ml-2 lg:ml-0">Profile</h1>
            <button
              onClick={() => setIsModal(true)}
              className="border py-1 px-5 text-xs rounded-lg border-placeholder transition duration-100 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white font-semibold mr-2"
            >
              Edit
            </button>
          </div>
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1671059751/nudoodle/assets/download_2_qkqj5l.png"
              width={140}
              height={140}
              alt="profile avatar"
              className="lg:hidden"
            />
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1671059751/nudoodle/assets/download_2_qkqj5l.png"
              width={200}
              height={200}
              alt="profile avatar"
              className="md:hidden lg:block"
            />
          </div>
          {/*  */}
          <div className="flex flex-col md:px-2 lg:px-0 gap-1 md:items-center lg:items-start">
            {/* Username */}
            <h1 className="font-bold w-full break-all text-lg">APPLE</h1>
            {/*  */}
            <div className="flex flex-col justify-between lg:items-start gap-6">
              {/* Doodles Count */}
              <p className="font-semibold text-xs">
                20 <span className="text-placeholder">Doodles</span>
              </p>
              {/*  */}
              {/* Bio */}
              <p className="text-xs text-placeholder">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, tenetur earum id ducimus ipsam fuga error sit odio in
                harum voluptatibus debitis cumque maiores unde vitae a! Veniam,
                voluptatum nam?
              </p>
              <p className="text-xs text-placeholder">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
              {/*  */}
              {/* Location */}
              <div className="flex flex-col lg:px-0 gap-1 lg:items-start">
                <p className="font-semibold text-xs">Location</p>
                <p className="text-xs text-placeholder">Based in Japan.</p>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
