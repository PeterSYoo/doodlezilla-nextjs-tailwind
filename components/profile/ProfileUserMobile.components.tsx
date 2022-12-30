import Image from 'next/image';

type Session = {
  email: string;
  _id: string;
  name: string;
  image: string;
  biography: string;
  location: string;
};

type Doodle = {
  _id: string;
  user: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

type DoodleObject = {
  doodle: Doodle;
  likesNum: any[];
  comments: any[];
};

type ProfileUserMobileProps = {
  userData: Session;
  userDoodlesWithAllCommentsAndLikesNumData: DoodleObject[];
  setIsModal: (arg0: boolean) => void;
  isUsernamePage?: boolean;
};

export const ProfileUserMobile = ({
  userData,
  userDoodlesWithAllCommentsAndLikesNumData,
  setIsModal,
  isUsernamePage,
}: ProfileUserMobileProps) => {
  console.log(userDoodlesWithAllCommentsAndLikesNumData);
  return (
    <>
      <div className="grid w-[375px] grid-cols-12 gap-8 md:hidden">
        {/* Column 1 */}
        <div className="col-span-5 col-start-1 flex flex-col items-center gap-4 rounded-2xl border border-grayBorder py-4 px-2 dark:border-shadeMedium">
          <div className="flex flex-col items-center gap-1">
            <Image
              src={
                userData.image
                  ? userData.image
                  : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
              }
              width={75}
              height={75}
              alt="profile avatar mobile"
              className="aspect-square rounded-full"
            />
            <h1 className="break-all text-center font-bold dark:text-egg">
              {userData.name}
            </h1>
            <p className="text-xs font-semibold dark:text-egg">
              {userDoodlesWithAllCommentsAndLikesNumData.length}&nbsp;
              <span className="font-normal text-placeholder dark:text-shadeText">
                DOODLES
              </span>
            </p>
          </div>
          <p className="text-xs font-semibold text-placeholder dark:text-egg">
            {userData.location ? userData.location : null}
          </p>
          {isUsernamePage ? null : (
            <button
              onClick={() => setIsModal(true)}
              className="w-10/12 rounded-lg border border-placeholder bg-gradient-to-tr py-1 text-xs font-semibold transition duration-100 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeText dark:text-egg dark:hover:border-transparent"
            >
              Edit
            </button>
          )}
        </div>
        {/*  */}
        {/* Column 2 */}
        <div className="col-span-7 col-start-6 mt-4 flex flex-col gap-3">
          <p className="text-xs dark:text-egg">
            {userData.biography ? (
              userData.biography
            ) : (
              <>Please edit your profile to write your biography.</>
            )}
          </p>
        </div>
        {/*  */}
      </div>
    </>
  );
};
