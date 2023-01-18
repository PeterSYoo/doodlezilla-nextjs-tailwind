import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { LoginForm } from '../components/login/LoginForm.components';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';

export default function Home() {
  /* Google Handler Function */
  const handleGoogleSignin = async () => {
    signIn('google', {
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
    });
  };
  /*  */

  return (
    <>
      <div className="flex h-full flex-grow items-center justify-center bg-gradient-to-tr from-[#5755D3] via-[#D2436C] to-[#F97E1C]">
        <div className="flex w-[375px] flex-col items-center justify-center gap-3 rounded-[50px] bg-white pt-14 shadow-md shadow-gray-800 md:mx-10 md:grid md:h-full md:max-h-[666px] md:w-full md:max-w-[1136px] md:grid-cols-2 md:pt-0">
          {/* Logo for Mobile */}
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670833562/nudoodle/assets/Nudoodle_gtxp6j.png"
            alt="logo"
            width={195}
            height={52}
            className="md:hidden"
          />
          {/*  */}
          {/* Logo & Image for Desktop */}
          <div className="md:col-span-1 md:col-start-1">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670880059/nudoodle/assets/logo-xl_orn8x3.png"
              alt="logo xl"
              width={562}
              height={667}
              className="hidden rounded-l-[50px] md:block"
            />
          </div>
          {/*  */}
          <div className="md:col-span-1 md:col-start-2 md:flex md:h-full md:flex-col md:justify-between">
            <div className="flex flex-col gap-5 md:h-full md:items-center md:justify-center">
              <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt">
                <FiLogIn className="-ml-1 text-2xl text-white" />
              </div>
              <div className="flex flex-col gap-3 md:mx-auto">
                {/* Google Sign in */}
                <button
                  onClick={handleGoogleSignin}
                  className="group flex items-center gap-3 rounded-full border border-neutral-300 bg-gradient-to-t from-white to-white py-2 px-10 transition duration-100 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%] hover:text-white md:max-w-[278px]"
                >
                  <FcGoogle className="text-3xl group-hover:hidden" />
                  <AiOutlineGoogle className="hidden text-3xl group-hover:block" />
                  <span className="font-semibold">Sign in With Google</span>
                </button>
                {/*  */}
                <div className="flex w-[278px] items-center justify-center">
                  <span className="-mt-4 w-5/12 border-b border-neutral-300 py-2"></span>
                  <span className="flex w-2/12 justify-center text-placeholder">
                    OR
                  </span>
                  <span className="-mt-4 w-5/12 border-b border-neutral-300 py-2"></span>
                </div>
                {/* Login Form Component */}
                <LoginForm />
                {/*  */}
                <p className="flex justify-center text-xs text-placeholder">
                  Don&apos;t have an account?&nbsp;
                  <Link
                    href={'/signup'}
                    className="text-cobalt hover:text-placeholder"
                  >
                    Register here
                  </Link>
                  .
                </p>
              </div>
            </div>
            <p className="flex items-end justify-center pt-20 pb-5 text-xs text-placeholder md:pt-0">
              ©2022 Coded and Designed by Peter Yoo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/feed',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
