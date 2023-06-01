import Image from 'next/image';
import React from 'react';
import copitoPics from '../../utils/copitoPics.json';
import { TbArrowForwardUp } from 'react-icons/tb';

const ExploreProfiles = () => {
  return (
    <div className="h-fit w-[23rem] bg-white px-4 rounded-md sticky top-20 pb-4 shadow-lg shadow-neutral-600">
      <h2 className="font-bold self-start mt-6 mb-6 text-lg text-neutral-500">
        Explore Profiles
      </h2>
      <div className="flex flex-col justify-around w-full gap-2">
        {copitoPics.map((pic, i) => (
          <div
            key={i}
            className="flex gap-4 relative h-28 rounded-md overflow-hidden hover:h-80 transition-all duration-500 ease-in-out group"
          >
            <Image
              src={pic.picture}
              fill
              className="object-cover absolute"
              alt="explore-profile"
            />
            <div className="z-[50] px-6 self-end pb-4 bg-neutral-800 w-full bg-opacity-80">
              <p className="font-bold text-lg mt-4 text-white">Copito</p>
              <button className=" pt-2 text-white hidden group-hover:flex items-center  ">
                <TbArrowForwardUp />
                <p className="border-0 hover:border-b border-solid">
                  View Profile
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProfiles;
