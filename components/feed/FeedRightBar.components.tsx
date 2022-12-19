import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchAllUsers from '../../hooks/useFetchAllUsers';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { FeedRightBarSponsoredCard } from './FeedRightBarSponsoredCard.components';
import Link from 'next/link';

export const FeedRightBar = () => {
  const { data: session }: any = useSession();

  const { userData, userIsLoading, userIsError } = useFetchUser(
    session.user.id
  );
  const { allUsersData, allUsersIsLoading, allUsersIsError } =
    useFetchAllUsers();

  if (userIsLoading || allUsersIsLoading) return <LoaderSpinner />;
  if (userIsError || allUsersIsError) return <>Error</>;

  return (
    <>
      <div className="z-50 fixed bg-white right-0 h-full hidden md:flex md:w-[159px] lg:w-[258px] border-l border-grayBorder md:flex-col px-1">
        <div className="md:flex md:flex-col lg:w-[187px] md:mx-auto md:gap-6">
          <h1 className="font-semibold ml-4 mt-[18px] lg:ml-0">Sponsored</h1>
          {/* Sponsored Card */}
          <FeedRightBarSponsoredCard />
          {/*  */}
          {/* Suggestions For You */}
          <h1 className="font-semibold mt-[18px] text-[15px] text-center lg:flex">
            Suggestions for you
          </h1>
          <div className="flex flex-col px-2 gap-4">
            {/* User Suggestions */}
            {allUsersData
              .slice()
              .sort(() => Math.random() - 0.5)
              .slice(0, 7)
              .map((user: any) => (
                <>
                  {userData._id === user._id ? null : (
                    <div
                      key={user._id}
                      className="grid grid-cols-12 items-center gap-2"
                    >
                      <div className="col-start-1 col-span-3">
                        <Link href={`/profile/${user.name}`}>
                          <Image
                            src={
                              user.image
                                ? user.image
                                : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                            }
                            width={43}
                            height={43}
                            alt="suggestions avatar"
                            className="rounded-full"
                          />
                        </Link>
                      </div>
                      <div className="col-start-4 col-span-9">
                        <p className="font-semibold text-sm break-all">
                          <Link href={`/profile/${user.name}`}>
                            {user.name}
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            {/*  */}
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};
