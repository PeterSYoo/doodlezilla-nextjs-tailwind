import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getDayDifference,
  getHourDifference,
  getMinuteDifference,
  getSecondsDifference,
} from '../../utils/findTimeDifference';
import { FeedCommentedUser } from './FeedCommentedUser.components';

type FeedDoodleCardProps = {
  dataInfiniteQueriesAllDoodles: any;
  handleModalClickUser: (arg0: string) => void;
  handleModalClick: (arg0: string) => void;
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

export const FeedDoodleCard = ({
  dataInfiniteQueriesAllDoodles,
  handleModalClickUser,
  handleModalClick,
}: FeedDoodleCardProps) => {
  return (
    <>
      <div className="columns-1 px-10 md:w-5/6 lg:w-2/3">
        {dataInfiniteQueriesAllDoodles?.pages.map((page: Page, i: number) => (
          <Fragment key={i}>
            {page.combinedData?.map((doodle: Doodle) => (
              <Fragment key={doodle.doodle._id}>
                <div className="mb-16">
                  {/* User Avatar and Username */}
                  <Link
                    href={`/profile/${doodle.user.name}`}
                    className="flex items-center gap-3 mb-3 group w-fit px-1"
                  >
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
                    <span className="font-semibold break-all w-7/8 text-center text-sm dark:text-egg dark:group-hover:text-sunset group-hover:text-sunset cursor-pointer">
                      {doodle.user.name}
                    </span>
                  </Link>
                  {/*  */}
                  {/* Doodle Image */}
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
                  </div>
                  {/*  */}
                  <div className="flex justify-between items-center px-2 mt-2">
                    {/* Likes and Comments */}
                    <div className="flex items-center gap-2 dark:text-shadeText text-xs">
                      <div className="flex items-center gap-2">
                        {doodle.likesNum.length} likes
                      </div>
                      <div className="flex items-center gap-2">
                        {doodle.comments.length} comments
                      </div>
                    </div>
                    {/*  */}
                    {/* Created Time ago */}
                    <div className="flex items-center gap-2">
                      <p className="text-xs dark:text-shadeText">
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
                    {/*  */}
                  </div>
                  {/* Most Recent Comment */}
                  <div className="flex flex-col w-full px-1">
                    {doodle.comments[0] ? (
                      <FeedCommentedUser
                        doodle={doodle}
                        userId={doodle.doodle.user}
                        doodleId={doodle.doodle._id}
                        handleModalClickUser={handleModalClickUser}
                        handleModalClick={handleModalClick}
                      />
                    ) : null}
                  </div>
                  {/*  */}
                </div>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};
