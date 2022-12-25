import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { MdSearch, MdClear } from 'react-icons/md';
import useFetchAllUsers from '../../hooks/useFetchAllUsers';
import { LoaderSpinner } from '../LoaderSpinner.components';

type User = {
  _id: string;
  name: string;
  image: string;
};

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { allUsersData, allUsersIsLoading, allUsersIsError } =
    useFetchAllUsers();

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = allUsersData?.filter((user: User) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm]);

  if (allUsersIsLoading) return <LoaderSpinner />;
  if (allUsersIsError) return <>Error</>;

  return (
    <>
      <div
        className={
          searchTerm
            ? 'md:w-full bg-zinc-50 w-[188px] flex items-center gap-4 rounded-full border border-blue-500 px-4 h-[39px]'
            : 'md:w-full bg-zinc-50 w-[188px] flex items-center gap-4 rounded-full border border-grayBorder px-4 h-[39px]'
        }
      >
        {!searchTerm && (
          <MdSearch className="text-placeholder text-3xl lg:text-xl" />
        )}
        {/* Username */}
        <label className="w-full bg-zinc-50 rounded-full border border-transparent">
          <input
            placeholder="Search Users"
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchOnChange(e)}
            className="w-full bg-zinc-50 focus:outline-none"
          />
        </label>
        {/*  */}
        {searchTerm && (
          <MdClear
            onClick={() => setSearchTerm('')}
            className="text-3xl lg:text-xl text-placeholder cursor-pointer"
          />
        )}
      </div>
      {searchTerm && (
        <div className="w-[188px] md:w-[210px] lg:w-[400px] flex gap-4 rounded-md border border-grayBorder px-7 absolute bg-white mt-1 md:mt-[45px] py-5 backdrop-blur-sm bg-opacity-75 flex-col">
          {filteredUsers
            ?.slice()
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .sort(() => Math.random() - 0.5)
            .slice(0, 20)
            .map((user) => (
              <Fragment key={user._id}>
                <div className="flex gap-3">
                  <Link href={`/profile/${user.name}`}>
                    <Image
                      src={
                        user.image
                          ? user.image
                          : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                      }
                      height={25}
                      width={25}
                      alt="user avatar"
                      className="rounded-full"
                    />
                  </Link>
                  <Link href={`/profile/${user.name}`}>
                    <span className="font-semibold">{user.name}</span>
                  </Link>
                </div>
              </Fragment>
            ))}
        </div>
      )}
    </>
  );
};
