import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { FeedDoodleCard } from '../../components/feed/FeedDoodleCard.components';
import { FeedSponsoredCard } from '../../components/feed/FeedSponsoredCard.components';
import { authOptions } from '../api/auth/[...nextauth]';

const FeedPage = () => {
  return (
    <>
      <div className="md:ml-[94px] md:mr-[159px] lg:ml-[213px] lg:mr-[258px] flex-grow flex flex-col justify-center items-center gap-5 mt-24 mb-32 md:justify-start">
        <h1 className="hidden font-bold text-2xl md:flex justify-start md:w-[474px] lg:w-[733px] md:mt-5">
          Feed
        </h1>
        <FeedDoodleCard />
        <FeedSponsoredCard />
        <FeedDoodleCard />
        <FeedDoodleCard />
      </div>
    </>
  );
};

export default FeedPage;

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
