import { FaRegEye } from 'react-icons/fa';

export const LoginForm = () => {
  return (
    <>
      <form>
        <div className="flex flex-col gap-3">
          <label className="w-[278px] bg-grayLight py-2 px-4 rounded-full">
            <input
              placeholder="Username"
              type="text"
              className="w-full bg-grayLight focus:outline-none"
            />
          </label>
          <label className="w-[278px] bg-grayLight py-2 pl-4 rounded-full flex items-center">
            <input
              placeholder="Password"
              type="text"
              className="w-10/12 bg-grayLight focus:outline-none"
            />
            <FaRegEye className="w-2/12 flex justify-end pr-2 text-xl text-placeHolder cursor-pointer hover:text-neutral-800" />
          </label>
          <button
            type="submit"
            className="py-2 px-10 flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt w-[278px] text-white font-semibold hover:from-neutral-800 hover:to-neutral-800"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
