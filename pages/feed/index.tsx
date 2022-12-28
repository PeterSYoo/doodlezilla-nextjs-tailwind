import { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';
import useCreateNewLikesDocument from '../../hooks/useCreateNewLikesDocument';
import useFetchAllDoodlesWithCommentsAndLikesNum from '../../hooks/useFetchAllDoodlesWithCommentsAndLikesNum';
import useFetchUser from '../../hooks/useFetchUser';
import useInfiniteQueriesAllDoodles from '../../hooks/useInfiniteQueriesAllDoodles';
import useFetchDoodleWithCommentsAndLikes from '../../hooks/useFetchDoodleWithCommentsAndLikes';
import {
  getDayDifference,
  getHourDifference,
  getMinuteDifference,
  getSecondsDifference,
} from '../../utils/findTimeDifference';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { LoaderSpinnerInline } from '../../components/LoaderSpinnerInline.components';
import { ProfileDoodleCardModal } from '../../components/profile/doodle/ProfileDoodleCardModal';
import { FeedCommentedUser } from '../../components/feed/FeedCommentedUser.components';
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

type FeedPageProps = {
  session: Session;
};

type Page = {
  combinedData: Array<{
    doodle: {
      _id: string;
      image: string;
      created_at: string;
      user: {
        name: string;
        image: string;
      };
    };
    user: {
      name: string;
      image: string;
    };
    likesNum: Array<any>;
    comments: Array<any>;
  }>;
};

type Doodle = {
  doodle: any;
  likesNum: Array<any>;
  comments: Array<any>;
  user: any;
};

const FeedPage = ({ session }: FeedPageProps) => {
  const [isDoodleModal, setIsDoodleModal] = useState<boolean>(false);
  const [tempDoodleId, setTempDoodleId] = useState<string>('');
  const [tempUserId, setTempUserId] = useState<string>('');
  const [isHandleClick, setIsHandleClick] = useState<boolean>(false);
  const [tempUserFeed, setTempUserFeed] = useState<string>('');

  const { ref, inView } = useInView();
  const router = useRouter();

  const isFeedPage = router.asPath === '/feed';

  const {
    dataDoodleWithCommentsAndLikes: dataEditorsPick1,
    isLoadingDoodleWithCommentsAndLikes: isLoadingEditorsPick1,
    isErrorDoodleWithCommentsAndLikes: isErrorEditorsPick1,
    refetchDoodleWithCommentsAndLikes: refetchEditorsPick1,
  } = useFetchDoodleWithCommentsAndLikes('63aa808d80e21b4f1c0ef5ac');

  const {
    dataDoodleWithCommentsAndLikes: dataEditorsPick2,
    isLoadingDoodleWithCommentsAndLikes: isLoadingEditorsPick2,
    isErrorDoodleWithCommentsAndLikes: isErrorEditorsPick2,
    refetchDoodleWithCommentsAndLikes: refetchEditorsPick2,
  } = useFetchDoodleWithCommentsAndLikes('63aa83f1f31ee8adac1b2cd3');

  const {
    dataDoodleWithCommentsAndLikes: dataEditorsPick3,
    isLoadingDoodleWithCommentsAndLikes: isLoadingEditorsPick3,
    isErrorDoodleWithCommentsAndLikes: isErrorEditorsPick3,
    refetchDoodleWithCommentsAndLikes: refetchEditorsPick3,
  } = useFetchDoodleWithCommentsAndLikes('63aa7dd5fe6ec5fa955bfbf5');

  const {
    dataAllDoodlesWithCommentsAndLikesNum,
    isLoadingAllDoodlesWithCommentsAndLikesNum,
    isErrorAllDoodlesWithCommentsAndLikesNum,
    refetchAllDoodlesWithCommentsAndLikesNum,
  } = useFetchAllDoodlesWithCommentsAndLikesNum();

  const {
    dataInfiniteQueriesAllDoodles,
    isLoadingInfiniteQueriesAllDoodles,
    isErrorInfiniteQueriesAllDoodles,
    errorInfiniteQueriesAllDoodles,
    hasNextPageInfiniteQueriesAllDoodles,
    isFetchingInfiniteQueriesAllDoodles,
    isFetchingNextPageInfiniteQueriesAllDoodles,
    fetchNextPageInfiniteQueriesAllDoodles,
    refetchInfiniteQueriesAllDoodles,
  } = useInfiniteQueriesAllDoodles();

  const { mutateCreateNewLikesDocument, isLoadingCreateNewLikesDocument } =
    useCreateNewLikesDocument(tempDoodleId, session?.user?.id);

  const { userData, userIsLoading, userIsError, userRefetch } =
    useFetchUser(tempUserFeed);

  const handleModalClickUser = (userId: string) => {
    setTempUserFeed(userId);
  };

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
    setTempUserId(session?.user?.id);
  }, []);

  useEffect(() => {
    if (tempDoodleId && tempUserId) {
      setIsDoodleModal(true);
    }
  }, [tempDoodleId, tempUserId, isHandleClick]);

  useEffect(() => {
    if (inView && hasNextPageInfiniteQueriesAllDoodles) {
      fetchNextPageInfiniteQueriesAllDoodles();
    }
  }, [inView]);

  if (
    isLoadingAllDoodlesWithCommentsAndLikesNum ||
    isLoadingEditorsPick1 ||
    isLoadingEditorsPick2 ||
    isLoadingEditorsPick3 ||
    userIsLoading
  )
    return <LoaderSpinner />;
  if (
    isErrorAllDoodlesWithCommentsAndLikesNum ||
    isErrorEditorsPick1 ||
    isErrorEditorsPick2 ||
    isErrorEditorsPick3 ||
    userIsError
  )
    return <>Error</>;

  return (
    <>
      {isDoodleModal ? (
        <ProfileDoodleCardModal
          setIsDoodleModal={setIsDoodleModal}
          userData={userData}
          doodleId={tempDoodleId}
          userDoodlesWithAllCommentsRefetch={
            refetchAllDoodlesWithCommentsAndLikesNum
          }
          mutateCreateNewLikesDocument={mutateCreateNewLikesDocument}
          userId={tempUserId}
          refetchInfiniteQueriesAllDoodles={refetchInfiniteQueriesAllDoodles}
          isFeedPage={isFeedPage}
        />
      ) : null}
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col justify-center items-center gap-2 md:gap-2 mt-24 mb-32 md:justify-start dark:bg-shadeDark">
        {/* Editor's Picks */}
        <h1 className="font-bold md:text-2xl md:flex justify-start dark:text-egg w-5/6 text-xl">
          Editor&apos;s Picks
        </h1>
        <div className="columns-3 w-5/6 mb-3">
          {/* Pick 1 */}
          <div
            onClick={() => {
              handleModalClickUser(dataEditorsPick1[0].doodle.user);
              handleModalClick(dataEditorsPick1[0].doodle._id);
            }}
            className="overlay-container rounded-3xl overflow-hidden relative group"
          >
            <Image
              src={dataEditorsPick1[0].doodle.image}
              alt="doodle card"
              width="0"
              height="0"
              sizes="100vw"
              className="rounded-3xl border border-grayBorder dark:border-transparent object-cover h-full w-full cursor-pointer"
            />
            <div className="overlay group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm absolute top-0 cursor-pointer text-white w-full h-full rounded-3xl">
              <div className="overlay-text p-4 flex justify-center gap-5 items-center h-full w-full invisible group-hover:visible flex-col">
                <div className="flex items-center gap-5 md:gap-6 lg:gap-8 dark:text-midnight">
                  <div className="flex items-center gap-2">
                    <AiFillHeart />
                    {dataEditorsPick1[0].likesNum.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment className="transform -scale-x-100" />
                    {dataEditorsPick1[0].comments.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          {/* Pick 2 */}
          <div
            onClick={() => {
              handleModalClickUser(dataEditorsPick2[0].doodle.user);
              handleModalClick(dataEditorsPick2[0].doodle._id);
            }}
            className="overlay-container rounded-3xl overflow-hidden relative group"
          >
            <Image
              src={dataEditorsPick2[0].doodle.image}
              alt="doodle card"
              width="0"
              height="0"
              sizes="100vw"
              className="rounded-3xl border border-grayBorder dark:border-transparent object-cover h-full w-full cursor-pointer"
            />
            <div className="overlay group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm absolute top-0 cursor-pointer text-white w-full h-full rounded-3xl">
              <div className="overlay-text p-4 flex justify-center gap-5 items-center h-full w-full invisible group-hover:visible flex-col">
                <div className="flex items-center gap-5 md:gap-6 lg:gap-8 dark:text-midnight">
                  <div className="flex items-center gap-2">
                    <AiFillHeart />
                    {dataEditorsPick2[0].likesNum.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment className="transform -scale-x-100" />
                    {dataEditorsPick2[0].comments.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          {/* Pick 3 */}
          <div
            onClick={() => {
              handleModalClickUser(dataEditorsPick3[0].doodle.user);
              handleModalClick(dataEditorsPick3[0].doodle._id);
            }}
            className="overlay-container rounded-3xl overflow-hidden relative group"
          >
            <Image
              src={dataEditorsPick3[0].doodle.image}
              alt="doodle card"
              width="0"
              height="0"
              sizes="100vw"
              className="rounded-3xl border border-grayBorder dark:border-transparent object-cover h-full w-full cursor-pointer"
            />
            <div className="overlay group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm absolute top-0 cursor-pointer text-white w-full h-full rounded-3xl">
              <div className="overlay-text p-4 flex justify-center gap-5 items-center h-full w-full invisible group-hover:visible flex-col">
                <div className="flex items-center gap-5 md:gap-6 lg:gap-8 dark:text-midnight">
                  <div className="flex items-center gap-2">
                    <AiFillHeart />
                    {dataEditorsPick3[0].likesNum.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment className="transform -scale-x-100" />
                    {dataEditorsPick3[0].comments.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className="border-b border-grayBorder dark:border-shadeMedium w-5/6"></div>
        <h1 className="font-bold md:text-2xl md:flex justify-start dark:text-egg px-10 w-full md:w-5/6 lg:w-2/3 text-xl mt-5">
          Feed
        </h1>
        <div className="columns-1 px-10 md:w-5/6 lg:w-2/3">
          {dataInfiniteQueriesAllDoodles?.pages.map((page: Page, i: number) => (
            <Fragment key={i}>
              {page.combinedData?.map((doodle: Doodle) => (
                <Fragment key={doodle.doodle._id}>
                  <div className="mb-20">
                    <div
                      onClick={() => {
                        handleModalClickUser(doodle.doodle.user);
                        handleModalClick(doodle.doodle._id);
                      }}
                      className="overlay-container rounded-3xl overflow-hidden relative group"
                    >
                      <Image
                        src={doodle.doodle.image}
                        alt="doodle card"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="rounded-3xl border border-grayBorder dark:border-transparent object-cover h-full w-full cursor-pointer"
                      />
                    </div>
                    {/* Most Recent Comment */}
                    <div className="flex flex-col w-full">
                      {doodle.comments[0] ? (
                        <FeedCommentedUser doodle={doodle} />
                      ) : null}
                    </div>
                    {/*  */}
                    <div className="flex justify-between items-center px-1 mt-2">
                      {/* Likes and Comments */}
                      <div className="flex items-center gap-2 dark:text-shadeText text-xs">
                        <div className="flex items-center gap-2">
                          {doodle.likesNum.length} likes
                        </div>
                        <div className="flex items-center gap-2">
                          {doodle.comments.length} comments
                        </div>
                      </div>
                      {/*  */}
                      {/* User and Created time ago */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/profile/${doodle.user.name}`}
                          className="group"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                doodle.user.image
                                  ? doodle.user.image
                                  : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                              }
                              width={33}
                              height={33}
                              alt="avatar feed"
                              className="rounded-full"
                            />
                            <span className="font-semibold break-all w-7/8 text-center text-xs dark:text-egg dark:group-hover:text-sunset group-hover:text-sunset cursor-pointer">
                              {doodle.user.name}
                            </span>
                          </div>
                        </Link>
                        <p className="text-xs dark:text-shadeText">
                          {getDayDifference(doodle.doodle.created_at) > 0 ? (
                            <>
                              {getDayDifference(doodle.doodle.created_at)}d ago
                            </>
                          ) : (
                            <>
                              {getHourDifference(doodle.doodle.created_at) >
                              0 ? (
                                <>
                                  {getHourDifference(doodle.doodle.created_at)}h
                                  ago
                                </>
                              ) : (
                                <>
                                  {getMinuteDifference(
                                    doodle.doodle.created_at
                                  ) > 0 ? (
                                    <>
                                      {getMinuteDifference(
                                        doodle.doodle.created_at
                                      )}
                                      m ago
                                    </>
                                  ) : (
                                    <>
                                      {getSecondsDifference(
                                        doodle.doodle.created_at
                                      )}
                                      s ago
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center mb-48 md:-ml-10 md:mb-20">
        <button
          ref={ref}
          onClick={() => fetchNextPageInfiniteQueriesAllDoodles()}
          disabled={
            !hasNextPageInfiniteQueriesAllDoodles ||
            isFetchingNextPageInfiniteQueriesAllDoodles
          }
          className="text-placeholder text-xs mb-5"
        >
          {isFetchingNextPageInfiniteQueriesAllDoodles ? (
            <LoaderSpinnerInline />
          ) : hasNextPageInfiniteQueriesAllDoodles ? (
            'Load Newer'
          ) : (
            'Nothing more to load'
          )}
        </button>
        {isFetchingInfiniteQueriesAllDoodles &&
        !isFetchingNextPageInfiniteQueriesAllDoodles ? (
          <LoaderSpinnerInline />
        ) : null}
      </div>
    </>
  );
};

export default FeedPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
