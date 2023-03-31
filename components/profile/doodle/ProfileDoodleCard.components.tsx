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
import * as Yup from 'yup';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import {
  getDayDifference,
  getHourDifference,
  getMinuteDifference,
  getSecondsDifference,
} from '../../../utils/findTimeDifference';
import { RiCloseFill } from 'react-icons/ri';
import { ProfileDoodleFullImageModal } from './ProfileDoodleFullImageModal';

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
  isFeedPage?: boolean;
  setIsDoodleModal: (arg0: boolean) => void;
  refetchEditorsPick1?: any;
  refetchEditorsPick2?: any;
  refetchEditorsPick3?: any;
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
  isFeedPage,
  setIsDoodleModal,
  refetchEditorsPick1,
  refetchEditorsPick2,
  refetchEditorsPick3,
}: ProfileDoodleCardProps) => {
  // States ------------------------------------------------------------- ***
  const [isOptionsModal, setIsOptionsModal] = useState<boolean>(false);
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
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
    useCreateNewComment();

  // Custom Functions ---------------------------------------------------- ***
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset({ comment: '' });
    await mutateCreateNewComment({
      doodle: doodleWithCommentsData.doodle._id,
      user: dataSessionUser._id,
      comment: data.comment,
    });
    await doodleWithCommentsRefetch();
    await userDoodlesWithAllCommentsRefetch();
    if (isFeedPage) {
      await refetchInfiniteQueriesAllDoodles();
      await refetchEditorsPick1();
      await refetchEditorsPick2();
      await refetchEditorsPick3();
    }
  };

  const handleLikeTrueOnClick = async () => {
    await mutateCreateNewLikesNum();
    await refetchGetAllLikesNum();
    await userDoodlesWithAllCommentsRefetch();
    if (isFeedPage) {
      await refetchInfiniteQueriesAllDoodles();
      await refetchEditorsPick1();
      await refetchEditorsPick2();
      await refetchEditorsPick3();
    }
  };

  const handleLikeFalseOnClick = async () => {
    await mutateDeleteLikesNum();
    await refetchGetAllLikesNum();
    await userDoodlesWithAllCommentsRefetch();
    if (isFeedPage) {
      await refetchInfiniteQueriesAllDoodles();
      await refetchEditorsPick1();
      await refetchEditorsPick2();
      await refetchEditorsPick3();
    }
  };

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    refetchLikesDocumentByUserAndDoodle();
  }, [dataGetAllLikesNum]);

  // JSX ------------------------------------------------------------------ ***
  if (isLoadingLikesDocumentByUserAndDoodle || isLoadingGetAllLikesNum)
    return <LoaderSpinner />;
  if (isErrorLikesDocumentByUserAndDoodle || isErrorGetAllLikesNum)
    return <>Error</>;

  return (
    <>
      {isImageModal ? (
        <ProfileDoodleFullImageModal
          setIsImageModal={setIsImageModal}
          doodleImage={doodleWithCommentsData.doodle.image}
        />
      ) : null}
      {isOptionsModal ? (
        <ProfileDoodleOptionsModal
          setIsOptionsModal={setIsOptionsModal}
          doodleWithCommentsData={doodleWithCommentsData}
        />
      ) : null}
      <div className="flex h-3/4 max-h-[900px] w-full max-w-[375px] flex-col items-center justify-center rounded-[50px] border border-grayBorder bg-white pt-5 pb-8 dark:border-shadeDark dark:bg-midnight md:h-5/6 md:max-w-[575px] -mt-40 md:mt-0">
        {/* Doodle Header */}
        <div className="flex w-10/12 items-center justify-between pb-3">
          <Link
            href={`/profile/${userData.name}`}
            className="flex items-center gap-3 hover:text-sunset dark:text-egg dark:hover:text-sunset"
          >
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
            <span className="font-semibold">{userData.name}</span>
          </Link>

          <div className="flex items-center gap-6">
            {loggedInSession.user.name !== userData.name ? null : (
              <HiDotsHorizontal
                onClick={() => setIsOptionsModal(true)}
                className="cursor-pointer text-2xl hover:text-sunset dark:text-egg dark:hover:text-sunset"
              />
            )}
            {/* Close X Top Right Button */}
            <span
              onClick={() => setIsDoodleModal(false)}
              className="cursor-pointer text-3xl hover:text-sunset dark:text-egg dark:hover:text-sunset"
            >
              <RiCloseFill />
            </span>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Doodle Image */}
        <Image
          onClick={() => setIsImageModal(true)}
          src={doodleWithCommentsData.doodle.image}
          width={533}
          height={900}
          alt="tree"
          className="my-3 max-h-[275px] w-3/4 shrink cursor-pointer rounded-3xl object-contain"
        />
        {/*  */}
        <div className="flex h-[600px] w-full flex-col items-center overflow-y-auto pb-10">
          {/* Likes and Comments */}
          {doodleWithCommentsData.usersAndComments.length === 0 ? (
            <div className="flex h-full items-center justify-center text-lg text-grayText dark:text-shadeText">
              No Comments
            </div>
          ) : (
            <>
              {doodleWithCommentsData.usersAndComments
                .sort(
                  (a: CommentData, b: CommentData) =>
                    new Date(b.comments.created_at).getTime() -
                    new Date(a.comments.created_at).getTime()
                )
                .map((data: CommentData) => (
                  <Fragment key={data.comments._id}>
                    <div
                      key={data.comments._id}
                      className="mt-4 flex w-10/12 flex-col gap-1"
                    >
                      <div className="flex w-full flex-col">
                        <div className="flex flex-col gap-0.5 text-sm">
                          <span>
                            <Link
                              href={`/profile/${data.user.name}`}
                              className="font-semibold hover:text-sunset dark:text-egg dark:hover:text-sunset"
                            >
                              {data.user.name}
                            </Link>
                          </span>
                          <span className="text-[#575757] dark:text-[#a9a9ab]">
                            {data.comments.comment}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-placeholder dark:text-shadeText">
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
                ))}
            </>
          )}

          {/*  */}
        </div>
        <div className="w-full border-t border-grayBorder dark:border-shadeDark">
          <div className="mx-auto my-3 grid w-11/12 grid-cols-12 gap-0 px-0 md:gap-3 md:px-4">
            <div className="col-span-3 col-start-1 flex items-center gap-1">
              {dataLikesDocumentByUserAndDoodle.likes ? (
                <AiFillHeart
                  onClick={() => handleLikeFalseOnClick()}
                  className="cursor-pointer text-2xl text-sunset"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => handleLikeTrueOnClick()}
                  className="cursor-pointer text-2xl text-placeholder hover:text-black dark:text-shadeText dark:hover:text-egg"
                />
              )}

              <p className="text-xs font-semibold dark:text-egg">
                {dataGetAllLikesNum.length}&nbsp;
                <span className="text-placeholder dark:text-shadeText">
                  likes
                </span>
              </p>
            </div>
            <div className="col-span-4 col-start-4 flex items-center gap-2 md:col-span-3">
              <FaRegComment className="-scale-x-100 transform text-[22px] text-placeholder dark:text-shadeText" />
              <p className="text-xs font-semibold dark:text-egg">
                {doodleWithCommentsData.usersAndComments.length}&nbsp;
                <span className="text-placeholder">comments</span>
              </p>
            </div>
            <div className="col-span-4 col-start-9 flex items-center justify-end gap-2 md:col-span-6 md:col-start-8">
              <p className="text-xs text-placeholder dark:text-shadeText">
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
        <div className="w-full border-t border-grayBorder dark:border-shadeDark">
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
                    ? 'h-full w-full resize-none overflow-auto rounded-md border border-red-600 px-2 py-1 text-sm focus:outline-none dark:bg-shadeMedium dark:text-egg'
                    : 'h-full w-full resize-none overflow-auto rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-shadeMedium dark:text-egg'
                }
                {...register('comment')}
              />
              {errors.comment ? (
                <span className="cursor-default text-sm font-semibold text-grayText dark:text-shadeText">
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
                    className="text-sm font-semibold text-cobalt hover:text-sunset"
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
