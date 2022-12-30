import { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import useFetchUserByUsername from '../../hooks/useFetchUserByUsername';
import useCreateNewLikesDocument from '../../hooks/useCreateNewLikesDocument';
import useFetchUserDoodlesWithAllCommentsAndLikesNum from '../../hooks/useFetchUserDoodlesWithAllCommentsAndLikesNum';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { ProfileSlugUsersRightBar } from '../../components/profile/slug/ProfileSlugUsersRightBar.components';
import { ProfileDoodleCardModal } from '../../components/profile/doodle/ProfileDoodleCardModal';
import { ProfileEditModal } from '../../components/profile/ProfileEditModal.components';
import { ProfileUserMobile } from '../../components/profile/ProfileUserMobile.components';
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
        <div className="mt-24 mb-32 flex flex-grow flex-col items-center justify-start gap-5 dark:bg-shadeDark md:ml-[94px] md:mr-[159px] md:justify-start lg:ml-[213px] lg:mr-[258px]">
          {/* Mobile Profile Avatar & bio */}
          <ProfileUserMobile
            userData={userData}
            userDoodlesWithAllCommentsAndLikesNumData={
              userDoodlesWithAllCommentsAndLikesNumData
            }
            setIsModal={setIsModal}
            isUsernamePage={isUsernamePage}
          />
          {/*  */}
          <div className="w-[375px] border-b border-grayBorder dark:border-shadeMedium md:hidden"></div>
          {/*  */}
          {/* If no Doodles Exist */}
          {userDoodlesWithAllCommentsAndLikesNumData.length === 0 ? (
            <>
              {' '}
              <h1 className="mt-20 flex justify-center text-2xl text-placeholder dark:text-shadeText">
                No Doodles
              </h1>
            </>
          ) : (
            <>
              {' '}
              {/* Header Text */}
              <h1 className="hidden w-full justify-start px-24 text-2xl font-bold dark:text-egg md:flex">
                Doodles
              </h1>
              {/* Doodles List */}
              <div className="columns-1 px-5 md:columns-2 md:px-20 lg:columns-3 lg:px-20 xl:columns-4 2xl:columns-5 3xl:columns-6">
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
                        {/* Doodle Card */}
                        <div className="mb-5">
                          <div
                            onClick={() => {
                              handleModalClick(doodle.doodle._id);
                            }}
                            className="overlay-container group relative h-full w-full overflow-hidden rounded-3xl"
                          >
                            <Image
                              src={doodle.doodle.image}
                              alt="doodle card"
                              width="0"
                              height="0"
                              sizes="100vw"
                              className="h-full w-full cursor-pointer rounded-3xl border border-grayBorder object-cover dark:border-transparent"
                            />
                            <div className="overlay absolute top-0 h-full w-full cursor-pointer text-white group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:text-black dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm">
                              <div className="overlay-text invisible flex h-full w-full items-center justify-center gap-8 p-4 group-hover:visible">
                                <div className="flex items-center gap-2">
                                  <AiFillHeart />
                                  {doodle.likesNum.length}
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaComment className="-scale-x-100 transform" />
                                  {doodle.comments.length}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*  */}
                      </Fragment>
                    ))}
                </div>
              </div>
              {/*  */}
            </>
          )}
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
