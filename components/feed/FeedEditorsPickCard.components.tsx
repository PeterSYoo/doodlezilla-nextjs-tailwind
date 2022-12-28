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
        className="overlay-container rounded-3xl overflow-hidden relative group"
      >
        <Image
          src={data.doodle.image}
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
                {data.likesNum.length}
              </div>
              <div className="flex items-center gap-2">
                <FaComment className="transform -scale-x-100" />
                {data.comments.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
