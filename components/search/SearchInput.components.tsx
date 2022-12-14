import { useState } from 'react';
import { MdSearch, MdClear } from 'react-icons/md';

export const SearchInput = () => {
  const [hasValue, setHasValue] = useState('');

  return (
    <>
      <form className="md:w-full bg-zinc-50 w-[188px] flex items-center gap-4 rounded-full border border-grayBorder px-4 h-[39px]">
        {!hasValue && <MdSearch className="text-placeholder text-xl" />}
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setHasValue(e.target.value)}
          className="bg-zinc-50 focus:outline-none w-full"
        />
        {hasValue && (
          <MdClear className="text-xl text-placeholder cursor-pointer" />
        )}
      </form>
    </>
  );
};
