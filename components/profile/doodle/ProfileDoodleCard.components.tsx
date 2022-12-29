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

  useEffect(() => {
    refetchLikesDocumentByUserAndDoodle();
  }, [dataGetAllLikesNum]);

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
      <div className="bg-white dark:bg-midnight border border-grayBorder dark:border-shadeDark w-full h-3/4 md:h-5/6 max-h-[900px] max-w-[375px] flex flex-col items-center justify-center rounded-[50px] pt-5 pb-8 md:max-w-[575px]">
        {/* Doodle Header */}
        <div className="flex justify-between items-center w-10/12 pb-3">
          <Link
            href={`/profile/${userData.name}`}
            className="flex gap-3 items-center dark:text-egg dark:hover:text-sunset hover:text-sunset"
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
                className="text-2xl cursor-pointer hover:text-sunset dark:text-egg dark:hover:text-sunset"
              />
            )}
            {/* Close X Top Right Button */}
            <span
              onClick={() => setIsDoodleModal(false)}
              className="text-3xl dark:text-egg cursor-pointer dark:hover:text-sunset hover:text-sunset"
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
          className="object-contain shrink rounded-3xl w-3/4 my-3 max-h-[275px] cursor-pointer"
        />
        {/*  */}
        <div className="h-[600px] w-full overflow-y-auto flex flex-col items-center pb-10">
          {/* Likes and Comments */}
          {doodleWithCommentsData.usersAndComments.length === 0 ? (
            <div className="text-grayText dark:text-shadeText text-lg flex h-full justify-center items-center">
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
                      className="flex flex-col w-10/12 gap-1 mt-4"
                    >
                      <div className="flex flex-col w-full">
                        <div className="text-sm flex flex-col gap-0.5">
                          <span>
                            <Link
                              href={`/profile/${data.user.name}`}
                              className="font-semibold hover:text-sunset dark:text-egg dark:hover:text-sunset"
                            >
                              {data.user.name}
                            </Link>
                          </span>
                          <span className="dark:text-[#a9a9ab] text-[#575757]">
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
                  className="text-2xl cursor-pointer dark:text-shadeText dark:hover:text-egg text-placeholder hover:text-black"
                />
              )}

              <p className="font-semibold text-xs dark:text-egg">
                {dataGetAllLikesNum.length}&nbsp;
                <span className="text-placeholder dark:text-shadeText">
                  likes
                </span>
              </p>
            </div>
            <div className="col-start-4 col-span-4 md:col-span-3 flex gap-2 items-center">
              <FaRegComment className="text-[22px] transform -scale-x-100 dark:text-shadeText text-placeholder" />
              <p className="font-semibold text-xs dark:text-egg">
                {doodleWithCommentsData.usersAndComments.length}&nbsp;
                <span className="text-placeholder">comments</span>
              </p>
            </div>
            <div className="col-start-9 col-span-4 md:col-start-8 md:col-span-6 flex gap-2 items-center justify-end">
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
                    ? 'w-full h-full focus:outline-none overflow-auto resize-none border border-red-600 rounded-md px-2 py-1 text-sm dark:text-egg dark:bg-shadeMedium'
                    : 'w-full h-full focus:outline-none overflow-auto resize-none rounded-md px-2 py-1 text-sm dark:text-egg dark:bg-shadeMedium'
                }
                {...register('comment')}
              />
              {errors.comment ? (
                <span className="text-grayText dark:text-shadeText font-semibold text-sm cursor-default">
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
                    className="text-cobalt font-semibold text-sm hover:text-sunset"
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
