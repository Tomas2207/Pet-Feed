import Image from 'next/image';
import React from 'react';
import copitoPics from '../../utils/copitoPics.json';
import { TbArrowForwardUp } from 'react-icons/tb';
import { SlOptions } from 'react-icons/sl';

const ExploreProfiles = () => {
  return (
    <div className="h-fit w-[23rem] bg-white px-4 rounded-md sticky top-20 pb-4 shadow-lg shadow-neutral-600">
      <h2 className="font-bold self-start mt-6 mb-6 text-lg text-neutral-500 px-6">
        Explore Profiles
      </h2>
      <div className="flex flex-col justify-around w-full gap-2">
        {copitoPics.map((pic, i) => (
          <div
            key={i}
            className="flex gap-4 relative h-20 rounded-md overflow-hidden hover:h-80 transition-all duration-500 ease-in-out group"
          >
            <Image
              src={pic.picture}
              fill
              className="object-cover absolute"
              alt="explore-profile"
            />
            <div className="z-[50] px-6 self-end pb-4 bg-white w-full group-hover:bg-opacity-80">
              <div className="flex gap-2 items-center mt-4">
                <div className="h-16 w-16 relative">
                  <Image
                    src={pic.picture}
                    fill
                    className="object-cover absolute rounded-full"
                    alt="explore-profile"
                  />
                </div>
                <p className="text-lg font-bold text-neutral-600">Copito</p>
                <SlOptions className="ml-auto mr-0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProfiles;
