import Image from 'next/image';

export const FeedSponsoredCard = () => {
  return (
    <>
      <div className="bg-white border border-grayBorder w-full max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:hidden">
        {/* Post Header */}
        <div className="flex justify-between items-center w-10/12 pb-3">
          <span className="font-semibold">Sponsored</span>
        </div>
        {/*  */}
        {/* Post Image */}
        <div className="bg-zinc-50 border border-grayBorder rounded-[50px] w-11/12 flex justify-center items-center py-2">
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
        <div className="flex flex-col w-10/12 gap-4 mt-4">
          <div className="flex flex-col w-full gap-2">
            <span className="text-cobalt font-semibold">Drawing Tablet</span>
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
