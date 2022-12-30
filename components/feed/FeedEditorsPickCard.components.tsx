import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

type Doodle = {
  _id: string;
  user: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

type Like = {
  _id: string;
  doodle: string;
  user: string;
  likes: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

type Comment = {
  _id: string;
  doodle: string;
  user: string;
  comment: string;
  created_at: string;
  updated_at: string;
  __v: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null;
  biography: string;
  location: string;
};

type Data = {
  doodle: Doodle;
  likesNum: Like[];
  comments: Comment[];
  user: User;
};

type FeedEditorsPickCardProps = {
  handleModalClickUser: (arg0: string) => void;
  handleModalClick: (arg0: string) => void;
  data: Data;
};

export const FeedEditorsPickCard = ({
  handleModalClick,
  handleModalClickUser,
  data,
}: FeedEditorsPickCardProps) => {
  return (
    <>
      <div
        onClick={() => {
          handleModalClickUser(data.doodle.user);
          handleModalClick(data.doodle._id);
        }}
        className="overlay-container group relative overflow-hidden rounded-3xl"
      >
        <Image
          src={data.doodle.image}
          alt="doodle card"
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full cursor-pointer rounded-3xl border border-grayBorder object-cover dark:border-transparent"
        />
        <div className="overlay absolute top-0 h-full w-full cursor-pointer rounded-3xl text-white group-hover:bg-black group-hover:bg-opacity-30 group-hover:backdrop-blur-sm dark:group-hover:bg-white dark:group-hover:bg-opacity-30 dark:group-hover:backdrop-blur-sm">
          <div className="overlay-text invisible flex h-full w-full flex-col items-center justify-center gap-5 p-4 group-hover:visible">
            <div className="flex items-center gap-5 dark:text-midnight md:gap-6 lg:gap-8">
              <div className="flex items-center gap-2">
                <AiFillHeart />
                {data.likesNum.length}
              </div>
              <div className="flex items-center gap-2">
                <FaComment className="-scale-x-100 transform" />
                {data.comments.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
