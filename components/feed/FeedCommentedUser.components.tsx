import Link from 'next/link';
import useFetchUser from '../../hooks/useFetchUser';
import { LoaderSpinner } from '../LoaderSpinner.components';

type Doodle = {
  doodle: {
    _id: string;
    user: string;
    image: string;
    likes: number;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  likesNum: {
    _id: string;
    doodle: string;
    user: string;
    likes: number;
    created_at: string;
    updated_at: string;
    __v: number;
  }[];
  comments: {
    _id: string;
    doodle: string;
    user: string;
    comment: string;
    created_at: string;
    updated_at: string;
    __v: number;
  }[];
};

type FeedCommentedUserProps = {
  doodle: Doodle;
  userId: string;
  doodleId: string;
  handleModalClickUser: (arg0: string) => void;
  handleModalClick: (arg0: string) => void;
};

export const FeedCommentedUser = ({
  doodle,
  userId,
  doodleId,
  handleModalClick,
  handleModalClickUser,
}: FeedCommentedUserProps) => {
  // Custom Functions ---------------------------------------------------- ***
  const findMostRecentComment = (object: Doodle) => {
    const comments = object.comments;
    const sortedComments = comments.sort((a: any, b: any) => {
      return a.created_at - b.created_at;
    });
    const mostRecentComment = sortedComments[sortedComments.length - 1];
    return mostRecentComment;
  };

  // States ------------------------------------------------------------- ***
  const comment = findMostRecentComment(doodle);
  const { userData, userIsLoading, userIsError, userRefetch } = useFetchUser(
    comment.user
  );

  // JSX ------------------------------------------------------------------ ***
  if (userIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>Error</>;

  return (
    <>
      <div className="border-borderGray mx-1 my-3 border-b dark:border-shadeMedium"></div>
      <div className="flex flex-col gap-0.5 px-1 text-xs">
        <span>
          <Link
            href={`/profile/${userData.name}`}
            className="font-semibold hover:text-sunset dark:text-egg dark:hover:text-sunset"
          >
            {userData.name}
          </Link>
        </span>
        <span className="text-[#575757] dark:text-[#a9a9ab]">
          {comment.comment}
        </span>
        <div>
          <p
            onClick={() => {
              handleModalClickUser(doodle.doodle.user);
              handleModalClick(doodle.doodle._id);
            }}
            className="mt-2 w-fit cursor-pointer text-placeholder hover:text-sunset dark:text-shadeText dark:hover:text-sunset"
          >
            View more comments...
          </p>
        </div>
      </div>
    </>
  );
};
