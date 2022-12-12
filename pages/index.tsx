import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { LoginForm } from '../components/login/LoginForm.components';

export default function Home() {
  return (
    <>
      <div className="flex-grow h-full flex items-center justify-center bg-gradient-to-tr from-[#5755D3] via-[#D2436C] to-[#F97E1C]">
        <div className="bg-white flex flex-col w-[375px] md:w-full md:max-w-[1136px] justify-center items-center pt-14 rounded-[50px] gap-3 shadow-md shadow-gray-800 md:mx-10 md:max-h-[666px] md:h-full md:grid md:grid-cols-2 md:pt-0">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670833562/nudoodle/assets/Nudoodle_gtxp6j.png"
            alt="logo"
            width={195}
            height={52}
            className="md:hidden"
          />
          <div className="md:col-start-1 md:col-span-1">
            <Image
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1670880059/nudoodle/assets/logo-xl_orn8x3.png"
              alt="logo xl"
              width={562}
              height={667}
              className="hidden md:block rounded-l-[50px]"
            />
          </div>
          <div className="md:col-start-2 md:col-span-1 md:flex md:flex-col md:justify-between md:h-full">
            <div className="flex flex-col gap-5 md:h-full md:items-center md:justify-center">
              <div className="bg-gradient-to-t from-[#5755D3] to-cobalt rounded-full h-[48px] w-[48px] flex justify-center items-center mx-auto">
                <FiLogIn className="text-white text-2xl -ml-1" />
              </div>
              <div className="flex flex-col gap-3 md:mx-auto">
                {/* Google Sign in */}
                <button className="border border-neutral-300 py-2 px-10 flex items-center gap-3 rounded-full hover:bg-neutral-800 hover:text-white md:max-w-[278px]">
                  <FcGoogle className="text-3xl" />
                  <span className="font-semibold">Sign In with Google</span>
                </button>
                {/*  */}
                <div className="flex w-[278px] items-center justify-center">
                  <span className="border-b border-neutral-300 w-5/12 py-2 -mt-4"></span>
                  <span className="w-2/12 flex justify-center text-placeHolder">
                    OR
                  </span>
                  <span className="border-b border-neutral-300 w-5/12 py-2 -mt-4"></span>
                </div>
                {/* Login Form Component */}
                <LoginForm />
                {/*  */}
                <p className="text-xs text-placeHolder flex justify-center">
                  Don&apos;t have an account?&nbsp;
                  <Link
                    href={'/'}
                    className="text-cobalt hover:text-placeHolder"
                  >
                    Register here
                  </Link>
                  .
                </p>
              </div>
            </div>
            <p className="text-xs text-placeHolder flex items-end pt-20 md:pt-0 pb-5 justify-center">
              ©2022 Coded and Designed by Peter Yoo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
