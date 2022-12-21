import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ProfileDoodleOptionsModal } from './ProfileDoodleOptionsModal.components';
import { ProfileDoodlePostSuccessModal } from './ProfileDoodlePostSuccessModal.components';
import * as Yup from 'yup';
import useFetchUserIsLikesDoodle from '../../../hooks/useFetchUserIsLikesDoodle';
import useIncrementLikeIfTrue from '../../../hooks/useIncrementLikeIfTrue';
import useDecrementLikeIfTrue from '../../../hooks/useDecrementLikeIfFalse';
import { LoaderSpinner } from '../../LoaderSpinner.components';

type Inputs = {
  comment: String;
};

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(2, 'too short!')
    .max(500, 'too long!')
    .matches(/^[0-9a-zA-Z]/, 'Only letters and numbers allowed, no spaces.'),
});

export const ProfileDoodleCard = ({
  doodleWithCommentsData,
  userDoodlesWithAllCommentsRefetch,
  doodleWithCommentsRefetch,
  userData,
}: any) => {
  const [isOptionsModal, setIsOptionsModal] = useState<boolean>(false);
  const [isPostSuccessModal, setIsPostSuccessModal] = useState<boolean>(false);

  const {
    userIsLikesDoodleData,
    userIsLikesDoodleIsLoading,
    userIsLikesDoodleIsError,
    userIsLikesDoodleRefetch,
  } = useFetchUserIsLikesDoodle(userData._id);

  const { mutateIncrementLikeIfTrue, isLoadingIncrementLikeIfTrue } =
    useIncrementLikeIfTrue({
      doodle: doodleWithCommentsData.doodle._id,
    });

  const { mutateDecrementLikeIfTrue, isLoadingDecrementLikeIfTrue } =
    useDecrementLikeIfTrue({
      doodle: doodleWithCommentsData.doodle._id,
    });

  console.log(userIsLikesDoodleData);

  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(CommentSchema) });

  const { mutateAsync, isLoading } = useMutation(async (dataObject: any) => {
    try {
      const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObject),
      };

      const response = await fetch(`/api/comments/`, Options);
      const json = await response.json();

      if (json) {
        setIsPostSuccessModal(true);
        return json;
      }
    } catch (error) {
      return error;
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset({ comment: '' });
    await mutateAsync({
      doodle: doodleWithCommentsData.doodle._id,
      user: doodleWithCommentsData.doodle.user,
      comment: data.comment,
    });
    await userDoodlesWithAllCommentsRefetch();
    await doodleWithCommentsRefetch();
  };

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

  const handleLikeTrueOnClick = async () => {
    await mutateIncrementLikeIfTrue();
    userDoodlesWithAllCommentsRefetch();
    doodleWithCommentsRefetch();
    userIsLikesDoodleRefetch();
  };

  const handleLikeFalseOnClick = async () => {
    await mutateDecrementLikeIfTrue();
    userDoodlesWithAllCommentsRefetch();
    doodleWithCommentsRefetch();
    userIsLikesDoodleRefetch();
  };

  if (userIsLikesDoodleIsLoading) return <LoaderSpinner />;
  if (userIsLikesDoodleIsError) return <>Error</>;

  return (
    <>
      {isOptionsModal ? (
        <ProfileDoodleOptionsModal
          setIsOptionsModal={setIsOptionsModal}
          doodleWithCommentsData={doodleWithCommentsData}
        />
      ) : null}
      {isPostSuccessModal ? (
        <ProfileDoodlePostSuccessModal
          setIsPostSuccessModal={setIsPostSuccessModal}
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
                className="rounded-full"
              />
            </Link>
            <Link href={`/profile/${userData.name}`}>
              <span className="font-semibold">{userData.name}</span>
            </Link>
          </div>
          <HiDotsHorizontal
            onClick={() => setIsOptionsModal(true)}
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
        <div className="h-[600px] w-full overflow-y-auto flex flex-col items-center pb-10">
          {/* Likes and Comments */}
          {doodleWithCommentsData.usersAndComments.length === 0 ? (
            <div className="text-grayText text-lg flex h-full justify-center items-center">
              No Comments
            </div>
          ) : (
            <>
              {doodleWithCommentsData.usersAndComments.map((data: any) => (
                <Fragment key={data.comments._id}>
                  <div
                    key={data.comments._id}
                    className="flex flex-col w-10/12 gap-1 mt-4"
                  >
                    <div className="flex flex-col w-full">
                      <div className="text-sm">
                        <span className="font-semibold hover:text-sunset">
                          <Link href={`/profile/${data.user.name}`}>
                            {data.user.name}
                          </Link>
                        </span>
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
                              {getMinuteDifference(data.comments.created_at) >
                              0 ? (
                                <>
                                  {getMinuteDifference(
                                    data.comments.created_at
                                  )}
                                  m
                                </>
                              ) : (
                                <>
                                  {getSecondsDifference(
                                    data.comments.created_at
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
                </Fragment>
              ))}
            </>
          )}

          {/*  */}
        </div>
        <div className="w-full border-t border-grayBorder">
          <div className="w-11/12 mx-auto gap-3 my-3 px-4 grid grid-cols-12">
            <div className="col-start-1 col-span-3 flex gap-1 items-center">
              {userIsLikesDoodleData.isLikes ? (
                <AiFillHeart
                  onClick={() => handleLikeFalseOnClick()}
                  className="text-2xl text-sunset cursor-pointer"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => handleLikeTrueOnClick()}
                  className="text-2xl cursor-pointer"
                />
              )}

              <p className="font-semibold text-xs">
                {doodleWithCommentsData.doodle.likes} likes
              </p>
            </div>
            <div className="col-start-4 col-span-9 flex gap-2 items-center">
              <FaRegComment className="text-[22px] transform -scale-x-100" />
              <p className="font-semibold text-xs">
                {doodleWithCommentsData.usersAndComments.length} comments
              </p>
            </div>
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
          {/* Comments Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-11/12 flex justify-center mx-auto items-center px-4 mt-3 gap-5 border border-transparent h-8 hover:h-20"
          >
            <textarea
              placeholder="Comment"
              className={
                errors.comment
                  ? 'w-full h-full focus:outline-none overflow-auto resize-none border border-red-600 rounded-md px-2 py-1 text-sm'
                  : 'w-full h-full focus:outline-none overflow-auto resize-none rounded-md px-2 py-1 text-sm'
              }
              {...register('comment')}
            />
            {errors.comment ? (
              <span className="text-grayText font-semibold text-sm cursor-default">
                Post
              </span>
            ) : (
              <button
                type="submit"
                className="text-cobalt font-semibold text-sm hover:text-sunset"
              >
                Post
              </button>
            )}
          </form>
          {/*  */}
        </div>
      </div>
    </>
  );
};
