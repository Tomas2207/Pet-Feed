import Image from 'next/image';
import React from 'react';
import copitoPics from '../../utils/copitoPics.json';
import { TbArrowForwardUp } from 'react-icons/tb';

const SideProfile = () => {
  return (
    <div className="h-fit w-[23rem] bg-white px-4 rounded-md sticky top-20 flex flex-col items-center justify-center text-center shadow-lg shadow-neutral-600">
      <div className="border border-black h-24 w-24 flex items-center justify-center mt-4 rounded-full">
        <div className="h-20 w-20 relative rounded-full overflow-hidden">
          <Image
            src="/copito.jpeg"
            fill
            className="object-cover"
            alt="side-profile"
          />
        </div>
      </div>
      <h2 className="font-bold text-xl mt-2">Copito</h2>
      <p>3 Years Old</p>
      <p className="text-neutral-600 mb-4">
        Likes to bark at strangers at the door, play catch and sleep
      </p>
      <div className="flex gap-6 mb-4 font-bold">
        <div>
          <p className="text-emerald-600 text-3xl">5000</p>
          <p>Followers</p>
        </div>
        <div>
          <p className="text-emerald-600 text-3xl">1000</p>
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};

export default SideProfile;
