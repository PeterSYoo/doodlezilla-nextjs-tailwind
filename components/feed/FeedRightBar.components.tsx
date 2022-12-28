import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchAllUsers from '../../hooks/useFetchAllUsers';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { FeedRightBarSponsoredCard } from './FeedRightBarSponsoredCard.components';

type User = {
  _id: string;
  name: string;
  image: string | null;
};

export const FeedRightBar = () => {
  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session?.user?.id
  );
  const { allUsersData, allUsersIsLoading, allUsersIsError } =
    useFetchAllUsers();

  if (userIsLoading || allUsersIsLoading) return <LoaderSpinner />;
  if (userIsError || allUsersIsError) return <>Error</>;

  return (
    <>
      <div className="z-50 fixed bg-white dark:bg-midnight right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder dark:border-midnight md:flex-col px-1">
        <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
          <h1 className="font-semibold ml-4 mt-[18px] lg:ml-0 dark:text-egg">
            Sponsored
          </h1>
          {/* Sponsored Card */}
          <FeedRightBarSponsoredCard />
          {/*  */}
          {/* Suggestions For You */}
          <h1 className="font-semibold mt-[18px] text-[15px] text-center lg:flex dark:text-egg">
            Suggestions for you
          </h1>
          <div className="flex flex-col px-2 gap-4">
            {/* User Suggestions */}
            {allUsersData
              .slice()
              .sort(() => Math.random() - 0.5)
              .slice(0, 7)
              .map((user: User) => (
                <Fragment key={user._id}>
                  {userData._id === user._id ? null : (
                    <Link
                      href={`/profile/${user.name}`}
                      className="flex items-center gap-3 group w-fit"
                    >
                      <Image
                        src={
                          user.image
                            ? user.image
                            : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                        }
                        width={33}
                        height={33}
                        alt="suggestions avatar"
                        className="rounded-full"
                      />
                      <p className="font-semibold text-sm break-all dark:text-egg dark:group-hover:text-sunset group-hover:text-sunset">
                        {user.name}
                      </p>
                    </Link>
                  )}
                </Fragment>
              ))}
            {/*  */}
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};
