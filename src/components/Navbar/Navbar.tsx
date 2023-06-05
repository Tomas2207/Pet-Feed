import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgMenuRound } from 'react-icons/cg';
import { MdOutlinePets } from 'react-icons/md';
import NavbarMenu from './NavbarMenu';
import {
  AiFillBell,
  AiFillHeart,
  AiFillHome,
  AiFillMessage,
  AiOutlineBell,
  AiOutlineMessage,
} from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { signIn, useSession } from 'next-auth/react';

const Navbar = () => {
  const [changeNav, setChangeNav] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 100 ? setChangeNav(true) : setChangeNav(false);
  };

  const { data: session } = useSession();

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
  }, []);

  return (
    <div
      className={
        !changeNav
          ? 'flex justify-between w-screen items-center sticky top-0 z-[99] bg-white py-2 shadow-lg px-[15rem]'
          : 'flex justify-between w-screen items-center sticky top-0 z-[99] bg-neutral-800 py-2 shadow-lg px-[15rem]'
      }
    >
      {/* ---Right------ */}
      <Link
        href="/"
        className="flex items-end font-bold relative h-12 w-12 overflow-hidden rounded-md"
      >
        <Image src="/logo.png" fill alt="logo" className="object-cover" />
      </Link>
      {/* -------------- */}

      {/* -----Middle------ */}

      <div className="text-3xl flex space-x-2 text-neutral-500 flex-1 mx-12 justify-around items-center">
        <Link href="/">
          <AiFillHome
            className={
              !changeNav
                ? 'hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
                : 'text-white hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
            }
          />
        </Link>

        <AiFillMessage
          className={
            !changeNav
              ? 'hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
              : 'text-white hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
          }
        />
        <AiFillHeart
          className={
            !changeNav
              ? 'hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
              : 'text-white hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
          }
        />
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            className="border-2 rounded-md text-lg px-2 w-[30rem] py-1 outline-none"
            placeholder="search..."
          />
          <FiSearch />
        </div>
      </div>

      {/* ----------------- */}
      {/* --- left ------ */}
      {session ? (
        <div className="flex items-center justify-center mr-2 gap-2">
          <div className="relative">
            <p className="absolute right-[-5px] top-[-5px] bg-emerald-600 rounded-full px-2 text-white">
              0
            </p>
            <AiFillBell
              className={
                !changeNav
                  ? 'text-4xl text-neutral-500 hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
                  : 'text-4xl text-white hover:text-emerald-600 transition-all duration-150 cursor-pointer ease-in-out'
              }
            />
          </div>
          <NavbarMenu changeNav={changeNav} />
        </div>
      ) : (
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-md"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
