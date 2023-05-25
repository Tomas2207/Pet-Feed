import Image from 'next/image';
import React from 'react';
import { AiFillHeart, AiFillLike, AiFillPushpin } from 'react-icons/ai';
import { FaComment, FaShareAlt } from 'react-icons/fa';
import { BsPinAngle } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';

type SRC = {
  src: string;
  desc: string;
  open: Function;
};

const ZoomPic = ({ src, desc, open }: SRC) => {
  return (
    <div className="absolute top-0 bg-black bg-opacity-90 h-full w-full z-[99]">
      <div className="w-[29rem] bg-gray-800 sticky right-0 left-0 mx-auto top-[30vh]">
        <div className="shadow-lg shadow-black bg-white p-2">
          <div className="h-[30rem] w-[28rem] relative overflow-hidden">
            <Image src={src} fill className="object-cover" alt="profile" />
          </div>
          <div className="p-4 rounded-b-md ">
            <p className="font-caveat text-3xl">{desc}</p>
            <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 my-4" />
            <div className="flex justify-between my-2">
              <AiFillLike className="z-2 relative text-2xl" />
              <FaShareAlt className="z-2 relative text-2xl" />
              <FaComment className="z-2 relative text-2xl" />
            </div>
          </div>
        </div>
        <RxCrossCircled
          className="absolute top-3 right-3 bg-white text-4xl rounded-full hover:bg-red-600 cursor-pointer transition duration-150"
          onClick={() => open(false)}
        />
      </div>
    </div>
  );
};

export default ZoomPic;
