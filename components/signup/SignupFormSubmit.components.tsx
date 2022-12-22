import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SignupUsernameErrorModal } from './SignupUsernameErrorModal.components';
import { SignupEmailErrorModal } from './SignupEmailErrorModal.components';
import { SignupSuccessModal } from './SignupSuccessModal.components';

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

  const handlePostRequest = async (data: any) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.username.toLowerCase(),
        email: data.email,
        password: data.password,
      }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
      options
    ).then((response) =>
      response.json().then((data) => {
        if (response.status === 422) {
          if (data.message === 'Username already exists!') {
            setIsUsernameErrorModalOpen(true);
          } else if (data.message === 'Email already exists!') {
            setIsEmailErrorModalOpen(true);
          }
        } else {
          setIsSuccessModalOpen(true);
        }
      })
    );
  };

  const { mutateAsync, isLoading } = useMutation(handlePostRequest);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
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
                ? 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-red-600'
                : 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-transparent'
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
                <div className="text-red-600 text-xs -mt-2 max-w-[260px] mx-auto grid grid-cols-12">
                  <div className="col-start-1 col-span-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-start-2 col-span-11">
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
                ? 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-red-600'
                : 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-transparent'
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
                <div className="text-red-600 text-xs -mt-2 max-w-[260px] mx-auto grid grid-cols-12">
                  <div className="col-start-1 col-span-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-start-2 col-span-11">
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
                ? 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-red-600 flex items-center'
                : 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-transparent flex items-center'
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
              className="w-1/12 flex justify-end text-xl text-placeholder cursor-pointer hover:text-neutral-800"
            />
          </label>
          {errors.password && (
            <>
              {errors.password.message ===
              'Please Enter Your Password' ? null : (
                <div className="text-red-600 text-xs -mt-2 max-w-[260px] mx-auto grid grid-cols-12">
                  <div className="col-start-1 col-span-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-start-2 col-span-11">
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
                ? 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-red-600 flex items-center'
                : 'w-[278px] bg-grayLight py-2 px-4 rounded-full border border-transparent flex items-center'
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
              className="w-1/12 flex justify-end text-xl text-placeholder cursor-pointer hover:text-neutral-800"
            />
          </label>
          {errors.cpassword && (
            <>
              {errors.cpassword.message ===
              'Please Confirm Your Password' ? null : (
                <div className="text-red-600 text-xs -mt-2 max-w-[260px] mx-auto grid grid-cols-12">
                  <div className="col-start-1 col-span-1">
                    <BsFillExclamationCircleFill className="mt-0.5" />
                  </div>
                  <div className="col-start-2 col-span-11">
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
            <span className="py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 text-gray-400 font-semibold cursor-default">
              Sign up
            </span>
          ) : (
            <button
              type="submit"
              disabled={isLoading ? true : false}
              className={
                isLoading
                  ? 'py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 text-gray-400 font-semibold'
                  : 'py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt w-[278px] text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]'
              }
            >
              {isLoading ? <LoaderSpinnerInline /> : <>Sign up</>}
            </button>
          )}
          {/*  */}
        </div>
      </form>
    </>
  );
};
