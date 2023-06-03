import Image from 'next/image';
import React from 'react';

const SideBanner = () => {
  return (
    <div className="h-[99%] w-[40%] mx-2 rounded-md text-center relative overflow-hidden flex">
      <div className="h-20 w-20 absolute z-[99] top-2 left-2">
        <Image
          src="/logo.png"
          fill
          className="object-cover rounded-md"
          alt="logo"
        />
      </div>
      <div className="relative z-[2] w-[40%] h-full bg-black">
        1
        <Image
          src="/doggy.jpg"
          fill
          className="object-cover z-[1]"
          alt="form dog"
        />
      </div>
      <div className="bg-emerald-600 h-full w-[60%] z-[2] flex justify-center">
        <div className="flex flex-col gap-6 my-60">
          <h2 className="text-5xl font-semibold text-white">
            Start using Pet Feed
          </h2>
          <p className="text-xl text-white">
            Your pet&rsquo;s digital pawprint
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
