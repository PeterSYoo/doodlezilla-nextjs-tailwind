import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchAllUsers from '../../hooks/useFetchAllUsers';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { MdSearch, MdClear } from 'react-icons/md';

type User = {
  _id: string;
  name: string;
  image: string;
};

export const SearchInput = () => {
  // States ------------------------------------------------------------- ***
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { allUsersData, allUsersIsLoading, allUsersIsError } =
    useFetchAllUsers();

  // Custom Functions ---------------------------------------------------- ***
  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    const filtered = allUsersData?.filter((user: User) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm]);

  // JSX ------------------------------------------------------------------ ***
  if (false) return <LoaderSpinner />;
  if (allUsersIsError) return <>Error</>;

  return (
    <>
      <div
        className={
          searchTerm
            ? 'flex h-[39px] w-[188px] items-center gap-4 rounded-full border border-blue-500 bg-zinc-50 px-4 dark:bg-shadeMedium md:w-full'
            : 'flex h-[39px] w-[188px] items-center gap-4 rounded-full border border-grayBorder bg-zinc-50 px-4 dark:border-shadeMedium dark:bg-shadeMedium md:w-full'
        }
      >
        {!searchTerm && (
          <MdSearch className="text-3xl text-placeholder dark:text-egg lg:text-xl" />
        )}
        {/* Username */}
        <label className="w-full rounded-full border border-transparent bg-zinc-50 dark:bg-shadeMedium">
          <input
            placeholder="Search Users"
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchOnChange(e)}
            className="w-full bg-zinc-50 focus:outline-none dark:bg-shadeMedium dark:text-egg dark:placeholder:text-shadeText"
          />
        </label>
        {/*  */}
        {searchTerm && (
          <MdClear
            onClick={() => setSearchTerm('')}
            className="cursor-pointer text-3xl text-placeholder dark:text-egg lg:text-xl"
          />
        )}
      </div>
      {searchTerm && (
        <div className="absolute mt-2.5 flex w-[188px] flex-col gap-4 rounded-3xl border border-grayBorder bg-white bg-opacity-90 px-7 py-5 dark:border-transparent dark:bg-midnight dark:bg-opacity-90 md:mt-[50px] md:w-[245px] lg:w-[420px]">
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
                <div className="flex">
                  <Link
                    href={`/profile/${user.name}`}
                    className="group flex items-center gap-3"
                  >
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
                    <span className="group-dark:hover:text-sunset font-semibold group-hover:text-sunset dark:text-egg">
                      {user.name}
                    </span>
                  </Link>
                </div>
              </Fragment>
            ))}
        </div>
      )}
    </>
  );
};
