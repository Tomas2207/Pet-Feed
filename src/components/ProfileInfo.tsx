import Image from 'next/image';
import React from 'react';

const ProfileInfo = () => {
  return (
    <div className="flex items-center pb-10 mt-2">
      {/* Profile Image */}
      <div className="border-4 border-emerald-600 h-64 w-64 relative flex items-center justify-center rounded-full">
        <div className="h-60 w-60 relative rounded-full overflow-hidden">
          <Image
            src="/copito.jpeg"
            fill
            className="object-cover hover:scale-110 transition duration-150 ease-in-out"
            alt="profile"
          />
        </div>
      </div>
      {/* ------------- */}
      {/* Profile Info */}
      <div className="w-64 text-center flex flex-col gap-2 my-4">
        <p className="text-2xl font-bold ">Copito</p>
        <p>3 Years Old</p>
        <p className="text-neutral-600">
          Likes to bark at strangers at the door, play catch and sleep
        </p>
        {/* Followers */}
        <div className="flex gap-5 text-center justify-center">
          <div>
            <p className="font-bold">Followers</p>
            <p>5000</p>
          </div>
          <div>
            <p className="font-bold">Following</p>
            <p>1000</p>
          </div>
        </div>
        {/* ----------- */}
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
          Follow
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
