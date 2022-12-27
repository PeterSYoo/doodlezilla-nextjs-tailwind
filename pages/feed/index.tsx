import { Fragment, useEffect, useRef, useState } from 'react';
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
import {
  getDayDifference,
  getHourDifference,
  getMinuteDifference,
  getSecondsDifference,
} from '../../utils/findTimeDifference';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

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
  const [pinSize, setPinSize] = useState<string>('');
  const imgRef = useRef<any>(null);

  const { ref, inView } = useInView();
  const router = useRouter();

  const isFeedPage = router.asPath === '/feed';

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
          isFeedPage={isFeedPage}
        />
      ) : null}
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col justify-center items-center gap-5 mt-24 mb-32 md:justify-start dark:bg-shadeDark">
        <h1 className="hidden font-bold text-2xl md:flex justify-start dark:text-egg px-24 w-full">
          Feed
        </h1>
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 px-5 md:px-20 lg:px-20">
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
                      <div className="overlay group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm absolute top-0 cursor-pointer text-white w-full h-full rounded-3xl">
                        <div className="overlay-text p-4 flex justify-center gap-5 items-center h-full w-full invisible group-hover:visible flex-col">
                          <div className="flex items-center gap-10 dark:text-midnight">
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
                    <div className="flex items-center absolute px-2 mt-2 justify-between gap-1">
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
                      <p className="text-xs mt-0.5 dark:text-shadeText">
                        -&nbsp;
                        {getDayDifference(doodle.doodle.created_at) > 0 ? (
                          <>{getDayDifference(doodle.doodle.created_at)}d ago</>
                        ) : (
                          <>
                            {getHourDifference(doodle.doodle.created_at) > 0 ? (
                              <>
                                {getHourDifference(doodle.doodle.created_at)}h
                                ago
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
