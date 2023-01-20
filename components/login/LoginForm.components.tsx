import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useHandleSignin from '../../hooks/useHandleSignin';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import { LoginUsernameErrorModal } from './LoginUsernameErrorModal.components';
import { LoginPasswordErrorModal } from './LoginPasswordErrorModal';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, 'too long!')
    .required('Please Enter Your Username')
    .matches(/^[0-9a-zA-Z]+$/, 'Only letters and numbers allowed, no spaces.'),
  password: Yup.string()
    .required('Please Enter Your Password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
    ),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isUsernameErrorModalOpen, setIsUsernameErrorModalOpen] =
    useState<boolean>(false);
  const [isPasswordErrorModalOpen, setIsPasswordErrorModalOpen] =
    useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(LoginSchema) });

  const { mutateHandleSignin, isLoadingHandleSignin } = useHandleSignin(
    signIn,
    setIsUsernameErrorModalOpen,
    setIsPasswordErrorModalOpen,
    router
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateHandleSignin(data);
  };

  const handleGuestSignin = async () => {
    await mutateHandleSignin({
      username: 'Guest',
      password: 'Abcd1234!',
    });
  };

  return (
    <>
      {isUsernameErrorModalOpen || isPasswordErrorModalOpen ? (
        <>
          {isUsernameErrorModalOpen && (
            <LoginUsernameErrorModal
              setIsUsernameErrorModalOpen={setIsUsernameErrorModalOpen}
            />
          )}
          {isPasswordErrorModalOpen && (
            <LoginPasswordErrorModal
              setIsPasswordErrorModalOpen={setIsPasswordErrorModalOpen}
            />
          )}
        </>
      ) : null}
      {/* Guest Sign in */}
      {isLoadingHandleSignin ? (
        <button
          disabled={true}
          className="group flex items-center gap-3 rounded-full border border-neutral-300 bg-gradient-to-t from-white to-white py-2 px-10 transition duration-100 ease-in-out md:max-w-[278px] justify-center"
        >
          <BiUser className="text-2xl group-hover:hidden" />
          <BiUser className="hidden text-2xl group-hover:block" />
          <span className="font-semibold">Sign in as Guest</span>
        </button>
      ) : (
        <button
          onClick={handleGuestSignin}
          className="group flex items-center gap-3 rounded-full border border-neutral-300 bg-gradient-to-t from-white to-white py-2 px-10 transition duration-100 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%] hover:text-white md:max-w-[278px] justify-center"
        >
          <BiUser className="text-2xl group-hover:hidden" />
          <BiUser className="hidden text-2xl group-hover:block" />
          <span className="font-semibold">Sign in as Guest</span>
        </button>
      )}
      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mt-3">
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
              {errors.username.message ===
              'Please Enter Your Username' ? null : (
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
          {/* Login Button */}
          {errors.username || errors.password ? (
            <span className="flex cursor-default items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 py-2 px-10 font-semibold text-gray-400">
              Login
            </span>
          ) : (
            <button
              type="submit"
              disabled={isLoadingHandleSignin ? true : false}
              className={
                isLoadingHandleSignin
                  ? 'flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 py-2 px-10 font-semibold text-gray-400'
                  : 'flex w-[278px] cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-10 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]'
              }
            >
              {isLoadingHandleSignin ? <LoaderSpinnerInline /> : <>Login</>}
            </button>
          )}
          {/*  */}
        </div>
      </form>
    </>
  );
};
