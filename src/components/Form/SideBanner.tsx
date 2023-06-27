import Image from 'next/image';
import React from 'react';

const SideBanner = () => {
  return (
    <div className="h-[97%] w-[40%] rounded-md text-center relative overflow-hidden hidden lg:flex m-2">
      <div className="h-20 w-20 absolute z-[99] top-4 left-2">
        <Image
          src="/app-logo.png"
          fill
          className="object-cover rounded-md"
          alt="logo"
        />
      </div>
      <div className="relative w-full h-full bg-black">
        1
        <Image
          src="/doggy.jpg"
          fill
          className="object-cover z-[1]"
          alt="form dog"
        />
      </div>
      <div className="bg-neutral-800 absolute bottom-0 w-full h-full z-[98] bg-opacity-40">
        <div className="bg-gradient-to-b from-transparent via-teal-500 to-teal-600 w-full h-80 z-[2] flex justify-center absolute bottom-0">
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-5xl font-semibold text-white">
              Start using Pet Feed
            </h2>
            <p className="text-xl text-white">
              Your pet&rsquo;s digital pawprint
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
