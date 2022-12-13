import Image from 'next/image';
import { FeedPostCard } from '../../components/feed/FeedPostCard.components';
import { FeedSponsoredCard } from '../../components/feed/FeedSponsoredCard.components';

const FeedPage = () => {
  return (
    <>
      <div className="md:ml-[94px] lg:ml-[213px] flex-grow flex flex-col justify-center items-center gap-5 mt-5 mb-24">
        <FeedPostCard />
        <FeedSponsoredCard />
      </div>
    </>
  );
};

export default FeedPage;
