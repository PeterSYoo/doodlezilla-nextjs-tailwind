import { FaRegEye } from 'react-icons/fa';

export const LoginForm = () => {
  return (
    <>
      <form>
        <div className="flex flex-col gap-3">
          {/* Username */}
          <label className="w-[278px] bg-grayLight py-2 px-4 rounded-full">
            <input
              placeholder="Username"
              type="text"
              className="w-full bg-grayLight focus:outline-none"
            />
          </label>
          {/*  */}
          {/* Password */}
          <label className="w-[278px] bg-grayLight py-2 pl-4 rounded-full flex items-center">
            <input
              placeholder="Password"
              type="text"
              className="w-10/12 bg-grayLight focus:outline-none"
            />
            <FaRegEye className="w-2/12 flex justify-end pr-2 text-xl text-placeholder cursor-pointer hover:text-neutral-800" />
          </label>
          {/*  */}
          {/* Login Button */}
          <button
            type="submit"
            className="py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt w-[278px] text-white font-semibold transition duration-300 ease-in-out hover:animate-button hover:bg-[length:400%_400%] hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3]"
          >
            Login
          </button>
          {/*  */}
        </div>
      </form>
    </>
  );
};
