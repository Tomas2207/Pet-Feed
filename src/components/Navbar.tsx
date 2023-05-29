import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgMenuRound } from 'react-icons/cg';
import { MdOutlinePets } from 'react-icons/md';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [changeNav, setChangeNav] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 100 ? setChangeNav(true) : setChangeNav(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
  }, []);

  return (
    <div
      className={
        !changeNav
          ? 'flex justify-between w-screen items-center sticky top-0 z-[99] bg-white py-2 shadow-lg px-[12rem]'
          : 'flex justify-between w-screen items-center sticky top-0 z-[99] bg-neutral-800 py-2 shadow-lg px-[12rem]'
      }
    >
      <div className="flex items-end font-bold">
        <MdOutlinePets
          className={
            !changeNav
              ? 'text-5xl rotate-45 mx-4'
              : 'text-5xl rotate-45 mx-4 text-white'
          }
        />
        <h2 className={!changeNav ? 'ml-[-1rem]' : 'ml-[-1rem] text-white'}>
          PetFeed
        </h2>
      </div>
      <div
        className={
          !changeNav
            ? 'flex items-center border-2 border-black rounded-full p-1 mt-2 mr-2'
            : 'flex items-center border-2 border-white rounded-full p-1 mt-2 mr-2'
        }
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src="/copito.jpeg"
            fill
            className="object-cover"
            alt="nav-profile"
          />
        </div>
        <div className={changeNav ? 'text-white' : ''}>
          <CgMenuRound
            className={
              !openDropdown
                ? 'text-4xl hover:rotate-90 transition duration-150 ease-out cursor-pointer'
                : 'rotate-90 text-4xl cursor-pointer'
            }
            onClick={() => setOpenDropdown(!openDropdown)}
          />
        </div>
        {openDropdown ? (
          <div className="absolute top-16 right-52 bg-black text-white flex flex-col w-60 rounded-md overflow-hidden">
            <Link
              href="/"
              className="py-4 hover:bg-neutral-800 cursor-pointer text-center"
            >
              Home
            </Link>

            <Link
              href="/profile"
              className="py-4 hover:bg-neutral-800 cursor-pointer text-center"
            >
              Profile
            </Link>
            <button className="py-4 hover:bg-neutral-800 cursor-pointer">
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
