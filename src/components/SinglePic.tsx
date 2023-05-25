import Image from 'next/image';
import React from 'react';
import { AiFillLike, AiOutlineHeart } from 'react-icons/ai';
import { FaComment, FaShareAlt } from 'react-icons/fa';

type Props = {
  pic: {
    picture: string;
    description: string;
  };
  changePic: Function;
};

const SinglePic = ({ pic, changePic }: Props) => {
  return (
    <div className="shadow-lg shadow-black bg-white p-2">
      <div className="h-[30rem] w-[28rem] relative overflow-hidden">
        <Image
          src={pic.picture}
          fill
          className="object-cover hover:scale-110 transition duration-150 ease-in-out cursor-pointer"
          alt="profile"
          onClick={() => changePic(pic.picture, pic.description)}
        />
      </div>
      <div className="p-4 rounded-b-md ">
        <p className="font-caveat text-3xl">{pic.description}</p>
        <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 my-4" />
        <div className="flex justify-between my-2">
          <AiFillLike className="z-2 relative text-2xl" />
          <FaShareAlt className="z-2 relative text-2xl" />
          <FaComment className="z-2 relative text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SinglePic;
