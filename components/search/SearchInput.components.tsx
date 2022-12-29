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

  if (false) return <LoaderSpinner />;
  if (allUsersIsError) return <>Error</>;

  return (
    <>
      <div
        className={
          searchTerm
            ? 'md:w-full bg-zinc-50 dark:bg-shadeMedium w-[188px] flex items-center gap-4 rounded-full border border-blue-500 px-4 h-[39px]'
            : 'md:w-full bg-zinc-50 dark:bg-shadeMedium w-[188px] flex items-center gap-4 rounded-full border border-grayBorder dark:border-shadeMedium px-4 h-[39px]'
        }
      >
        {!searchTerm && (
          <MdSearch className="text-placeholder text-3xl lg:text-xl dark:text-egg" />
        )}
        {/* Username */}
        <label className="w-full bg-zinc-50 dark:bg-shadeMedium rounded-full border border-transparent">
          <input
            placeholder="Search Users"
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchOnChange(e)}
            className="w-full bg-zinc-50 dark:bg-shadeMedium focus:outline-none dark:placeholder:text-shadeText dark:text-egg"
          />
        </label>
        {/*  */}
        {searchTerm && (
          <MdClear
            onClick={() => setSearchTerm('')}
            className="text-3xl lg:text-xl text-placeholder cursor-pointer dark:text-egg"
          />
        )}
      </div>
      {searchTerm && (
        <div className="w-[188px] md:w-[245px] lg:w-[420px] flex gap-4 rounded-3xl border border-grayBorder px-7 absolute bg-white dark:bg-midnight dark:border-transparent dark:bg-opacity-90 mt-2.5 md:mt-[50px] py-5 bg-opacity-90 flex-col">
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
                    className="flex gap-3 group items-center"
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
                    <span className="font-semibold dark:text-egg group-dark:hover:text-sunset group-hover:text-sunset">
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
