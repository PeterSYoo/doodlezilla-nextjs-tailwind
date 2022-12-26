import { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { authOptions } from '../api/auth/[...nextauth]';
import useCreateNewLikesDocument from '../../hooks/useCreateNewLikesDocument';
import useFetchAllDoodlesWithCommentsAndLikesNum from '../../hooks/useFetchAllDoodlesWithCommentsAndLikesNum';
import useFetchUser from '../../hooks/useFetchUser';
import useInfiniteQueriesAllDoodles from '../../hooks/useInfiniteQueriesAllDoodles';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { LoaderSpinnerInline } from '../../components/LoaderSpinnerInline.components';
import { ProfileDoodleCardModal } from '../../components/profile/doodle/ProfileDoodleCardModal';
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

  const getDayDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const dayDifference = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    return dayDifference;
  };

  const getHourDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInHours = Math.floor(timeDifference / 1000 / 60 / 60);

    return timeDifferenceInHours;
  };

  const getMinuteDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60);

    return timeDifferenceInMinutes;
  };

  const getSecondsDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

    return timeDifferenceInSeconds;
  };

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

  if (isLoadingAllDoodlesWithCommentsAndLikesNum) return <LoaderSpinner />;
  if (isErrorAllDoodlesWithCommentsAndLikesNum) return <>Error</>;

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
        />
      ) : null}
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col justify-center items-center gap-5 mt-24 mb-32 md:justify-start">
        <h1 className="hidden font-bold text-2xl md:flex justify-start md:w-[440px] md:mt-5">
          Feed
        </h1>
        {dataInfiniteQueriesAllDoodles?.pages.map((page: Page, i: number) => (
          <Fragment key={i}>
            {page.combinedData?.map((doodle: Doodle) => (
              <Fragment key={doodle.doodle._id}>
                <div
                  onClick={() => {
                    handleModalClickUser(doodle.doodle.user);
                    handleModalClick(doodle.doodle._id);
                  }}
                  className="w-[375px] h-[397px] md:w-[472px] md:h-[500px] flex justify-center items-center py-2 group flex-col mb-5"
                >
                  <Image
                    src={doodle.doodle.image}
                    width={472}
                    height={600}
                    alt="tree"
                    className="rounded-[50px] group border border-grayBorder md:w-[472px] md:h-[500px] w-[375px] h-[397px] object-contain"
                  />
                  <div className="flex flex-col gap-0.5 items-center absolute mb-[240px] ml-[220px] md:mb-[340px] md:ml-[320px] bg-opacity-50 backdrop-blur-sm bg-white rounded-3xl px-2 py-3">
                    <Image
                      src={
                        doodle.user.image
                          ? doodle.user.image
                          : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                      }
                      width={43}
                      height={43}
                      alt="avatar feed"
                      className="rounded-full"
                    />
                    <span className="font-semibold break-all w-7/8 text-center text-xs">
                      {doodle.user.name}
                    </span>
                    <p className="text-xs mt-0.5">
                      {getDayDifference(doodle.doodle.created_at) > 0 ? (
                        <>{getDayDifference(doodle.doodle.created_at)}d ago</>
                      ) : (
                        <>
                          {getHourDifference(doodle.doodle.created_at) > 0 ? (
                            <>
                              {getHourDifference(doodle.doodle.created_at)}h ago
                            </>
                          ) : (
                            <>
                              {getMinuteDifference(doodle.doodle.created_at) >
                              0 ? (
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
                  <div className="overlay group-hover:bg-black group-hover:bg-opacity-5 absolute cursor-pointer text-white w-[375px] h-[397px] md:h-[500px] md:w-[472px] rounded-[50px] group-hover:backdrop-blur-sm">
                    <div className="overlay-text p-4 flex justify-center gap-5 items-center h-full w-full invisible group-hover:visible flex-col">
                      <div className="flex items-center gap-10">
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
                {/*  */}
              </Fragment>
            ))}
          </Fragment>
        ))}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPageInfiniteQueriesAllDoodles()}
            disabled={
              !hasNextPageInfiniteQueriesAllDoodles ||
              isFetchingNextPageInfiniteQueriesAllDoodles
            }
            className="text-placeholder text-xs"
          >
            {isFetchingNextPageInfiniteQueriesAllDoodles ? (
              <LoaderSpinnerInline />
            ) : hasNextPageInfiniteQueriesAllDoodles ? (
              'Load Newer'
            ) : (
              'Nothing more to load'
            )}
          </button>
        </div>
        <div>
          {isFetchingInfiniteQueriesAllDoodles &&
          !isFetchingNextPageInfiniteQueriesAllDoodles ? (
            <LoaderSpinnerInline />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FeedPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
