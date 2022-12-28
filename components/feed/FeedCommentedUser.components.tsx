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
};

export const FeedCommentedUser = ({ doodle }: FeedCommentedUserProps) => {
  const findMostRecentComment = (object: Doodle) => {
    const comments = object.comments;

    const sortedComments = comments.sort((a: any, b: any) => {
      return a.created_at - b.created_at;
    });

    const mostRecentComment = sortedComments[sortedComments.length - 1];

    return mostRecentComment;
  };

  const comment = findMostRecentComment(doodle);

  const { userData, userIsLoading, userIsError, userRefetch } = useFetchUser(
    comment.user
  );

  if (userIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>Error</>;

  return (
    <>
      <div className="text-xs my-3 px-1">
        <span className="font-semibold hover:text-sunset dark:text-egg dark:hover:text-sunset">
          <Link href={`/profile/${userData.name}`}>{userData.name}</Link>
        </span>
        &nbsp;
        <span className="dark:text-shadeText">{comment.comment}</span>
      </div>
      <div className="border-b border-borderGray dark:border-shadeMedium mx-1"></div>
    </>
  );
};
