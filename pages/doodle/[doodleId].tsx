import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { DoodleCard } from '../../components/doodle/DoodleCard.components';
import { authOptions } from '../api/auth/[...nextauth]';

const DoodleIdPage = () => {
  return (
    <>
      <div className="md:ml-[94px] lg:ml-[213px] flex-grow flex flex-col items-center gap-5 mt-24 mb-32 md:justify-start">
        <DoodleCard />
      </div>
    </>
  );
};

export default DoodleIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
