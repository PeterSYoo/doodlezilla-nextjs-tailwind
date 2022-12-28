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
      <div className="md:hidden grid grid-cols-12 w-[375px] gap-8">
        {/* Column 1 */}
        <div className="col-start-1 col-span-5 flex flex-col items-center gap-4 border border-grayBorder dark:border-shadeMedium rounded-2xl py-4 px-2">
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
              className="rounded-full aspect-square"
            />
            <h1 className="font-bold break-all text-center dark:text-egg">
              {userData.name}
            </h1>
            <p className="font-semibold text-xs dark:text-egg">
              {userDoodlesWithAllCommentsAndLikesNumData.length}&nbsp;
              <span className="font-normal text-placeholder dark:text-shadeText">
                DOODLES
              </span>
            </p>
          </div>
          <p className="font-semibold text-xs text-placeholder dark:text-egg">
            {userData.location ? userData.location : null}
          </p>
          {isUsernamePage ? null : (
            <button
              onClick={() => setIsModal(true)}
              className="border py-1 w-10/12 text-xs rounded-lg border-placeholder dark:border-shadeText transition duration-100 ease-in-out hover:animate-button hover:bg-[length:400%_400%] bg-gradient-to-tr hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:border-white hover:text-white font-semibold dark:text-egg dark:hover:border-transparent"
            >
              Edit
            </button>
          )}
        </div>
        {/*  */}
        {/* Column 2 */}
        <div className="col-start-6 col-span-7 mt-4 flex flex-col gap-3">
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
