import Image from 'next/image';
import React from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FaComment, FaShareAlt } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

type Props = {
  src: string;
  desc: string;
  open: Function;
};

const ZoomPic = ({ src, desc, open }: Props) => {
  return (
    <div className="absolute top-0 bg-black bg-opacity-90 h-full w-full z-[99]">
      <div className="w-[29rem] bg-gray-800 sticky right-0 left-0 mx-auto top-[20vh]">
        <div className="shadow-lg shadow-black bg-white p-2 rounded-md">
          <div className="flex gap-2 my-4">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden">
              <Image
                fill
                src="/copito.jpeg"
                className="object-cover"
                alt="mini-profile"
              />
            </div>
            <div>
              <h2 className="font-bold">Copito</h2>
              <p className="text-neutral-600">12 Hours Ago</p>
            </div>
            <RxCrossCircled
              className="bg-white text-4xl rounded-full cursor-pointer transition duration-1000 hover:rotate-180 mr-0 ml-auto"
              onClick={() => open(false)}
            />
          </div>
          <p className="text-lg font-light px-2 pb-4">{desc}</p>
          <div className="h-[30rem] w-[28rem] relative rounded-md overflow-hidden">
            <Image src={src} fill className="object-cover" alt="profile" />
          </div>
          <div className="p-4 rounded-b-md ">
            <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 my-4" />
            <div className="flex justify-between my-2 items-center">
              <AiOutlineLike className="z-2 relative text-2xl" />
              <AiOutlineComment className="z-2 relative text-2xl" />
              <BiShareAlt className="z-2 relative text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomPic;
