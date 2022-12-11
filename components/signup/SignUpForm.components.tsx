import { Resolver, useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const resolver: Resolver<FormValues> = async (values: any) => {
  return {
    values:
      values.username || values.email || values.password || values.cpassword
        ? values
        : {},
    errors:
      !values.username || !values.email || !values.password || !values.cpassword
        ? {
            username: {
              type: 'required',
              message: 'This is required.',
            },
            email: {
              type: 'required',
              message: 'This is required.',
            },
            password: {
              type: 'required',
              message: 'This is required.',
            },
            cpassword: {
              type: 'required',
              message: 'This is required.',
            },
          }
        : {},
  };
};

export const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  }: any = useForm<FormValues>({ resolver });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <section className="flex-grow h-full w-full flex flex-col items-center justify-center bg-gray-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              Username:
              <input
                type="text"
                {...register('username', {
                  required: 'Required',
                })}
              />
            </label>
            {errors.username && errors.username.message}
            <label className="flex flex-col gap-2">
              Email:
              <input
                type="text"
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.email && errors.email.message}
            </label>
            <label className="flex flex-col gap-2">
              Password:
              <input type="text" {...register('password')} />
            </label>
            <label className="flex flex-col gap-2">
              Confirm Password:
              <input type="text" {...register('cpassword')} />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-1 rounded-md"
          >
            Sign-Up
          </button>
        </form>
      </section>
    </>
  );
};
