import Image from 'next/image';
import { FeedDoodleCard } from '../../components/feed/FeedDoodleCard.components';
import { FeedSponsoredCard } from '../../components/feed/FeedSponsoredCard.components';

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
