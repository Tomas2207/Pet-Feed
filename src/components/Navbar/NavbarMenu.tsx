import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CgMenuRound } from 'react-icons/cg';

type Props = {
  changeNav: Boolean;
};

const NavbarMenu = ({ changeNav }: Props) => {
  const { data: session } = useSession();

  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div
      className={
        !changeNav
          ? 'flex items-center border-2 border-neutral-500 rounded-full p-1 '
          : 'flex items-center border-2 border-white rounded-full p-1 '
      }
    >
      <div className="relative h-10 w-10 rounded-full overflow-hidden">
        <Image
          src={session?.user.image as string}
          fill
          className="object-cover"
          alt="nav-profile"
        />
      </div>
      <div className={changeNav ? 'text-white' : 'text-neutral-500'}>
        <CgMenuRound
          className={
            !openDropdown
              ? 'text-4xl hover:rotate-90 transition-all duration-150 ease-out cursor-pointer hover:text-teal-600'
              : 'rotate-90 text-4xl cursor-pointer text-teal-600'
          }
          onClick={() => setOpenDropdown(!openDropdown)}
        />
      </div>
      {openDropdown ? (
        <div className="absolute top-20 right-6 xl:right-64 bg-black text-white flex flex-col w-60 rounded-md overflow-hidden">
          <Link
            href="/profile"
            className="pt-4 pb-1 hover:bg-neutral-800 cursor-pointer"
          >
            <div className="flex items-end gap-2 justify-center my-2">
              <div className="h-16 w-16 relative">
                <Image
                  src={session?.user.image as string}
                  fill
                  className="object-cover rounded-md"
                  alt="dropdown profile"
                />
              </div>
              <div>
                <p className="font-bold">{session?.user.name}</p>
                <button className="rounded-md border border-white px-2 py-1">
                  View Profile
                </button>
              </div>
            </div>
          </Link>
          <button
            className="py-4 hover:bg-neutral-800 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarMenu;
