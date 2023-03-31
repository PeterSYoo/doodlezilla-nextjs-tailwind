import Image from 'next/image';

export const FeedSponsoredCard = () => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="flex w-full max-w-[375px] flex-col items-center justify-center rounded-[50px] border border-grayBorder bg-white pt-5 pb-8 md:hidden">
        {/* Post Header */}
        <div className="flex w-10/12 items-center justify-between pb-3">
          <span className="font-semibold">Sponsored</span>
        </div>
        {/*  */}
        {/* Post Image */}
        <div className="flex w-11/12 items-center justify-center rounded-[50px] border border-grayBorder bg-zinc-50 py-2">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670960473/nudoodle/assets/image_9_2_fu6tec.png"
            width={292}
            height={400}
            alt="tree"
            className="mix-blend-multiply"
          />
        </div>
        {/*  */}
        {/* Likes and Comments */}
        <div className="mt-4 flex w-10/12 flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <span className="font-semibold text-cobalt">Drawing Tablet</span>
            <span className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </span>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};
