import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { LoginUsernameErrorModal } from './LoginUsernameErrorModal.components';
import { LoginPasswordErrorModal } from './LoginPasswordErrorModal';

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

  const handleSignin = async (data: any) => {
    const status: any = await signIn('credentials', {
      redirect: false,
      username: data.username.toLowerCase(),
      password: data.password,
      callbackUrl: '/feed',
    });

    if (status.error === 'No user found with that Username!') {
      setIsUsernameErrorModalOpen(true);
    } else if (status.error === 'Wrong password!') {
      setIsPasswordErrorModalOpen(true);
    } else if (status.ok) {
      router.push(status.url);
    }
  };

  const { mutateAsync, isLoading } = useMutation(handleSignin);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
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
              {errors.username.message ===
              'Please Enter Your Username' ? null : (
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
          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading ? true : false}
            className={
              isLoading
                ? 'py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 text-gray-400 font-semibold cursor-pointer'
                : 'py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt w-[278px] text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] cursor-pointer'
            }
          >
            {isLoading ? <LoaderSpinnerInline /> : <>Login</>}
          </button>
          {/*  */}
        </div>
      </form>
    </>
  );
};
