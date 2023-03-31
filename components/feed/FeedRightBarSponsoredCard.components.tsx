import Image from 'next/image';

export const FeedRightBarSponsoredCard = () => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="flex flex-col gap-2 lg:w-[187px]">
        <div className="flex justify-center rounded-3xl border border-grayBorder dark:border-shadeDark">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670960473/nudoodle/assets/image_9_2_fu6tec.png"
            width={187}
            height={102}
            alt="sponsored small"
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col gap-1 px-1">
          <p className="text-[9px] font-semibold text-cobalt">Drawing Tablet</p>
          <p className="text-[9px] dark:text-shadeText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </>
  );
};
