import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';
import useCreateNewLikesDocument from '../../hooks/useCreateNewLikesDocument';
import useFetchAllDoodlesWithCommentsAndLikesNum from '../../hooks/useFetchAllDoodlesWithCommentsAndLikesNum';
import useFetchUser from '../../hooks/useFetchUser';
import useInfiniteQueriesAllDoodles from '../../hooks/useInfiniteQueriesAllDoodles';
import useFetchDoodleWithCommentsAndLikes from '../../hooks/useFetchDoodleWithCommentsAndLikes';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { LoaderSpinnerInline } from '../../components/LoaderSpinnerInline.components';
import { ProfileDoodleCardModal } from '../../components/profile/doodle/ProfileDoodleCardModal';
import { FeedDoodleCard } from '../../components/feed/FeedDoodleCard.components';
import { FeedEditorsPickCard } from '../../components/feed/FeedEditorsPickCard.components';

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

const FeedPage = ({ session }: FeedPageProps) => {
  // States ------------------------------------------------------------- ***
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
  } = useFetchDoodleWithCommentsAndLikes('63b90af9922153029e9feb6f');

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

  // Custom Functions ---------------------------------------------------- ***
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

  // Effects ------------------------------------------------------------- ***
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
    isLoadingEditorsPick1 ||
    isLoadingEditorsPick2 ||
    isLoadingEditorsPick3 ||
    isLoadingAllDoodlesWithCommentsAndLikesNum ||
    userIsLoading ||
    isLoadingInfiniteQueriesAllDoodles
  )
    return <LoaderSpinner />;
  if (
    isErrorAllDoodlesWithCommentsAndLikesNum ||
    isErrorEditorsPick1 ||
    isErrorEditorsPick2 ||
    isErrorEditorsPick3 ||
    userIsError ||
    isErrorInfiniteQueriesAllDoodles
  )
    return <>Error</>;

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      {/* Open Doodle Modal */}
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
          refetchEditorsPick1={refetchEditorsPick1}
          refetchEditorsPick2={refetchEditorsPick2}
          refetchEditorsPick3={refetchEditorsPick3}
        />
      ) : null}
      {/*  */}
      <div className="mt-24 mb-32 flex flex-grow flex-col items-center justify-center gap-2 dark:bg-shadeDark md:ml-[94px] md:mr-[159px] md:justify-start md:gap-2 lg:ml-[213px] lg:mr-[258px]">
        {/* Editor's Picks */}
        <h1 className="w-5/6 justify-start text-xl font-bold dark:text-egg md:flex md:text-2xl">
          Editor&apos;s Picks
        </h1>
        <div className="mb-3 grid w-5/6 grid-cols-3 gap-3">
          {/* Pick 1 */}
          <FeedEditorsPickCard
            handleModalClickUser={handleModalClickUser}
            handleModalClick={handleModalClick}
            data={dataEditorsPick1[0]}
          />
          {/*  */}
          {/* Pick 2 */}
          <FeedEditorsPickCard
            handleModalClickUser={handleModalClickUser}
            handleModalClick={handleModalClick}
            data={dataEditorsPick2[0]}
          />
          {/*  */}
          {/* Pick 3 */}
          <FeedEditorsPickCard
            handleModalClickUser={handleModalClickUser}
            handleModalClick={handleModalClick}
            data={dataEditorsPick3[0]}
          />
          {/*  */}
        </div>
        {/*  */}
        <div className="w-5/6 border-b border-grayBorder dark:border-shadeMedium"></div>
        <h1 className="mt-5 mb-7 w-full justify-start px-10 text-xl font-bold dark:text-egg md:flex md:w-5/6 md:text-2xl lg:w-2/3">
          Feed
        </h1>
        {/* Doodle Card */}
        <FeedDoodleCard
          dataInfiniteQueriesAllDoodles={dataInfiniteQueriesAllDoodles}
          handleModalClickUser={handleModalClickUser}
          handleModalClick={handleModalClick}
        />
        {/*  */}
      </div>
      {/* Pagination Load More Button */}
      <div className="mb-48 flex flex-col justify-center md:-ml-10 md:mb-20">
        <button
          ref={ref}
          onClick={() => fetchNextPageInfiniteQueriesAllDoodles()}
          disabled={
            !hasNextPageInfiniteQueriesAllDoodles ||
            isFetchingNextPageInfiniteQueriesAllDoodles
          }
          className="mb-5 text-xs text-placeholder"
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
      {/*  */}
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
