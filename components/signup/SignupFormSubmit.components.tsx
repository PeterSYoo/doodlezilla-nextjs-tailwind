import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateNewUser from '../../hooks/useCreateNewUser';
import { SignupUsernameErrorModal } from './SignupUsernameErrorModal.components';
import { SignupEmailErrorModal } from './SignupEmailErrorModal.components';
import { SignupSuccessModal } from './SignupSuccessModal.components';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please Enter a Username')
    .min(2, 'Too short!')
    .max(14, 'Too long!')
    .matches(/^[0-9a-zA-Z]+$/, 'Only letters and numbers allowed, no spaces.'),
  email: Yup.string()
    .required('Please Enter Your Email')
    .max(50, 'Too long!')
    .email('Enter a valid email address.'),
  password: Yup.string()
    .required('Please Enter Your Password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
    ),
  cpassword: Yup.string()
    .required('Please Confirm Your Password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});

export const SignupFormSubmit = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isUsernameErrorModalOpen, setIsUsernameErrorModalOpen] =
    useState<boolean>(false);
  const [isEmailErrorModalOpen, setIsEmailErrorModalOpen] =
    useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SignupSchema),
  });

  const { mutateCreateNewUser, isLoadingCreateNewUser } = useCreateNewUser(
    setIsUsernameErrorModalOpen,
    setIsEmailErrorModalOpen,
    setIsSuccessModalOpen
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateCreateNewUser({
      name: data.username.toLowerCase(),
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      {isUsernameErrorModalOpen ||
      isEmailErrorModalOpen ||
      isSuccessModalOpen ? (
        <>
          {isSuccessModalOpen && (
            <SignupSuccessModal setIsSuccessModalOpen={setIsSuccessModalOpen} />
          )}
          {isUsernameErrorModalOpen && (
            <SignupUsernameErrorModal
              setIsUsernameErrorModalOpen={setIsUsernameErrorModalOpen}
            />
          )}
          {isEmailErrorModalOpen && (
            <SignupEmailErrorModal
              setIsEmailErrorModalOpen={setIsEmailErrorModalOpen}
            />
          )}
        </>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          {/* Username */}
          <label
            className={
              errors.username
                ? 'w-[278px] rounded-full border border-red-600 bg-grayLight py-2 px-4'
                : 'w-[278px] rounded-full border border-transparent bg-grayLight py-2 px-4'
            }
          >
            <input
              placeholder="Username"
              type="text"
              className="w-full bg-grayLight focus:outline-none"
              {...register('username')}
            />
          </label>
          {errors.username && (
            <>
              {errors.username.message === 'Please Enter a Username' ? null : (
                <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                  <div className="col-span-1 col-start-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-span-11 col-start-2">
                    <p className="break-all">{errors.username.message}</p>
                  </div>
                </div>
              )}
            </>
          )}
          {/*  */}
          {/* Email */}
          <label
            className={
              errors.email
                ? 'w-[278px] rounded-full border border-red-600 bg-grayLight py-2 px-4'
                : 'w-[278px] rounded-full border border-transparent bg-grayLight py-2 px-4'
            }
          >
            <input
              placeholder="Email"
              type="text"
              className="w-full bg-grayLight focus:outline-none"
              {...register('email')}
            />
          </label>
          {errors.email && (
            <>
              {errors.email.message === 'Please Enter Your Email' ? null : (
                <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                  <div className="col-span-1 col-start-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-span-11 col-start-2">
                    <p className="break-all">{errors.email.message}</p>
                  </div>
                </div>
              )}
            </>
          )}
          {/*  */}
          {/* Password */}
          <label
            className={
              errors.password
                ? 'flex w-[278px] items-center rounded-full border border-red-600 bg-grayLight py-2 px-4'
                : 'flex w-[278px] items-center rounded-full border border-transparent bg-grayLight py-2 px-4'
            }
          >
            <input
              placeholder="Password"
              type={`${showPassword ? 'text' : 'password'}`}
              className="w-11/12 bg-grayLight focus:outline-none"
              {...register('password')}
            />
            <FaRegEye
              onClick={() => setShowPassword(!showPassword)}
              className="flex w-1/12 cursor-pointer justify-end text-xl text-placeholder hover:text-neutral-800"
            />
          </label>
          {errors.password && (
            <>
              {errors.password.message ===
              'Please Enter Your Password' ? null : (
                <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                  <div className="col-span-1 col-start-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-span-11 col-start-2">
                    <p className="break-all">{errors.password.message}</p>
                  </div>
                </div>
              )}
            </>
          )}
          {/*  */}
          {/* Confirm Password */}
          <label
            className={
              errors.cpassword
                ? 'flex w-[278px] items-center rounded-full border border-red-600 bg-grayLight py-2 px-4'
                : 'flex w-[278px] items-center rounded-full border border-transparent bg-grayLight py-2 px-4'
            }
          >
            <input
              placeholder="Confirm Password"
              type={`${showPassword ? 'text' : 'password'}`}
              className="w-11/12 bg-grayLight focus:outline-none"
              {...register('cpassword')}
            />
            <FaRegEye
              onClick={() => setShowPassword(!showPassword)}
              className="flex w-1/12 cursor-pointer justify-end text-xl text-placeholder hover:text-neutral-800"
            />
          </label>
          {errors.cpassword && (
            <>
              {errors.cpassword.message ===
              'Please Confirm Your Password' ? null : (
                <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                  <div className="col-span-1 col-start-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-span-11 col-start-2">
                    <p className="break-all">{errors.cpassword.message}</p>
                  </div>
                </div>
              )}
            </>
          )}
          {/*  */}
          {/* Sign up Button */}
          {errors.username ||
          errors.email ||
          errors.password ||
          errors.cpassword ? (
            <span className="flex cursor-default items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 py-2 px-10 font-semibold text-gray-400">
              Sign up
            </span>
          ) : (
            <button
              type="submit"
              disabled={isLoadingCreateNewUser ? true : false}
              className={
                isLoadingCreateNewUser
                  ? 'flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 py-2 px-10 font-semibold text-gray-400'
                  : 'flex w-[278px] items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-10 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]'
              }
            >
              {isLoadingCreateNewUser ? <LoaderSpinnerInline /> : <>Sign up</>}
            </button>
          )}
          {/*  */}
        </div>
      </form>
    </>
  );
};
