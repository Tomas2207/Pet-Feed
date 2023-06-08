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
    <div className="h-fit w-[23rem] bg-white px-4 rounded-xl sticky top-20 hidden lg:flex flex-col items-center justify-center text-center border border-neutral-300">
      <div className="flex gap-6 mb-4 items-end">
        {session ? (
          <div className="font-bold">
            <p>Followers</p>
            <p className="text-teal-600 text-2xl">5000</p>
          </div>
        ) : null}
        {/* Picture */}

        <div className="h-32 w-32 relative rounded-full overflow-hidden mt-6">
          <Image
            src={session ? (session.user.image as string) : '/petIcon.png'}
            fill
            className="object-cover"
            alt="side-profile"
          />
        </div>

        {/* ------------ */}
        {session ? (
          <div className="font-bold">
            <p>Following</p>
            <p className="text-teal-600 text-2xl">1000</p>
          </div>
        ) : null}
      </div>
      {session ? (
        <div>
          <h2 className="font-bold text-xl">{session.user.name}</h2>
          <p className="text-neutral-600 mt-2 mb-4">
            {session.user.description}
          </p>
        </div>
      ) : null}
      <div className="w-full h-[1px] bg-neutral-800 bg-opacity-20 mb-3" />
      <Link
        href={session ? `/profile/${session?.user.id}` : '/api/auth/signin'}
        className="bg-teal-600 w-full py-3 mb-3 rounded-xl text-white"
      >
        {session ? 'My Profile' : 'Sign In'}
      </Link>
    </div>
  );
};

export default SideProfile;
