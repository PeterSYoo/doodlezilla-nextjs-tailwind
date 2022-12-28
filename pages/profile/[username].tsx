import { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { authOptions } from '../api/auth/[...nextauth]';
import useFetchUserByUsername from '../../hooks/useFetchUserByUsername';
import useCreateNewLikesDocument from '../../hooks/useCreateNewLikesDocument';
import useFetchUserDoodlesWithAllCommentsAndLikesNum from '../../hooks/useFetchUserDoodlesWithAllCommentsAndLikesNum';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { ProfileSlugUsersRightBar } from '../../components/profile/slug/ProfileSlugUsersRightBar.components';
import { ProfileDoodleCardModal } from '../../components/profile/doodle/ProfileDoodleCardModal';
import { ProfileEditModal } from '../../components/profile/ProfileEditModal.components';
import { useRouter } from 'next/router';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

type Session = {
  expires: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

type ProfileUserIdPageProps = {
  session: Session;
  username: string;
};

type Doodle = {
  doodle: any;
  likesNum: Array<any>;
  comments: Array<any>;
  user: any;
};

type User = {
  name: string;
  email: string;
  id: string;
};

type SessionSSR = {
  user: User;
  expires: string;
} | null;

type DoodleSort = {
  _id: string;
  user: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

type DoodleData = {
  doodle: DoodleSort;
  likesNum: number[];
  comments: Comment[];
};

const UserIdPage = ({ session, username }: ProfileUserIdPageProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDoodleModal, setIsDoodleModal] = useState<boolean>(false);
  const [tempDoodleId, setTempDoodleId] = useState<string>('');
  const [tempUserId, setTempUserId] = useState<string>('');
  const [isHandleClick, setIsHandleClick] = useState<boolean>(false);

  const { data: loggedInSession }: any = useSession();
  const router = useRouter();
  const isUsernamePage = router.pathname === '/profile/[username]';

  const { userData, userIsLoading, userIsError } =
    useFetchUserByUsername(username);

  const { mutateCreateNewLikesDocument, isLoadingCreateNewLikesDocument } =
    useCreateNewLikesDocument(tempDoodleId, loggedInSession.user.id);

  const {
    userDoodlesWithAllCommentsAndLikesNumData,
    userDoodlesWithAllCommentsAndLikesNumIsLoading,
    userDoodlesWithAllCommentsAndLikesNumIsError,
    userDoodlesWithAllCommentsAndLikesNumRefetch,
    userDoodlesWithAllCommentsAndLikesNumIsFetching,
  } = useFetchUserDoodlesWithAllCommentsAndLikesNum(userData?._id);

  const handleModalClick = (doodleId: string) => {
    setIsHandleClick(!isHandleClick);
    setTempDoodleId(doodleId);

    if (tempDoodleId && tempUserId) {
      mutateCreateNewLikesDocument({
        doodle: tempDoodleId,
        user: tempUserId,
      });
    }
  };

  useEffect(() => {
    setTempUserId(loggedInSession?.user?.id);
  }, []);

  useEffect(() => {
    if (tempDoodleId && tempUserId) {
      setIsDoodleModal(true);
    }
  }, [tempDoodleId, tempUserId, isHandleClick]);

  if (userIsLoading || userDoodlesWithAllCommentsAndLikesNumIsLoading) {
    return <LoaderSpinner />;
  }
  if (userIsError || userDoodlesWithAllCommentsAndLikesNumIsError)
    return <>Error</>;

  return (
    <>
      <ProfileSlugUsersRightBar username={username} session={session} />
      <>
        {isModal ? <ProfileEditModal setIsModal={setIsModal} /> : null}
        {isDoodleModal ? (
          <ProfileDoodleCardModal
            setIsDoodleModal={setIsDoodleModal}
            userData={userData}
            doodleId={tempDoodleId}
            userDoodlesWithAllCommentsRefetch={
              userDoodlesWithAllCommentsAndLikesNumRefetch
            }
            mutateCreateNewLikesDocument={mutateCreateNewLikesDocument}
            userId={tempUserId}
          />
        ) : null}
        <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col justify-start items-center gap-5 mt-24 mb-32 md:justify-start dark:bg-shadeDark">
          {/* Mobile Profile Avatar & bio */}
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
          <div className="border-b border-grayBorder dark:border-shadeMedium w-[375px] md:hidden"></div>
          {/*  */}
          {/* Header Text */}
          <h1 className="hidden font-bold text-2xl md:flex justify-start dark:text-egg px-24 w-full">
            Doodles
          </h1>
          {/* Doodles List */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 px-5 md:px-20 lg:px-20">
            <div>
              {userDoodlesWithAllCommentsAndLikesNumData
                .sort((a: DoodleData, b: DoodleData) => {
                  // Get the doodle objects from the doodle data objects
                  const doodleA = a.doodle;
                  const doodleB = b.doodle;

                  // Compare the created_at properties of the doodle objects
                  if (doodleA.created_at < doodleB.created_at) {
                    return 1;
                  } else if (doodleA.created_at > doodleB.created_at) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .map((doodle: Doodle) => (
                  <Fragment key={doodle.doodle._id}>
                    <div className="mb-5">
                      <div
                        onClick={() => {
                          handleModalClick(doodle.doodle._id);
                        }}
                        className="overlay-container rounded-3xl overflow-hidden relative group h-full w-full"
                      >
                        <Image
                          src={doodle.doodle.image}
                          alt="doodle card"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="rounded-3xl border border-grayBorder dark:border-transparent object-cover h-full w-full cursor-pointer"
                        />
                        <div className="overlay group-hover:bg-black dark:group-hover:bg-white dark:group-hover:bg-opacity-30 group-hover:bg-opacity-30 absolute top-0 w-full h-full cursor-pointer text-white dark:text-black group-hover:backdrop-blur-sm dark:group-hover:backdrop-blur-sm">
                          <div className="overlay-text p-4 flex justify-center gap-8 items-center h-full w-full invisible group-hover:visible">
                            <div className="flex items-center gap-2">
                              <AiFillHeart />
                              {doodle.likesNum.length}
                            </div>
                            <div className="flex items-center gap-2">
                              <FaComment className="transform -scale-x-100" />
                              {doodle.comments.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
          {/*  */}
        </div>
      </>
    </>
  );
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;

  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } else if (session.user.name === username) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    };
  }

  return {
    props: {
      session: session,
      username,
    },
  };
};
