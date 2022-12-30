import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { getSession, signIn } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { SignupFormSubmit } from '../../components/signup/SignupFormSubmit.components';
import { FcGoogle } from 'react-icons/fc';
import { FaUserPlus } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';

const SignUp = () => {
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
        <div className="flex w-[375px] flex-col items-center justify-center gap-3 rounded-[50px] bg-white pt-14 shadow-md shadow-gray-800 md:mx-10 md:grid md:h-full md:max-h-[888px] md:w-full md:min-w-[813px] md:max-w-[1136px] md:grid-cols-2 md:pt-0">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670833562/nudoodle/assets/Nudoodle_gtxp6j.png"
            alt="logo"
            width={195}
            height={52}
            className="md:hidden"
          />
          <div className="md:col-span-1 md:col-start-1">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1671345057/nudoodle/assets/signup-splash_n4bfqy.png"
              alt="logo xl"
              width={562}
              height={888}
              className="hidden rounded-l-[50px] md:block"
            />
          </div>
          <div className="md:col-span-1 md:col-start-2 md:flex md:h-full md:flex-col md:justify-between">
            <div className="flex flex-col gap-5 md:h-full md:items-center md:justify-center">
              <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt">
                <FaUserPlus className="ml-1 text-2xl text-white" />
              </div>
              <div className="flex flex-col gap-3 md:mx-auto">
                {/* Google Sign in */}
                <button
                  onClick={handleGoogleSignin}
                  className="group flex items-center gap-3 rounded-full border border-neutral-300 bg-gradient-to-t from-white to-white py-2 px-10 transition duration-100 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%] hover:text-white md:max-w-[278px]"
                >
                  <FcGoogle className="text-3xl group-hover:hidden" />
                  <AiOutlineGoogle className="hidden text-3xl group-hover:block" />
                  <span className="font-semibold">Sign In with Google</span>
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
                <SignupFormSubmit />
                {/*  */}
                <p className="flex justify-center text-xs text-placeholder">
                  Already have an account?&nbsp;
                  <Link
                    href={'/'}
                    className="text-cobalt hover:text-placeholder"
                  >
                    Login here
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
};

export default SignUp;

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
