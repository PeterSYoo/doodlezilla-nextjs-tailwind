import { Fragment, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useFetchLikesDocumentByUserAndDoodle from '../../../hooks/useFetchLikesDocumentByUserAndDoodle';
import useCreateNewComment from '../../../hooks/useCreateNewComment';
import useGetAllLikesNum from '../../../hooks/useGetAllLikesNum';
import useCreateNewLikesNum from '../../../hooks/useCreateNewLikesNum';
import useDeleteLikesNum from '../../../hooks/useDeleteLikesNum';
import { LoaderSpinner } from '../../LoaderSpinner.components';
import { ProfileDoodleOptionsModal } from './ProfileDoodleOptionsModal.components';
import { ProfileDoodlePostSuccessModal } from './ProfileDoodlePostSuccessModal.components';
import * as Yup from 'yup';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

type ProfileDoodleCardProps = {
  doodleWithCommentsData: {
    doodle: {
      _id: string;
      user: string;
      image: string;
      likes: number;
      created_at: string;
      updated_at: string;
      __v: number;
    };
    usersAndComments: Array<{
      _id: string;
      user: string;
      doodle: string;
      text: string;
      likes: number;
      created_at: string;
      updated_at: string;
      __v: number;
    }>;
  };
  userDoodlesWithAllCommentsRefetch: () => void;
  doodleWithCommentsRefetch: () => void;
  userData: {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
    biography: string;
    image: string;
    location: string;
  };
  dataSessionUser: {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
    biography: string;
    image: string;
    location: string;
  };
  refetchInfiniteQueriesAllDoodles?: any;
};

type Inputs = {
  comment: String;
};

type CommentData = {
  user?: any;
  comments?: any;
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
  dataSessionUser,
  refetchInfiniteQueriesAllDoodles,
}: ProfileDoodleCardProps) => {
  const [isOptionsModal, setIsOptionsModal] = useState<boolean>(false);
  const [isPostSuccessModal, setIsPostSuccessModal] = useState<boolean>(false);
  const [commentHeight, setCommentHeight] = useState<string>(
    'w-11/12 flex justify-center mx-auto items-center px-4 mt-3 gap-5 border border-transparent h-8 w-full'
  );

  const { data: loggedInSession }: any = useSession();

  const {
    dataLikesDocumentByUserAndDoodle,
    isLoadingLikesDocumentByUserAndDoodle,
    isErrorLikesDocumentByUserAndDoodle,
    refetchLikesDocumentByUserAndDoodle,
  } = useFetchLikesDocumentByUserAndDoodle(
    doodleWithCommentsData.doodle._id,
    loggedInSession.user.id
  );

  const {
    dataGetAllLikesNum,
    isLoadingGetAllLikesNum,
    isErrorGetAllLikesNum,
    refetchGetAllLikesNum,
  } = useGetAllLikesNum(doodleWithCommentsData.doodle._id);

  const { mutateCreateNewLikesNum, isLoadingCreateNewLikesNum } =
    useCreateNewLikesNum(
      doodleWithCommentsData.doodle._id,
      loggedInSession.user.id
    );

  const { mutateDeleteLikesNum, isLoadingDeleteLikesNum } = useDeleteLikesNum(
    doodleWithCommentsData.doodle._id,
    loggedInSession.user.id
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(CommentSchema) });

  const { mutateCreateNewComment, isLoadingCreateNewComment } =
    useCreateNewComment(setIsPostSuccessModal);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset({ comment: '' });
    await mutateCreateNewComment({
      doodle: doodleWithCommentsData.doodle._id,
      user: dataSessionUser._id,
      comment: data.comment,
    });
    await doodleWithCommentsRefetch();
    await userDoodlesWithAllCommentsRefetch();
    await refetchInfiniteQueriesAllDoodles();
  };

  const getDayDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const dayDifference = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    return dayDifference;
  };

  const getHourDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInHours = Math.floor(timeDifference / 1000 / 60 / 60);

    return timeDifferenceInHours;
  };

  const getMinuteDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60);

    return timeDifferenceInMinutes;
  };

  const getSecondsDifference = (dateTime: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const specificDate = new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const currentTimeInMilliseconds = new Date(currentTime).getTime();
    const specificDateInMilliseconds = new Date(specificDate).getTime();
    const timeDifference =
      currentTimeInMilliseconds - specificDateInMilliseconds;
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

    return timeDifferenceInSeconds;
  };

  const handleLikeTrueOnClick = async () => {
    await mutateCreateNewLikesNum();
    await refetchGetAllLikesNum();
    await userDoodlesWithAllCommentsRefetch();
    await refetchInfiniteQueriesAllDoodles();
  };

  const handleLikeFalseOnClick = async () => {
    await mutateDeleteLikesNum();
    await refetchGetAllLikesNum();
    await userDoodlesWithAllCommentsRefetch();
    await refetchInfiniteQueriesAllDoodles();
  };

  useEffect(() => {
    refetchLikesDocumentByUserAndDoodle();
  }, [dataGetAllLikesNum]);

  if (isLoadingLikesDocumentByUserAndDoodle || isLoadingGetAllLikesNum)
    return <LoaderSpinner />;
  if (isErrorLikesDocumentByUserAndDoodle || isErrorGetAllLikesNum)
    return <>Error</>;

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
      <div className="bg-white border border-grayBorder w-full h-3/4 md:h-5/6 max-h-[900px] max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:max-w-[575px]">
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
          {loggedInSession.user.name !== userData.name ? null : (
            <HiDotsHorizontal
              onClick={() => setIsOptionsModal(true)}
              className="text-2xl cursor-pointer hover:text-sunset"
            />
          )}
        </div>
        {/*  */}
        {/* Doodle Image */}
        <Image
          src={doodleWithCommentsData.doodle.image}
          width={533}
          height={900}
          alt="tree"
          className="object-contain shrink rounded-3xl w-2/3 mb-3 max-h-[375px]"
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
              {doodleWithCommentsData.usersAndComments.map(
                (data: CommentData) => (
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
                              <>
                                {getHourDifference(data.comments.created_at)}h
                              </>
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
                )
              )}
            </>
          )}

          {/*  */}
        </div>
        <div className="w-full border-t border-grayBorder">
          <div className="w-11/12 mx-auto gap-0 md:gap-3 my-3 px-0 md:px-4 grid grid-cols-12">
            <div className="col-start-1 col-span-3 flex gap-1 items-center">
              {dataLikesDocumentByUserAndDoodle.likes ? (
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
                {dataGetAllLikesNum.length}{' '}
                <span className="text-placeholder">likes</span>
              </p>
            </div>
            <div className="col-start-4 col-span-4 md:col-span-3 flex gap-2 items-center">
              <FaRegComment className="text-[22px] transform -scale-x-100" />
              <p className="font-semibold text-xs">
                {doodleWithCommentsData.usersAndComments.length}{' '}
                <span className="text-placeholder">comments</span>
              </p>
            </div>
            <div className="col-start-9 col-span-4 md:col-start-8 md:col-span-6 flex gap-2 items-center justify-end">
              <p className="text-xs text-placeholder">
                Created&nbsp;
                {getDayDifference(doodleWithCommentsData.doodle.created_at) >
                0 ? (
                  <>
                    {getDayDifference(doodleWithCommentsData.doodle.created_at)}
                    d ago
                  </>
                ) : (
                  <>
                    {getHourDifference(
                      doodleWithCommentsData.doodle.created_at
                    ) > 0 ? (
                      <>
                        {getHourDifference(
                          doodleWithCommentsData.doodle.created_at
                        )}
                        h ago
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
                            m ago
                          </>
                        ) : (
                          <>
                            {getSecondsDifference(
                              doodleWithCommentsData.doodle.created_at
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
          </div>
        </div>
        <div className="w-full border-t border-grayBorder">
          {/* Comments Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              onMouseDown={() =>
                setCommentHeight(
                  'w-11/12 flex justify-center mx-auto items-center px-4 mt-3 gap-5 border border-transparent h-20 w-full'
                )
              }
              className={commentHeight}
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
                <div
                  onMouseDown={() =>
                    setCommentHeight(
                      'w-11/12 flex justify-center mx-auto items-center px-4 mt-3 gap-5 border border-transparent h-20 w-full'
                    )
                  }
                  onBlur={() =>
                    setCommentHeight(
                      'w-11/12 flex justify-center mx-auto items-center px-4 mt-3 gap-5 border border-transparent h-8 w-full'
                    )
                  }
                >
                  <button
                    type="submit"
                    className="text-cobalt font-semibold text-sm"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </form>
          {/*  */}
        </div>
      </div>
    </>
  );
};
