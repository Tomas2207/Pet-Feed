import Image from 'next/image';
import React from 'react';
import {
  AiFillLike,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { FaComment, FaShareAlt } from 'react-icons/fa';
import { BiShareAlt } from 'react-icons/bi';

type Props = {
  pic: {
    picture: string;
    description: string;
  };
  changePic: Function;
};

const SinglePic = ({ pic, changePic }: Props) => {
  return (
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
      </div>
      <p className="text-lg font-light px-2 pb-4">{pic.description}</p>
      <div className="h-[30rem] w-[28rem] relative overflow-hidden rounded-lg">
        <Image
          src={pic.picture}
          fill
          className="object-cover hover:scale-110 transition duration-150 ease-in-out cursor-pointer "
          alt="profile"
          onClick={() => changePic(pic.picture, pic.description)}
        />
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
  );
};

export default SinglePic;
