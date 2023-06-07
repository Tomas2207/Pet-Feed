import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const SideProfile = () => {
  const { data: session } = useSession();

  let profile;

  if (session) {
  }

  return (
    <div className="h-fit w-[23rem] bg-white px-4 rounded-md sticky top-20 hidden lg:flex flex-col items-center justify-center text-center border border-neutral-300">
      <div className="flex gap-6 mb-4 items-end">
        {session ? (
          <div>
            <p className="text-emerald-600 text-2xl font-bold">5000</p>
            <p>Followers</p>
          </div>
        ) : null}
        {/* Picture */}
        <div className=" border-4 border-emerald-600 mt-6 rounded-full h-32 w-32 flex justify-center items-center">
          <div className="h-28 w-28 relative rounded-full overflow-hidden">
            <Image
              src={session ? (session.user.image as string) : '/petIcon.png'}
              fill
              className="object-cover"
              alt="side-profile"
            />
          </div>
        </div>

        {/* ------------ */}
        {session ? (
          <div>
            <p className="text-emerald-600 text-2xl font-bold">1000</p>
            <p>Following</p>
          </div>
        ) : null}
      </div>
      {session ? (
        <div>
          <h2 className="font-bold text-xl">{session.user.name}</h2>
          <p>3 Years Old</p>
          <p className="text-neutral-600 my-4">{session.user.description}</p>
        </div>
      ) : null}
      <div className="w-full h-[1px] bg-neutral-800 bg-opacity-20 mb-3" />
      <Link
        href={session ? `/profile/${session?.user.id}` : '/api/auth/signin'}
        className="bg-emerald-600 w-full py-3 mb-3 rounded-md text-white"
      >
        {session ? 'My Profile' : 'Sign In'}
      </Link>
    </div>
  );
};

export default SideProfile;
