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
      <div className="fixed right-0 z-50 hidden h-full border-l border-grayBorder bg-white px-1 dark:border-midnight dark:bg-midnight md:flex md:w-[159px] md:flex-col lg:w-[258px]">
        <div className="md:mx-auto md:flex md:flex-col md:gap-6 lg:w-[187px]">
          <h1 className="ml-4 mt-[18px] font-semibold dark:text-egg lg:ml-0">
            Sponsored
          </h1>
          {/* Sponsored Card */}
          <FeedRightBarSponsoredCard />
          {/*  */}
          {/* Suggestions For You */}
          <h1 className="mt-[18px] text-center text-[15px] font-semibold dark:text-egg lg:flex">
            Suggestions for you
          </h1>
          <div className="flex flex-col gap-4 px-2">
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
                      className="group flex w-fit items-center gap-3"
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
                      <p className="break-all text-sm font-semibold group-hover:text-sunset dark:text-egg dark:group-hover:text-sunset">
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
