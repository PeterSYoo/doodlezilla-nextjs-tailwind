import Image from 'next/image';
import { RightBarSponsoredCard } from '../rightbar/RightBarSponsoredCard.components';

export const FeedRightBar = () => {
  return (
    <>
      <div className="z-50 fixed bg-white right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder md:flex-col px-1">
        <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
          <h1 className="font-semibold ml-4 mt-[18px] lg:ml-0">Sponsored</h1>
          {/* Sponsored Card */}
          <RightBarSponsoredCard />
          {/*  */}
          <h1 className="font-semibold mt-[18px] text-[15px] text-center lg:flex">
            Suggestions for you
          </h1>
          <div className="flex flex-col px-2 gap-4">
            {/* Suggestions User */}
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                width={43}
                height={43}
                alt="suggestions avatar"
              />
              <p className="font-semibold text-sm">Apple</p>
            </div>
            {/*  */}
            {/* Suggestions User */}
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                width={43}
                height={43}
                alt="suggestions avatar"
              />
              <p className="font-semibold text-sm">Apple</p>
            </div>
            {/*  */}
            {/* Suggestions User */}
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                width={43}
                height={43}
                alt="suggestions avatar"
              />
              <p className="font-semibold text-sm">Apple</p>
            </div>
            {/*  */}
            {/* Suggestions User */}
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                width={43}
                height={43}
                alt="suggestions avatar"
              />
              <p className="font-semibold text-sm">Apple</p>
            </div>
            {/*  */}
            {/* Suggestions User */}
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670910840/nudoodle/assets/cat_avatar_cmp6xf.png"
                width={43}
                height={43}
                alt="suggestions avatar"
              />
              <p className="font-semibold text-sm">Apple</p>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
