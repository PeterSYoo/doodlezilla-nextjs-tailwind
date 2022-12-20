import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ProfileDoodleOptionsModal } from './ProfileDoodleOptionsModal.components';

export const ProfileDoodleCard = ({
  doodleWithCommentsData,
  userData,
}: any) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const getDayDifference = (dateTime: string) => {
    /* Get the current time in Pacific Standard Time */
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in Pacific Standard Time */
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the current time and specific date in milliseconds */
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    /* Calculate the difference in milliseconds */
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    /* Convert the time difference to days */
    const dayDifference = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    return dayDifference;
  };

  const getHourDifference = (dateTime: string) => {
    /* Get the current time in Pacific Standard Time */
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in Pacific Standard Time */
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in milliseconds */
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    /* Convert the time difference to hours */
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInHours = Math.floor(timeDifference / 1000 / 60 / 60);

    return timeDifferenceInHours;
  };

  const getMinuteDifference = (dateTime: string) => {
    /* Get the current time in Pacific Standard Time */
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in Pacific Standard Time */
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in milliseconds */
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    /* Calculate the difference in milliseconds */
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    /* Convert the time difference to minutes */
    const timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60);

    return timeDifferenceInMinutes;
  };

  const getSecondsDifference = (dateTime: string) => {
    /* Get the current time in Pacific Standard Time */
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the specific date in Pacific Standard Time */
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    /* Get the current time and specific date in milliseconds */
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    /* Calculate the difference in milliseconds */
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    /* Convert the time difference to seconds */
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

    return timeDifferenceInSeconds;
  };

  return (
    <>
      {isModal ? (
        <ProfileDoodleOptionsModal
          setIsModal={setIsModal}
          doodleWithCommentsData={doodleWithCommentsData}
        />
      ) : null}
      <div className="bg-white border border-grayBorder w-full h-full max-h-[900px] max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:max-w-[575px]">
        {/* Doodle Header */}
        <div className="flex justify-between items-center w-10/12 pb-3">
          <div className="flex gap-3 items-center">
            <Link href={`/profile/${userData.name}`}>
              <Image
                src={
                  userData.image
                    ? userData.image
                    : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                }
                width={43}
                height={43}
                alt="avatar feed"
              />
            </Link>
            <Link href={`/profile/${userData.name}`}>
              <span className="font-semibold">{userData.name}</span>
            </Link>
          </div>
          <HiDotsHorizontal
            onClick={() => setIsModal(true)}
            className="text-2xl cursor-pointer hover:text-sunset"
          />
        </div>
        {/*  */}
        {/* Doodle Image */}
        <Image
          src={doodleWithCommentsData.doodle.image}
          width={533}
          height={900}
          alt="tree"
          className="object-container shrink rounded-3xl w-2/3 mb-3"
        />

        {/*  */}
        <div className="h-[600px] w-full overflow-y-scroll flex flex-col items-center">
          {/* Likes and Comments */}
          {doodleWithCommentsData.usersAndComments.map((data: any) => (
            <Fragment key={data.comments._id}>
              <div
                key={data.comments._id}
                className="flex flex-col w-10/12 gap-1 mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="text-sm">
                    <span className="font-semibold">{data.user.name}</span>
                    &nbsp;
                    <span className="">{data.comments.comment}</span>
                  </div>
                </div>
                <p className="text-[10px] text-placeholder">
                  {getDayDifference(data.comments.created_at) > 0 ? (
                    <>{getDayDifference(data.comments.created_at)}d</>
                  ) : (
                    <>
                      {getHourDifference(data.comments.created_at) > 0 ? (
                        <>{getHourDifference(data.comments.created_at)}h</>
                      ) : (
                        <>
                          {getMinuteDifference(data.comments.created_at) > 0 ? (
                            <>
                              {getMinuteDifference(data.comments.created_at)}m
                            </>
                          ) : (
                            <>
                              {getSecondsDifference(data.comments.created_at)}s
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
            </Fragment>
          ))}
          {/*  */}
        </div>
        <div className="w-full border-t border-grayBorder">
          <div className="w-11/12 flex flex-col mx-auto gap-3 my-3 px-4">
            <div className="flex gap-6">
              <AiOutlineHeart className="text-2xl" />
              <FaRegComment className="text-[22px] mt-[1px]" />
            </div>
            <p className="font-semibold text-xs">
              {doodleWithCommentsData.doodle.likes} likes
            </p>
            <p className="text-xs text-placeholder">
              {getDayDifference(doodleWithCommentsData.doodle.created_at) >
              0 ? (
                <>
                  {getDayDifference(doodleWithCommentsData.doodle.created_at)}d
                </>
              ) : (
                <>
                  {getHourDifference(doodleWithCommentsData.doodle.created_at) >
                  0 ? (
                    <>
                      {getHourDifference(
                        doodleWithCommentsData.doodle.created_at
                      )}
                      h
                    </>
                  ) : (
                    <>
                      {getMinuteDifference(
                        doodleWithCommentsData.doodle.created_at
                      ) > 0 ? (
                        <>
                          {getMinuteDifference(
                            doodleWithCommentsData.doodle.created_at
                          )}
                          m
                        </>
                      ) : (
                        <>
                          {getSecondsDifference(
                            doodleWithCommentsData.doodle.created_at
                          )}
                          s
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
        <div className="w-full border-t border-grayBorder">
          {/* Write a Comment and Post Button */}
          <div className="w-11/12 flex justify-between mx-auto items-center px-4 mt-3 gap-5">
            <textarea className="w-full h-6 focus:outline-none focus:h-20 overflow-auto" />

            <button type="submit" className="text-cobalt font-semibold text-sm">
              Post
            </button>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};
