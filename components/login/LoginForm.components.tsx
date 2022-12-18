import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<Inputs>();

  const handleSignin = async (data: any) => {
    const status: any = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: '/feed',
    });

    if (status?.error! === 'No user found with that Username!') {
      console.error(status.error);
    } else {
      console.error(status.error);
    }

    if (status?.ok) router.push(status?.url!);
  };

  const { mutateAsync, isLoading } = useMutation(handleSignin);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          {/* Username */}
          <label className="w-[278px] bg-grayLight py-2 px-4 rounded-full">
            <input
              placeholder="Username"
              type="text"
              className="w-full bg-grayLight focus:outline-none"
              {...register('username', { required: true, maxLength: 10 })}
            />
          </label>
          {/*  */}
          {/* Password */}
          <label className="w-[278px] bg-grayLight py-2 pl-4 rounded-full flex items-center">
            <input
              placeholder="Password"
              type="text"
              className="w-10/12 bg-grayLight focus:outline-none"
              {...register('password')}
            />
            <FaRegEye className="w-2/12 flex justify-end pr-2 text-xl text-placeholder cursor-pointer hover:text-neutral-800" />
          </label>
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
