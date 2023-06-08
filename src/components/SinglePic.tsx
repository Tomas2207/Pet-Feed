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
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import { TbMessageCircle2 } from 'react-icons/tb';
import { BsBookmark, BsBookmarks } from 'react-icons/bs';

TimeAgo.addDefaultLocale(en);

type Props = {
  pic: {
    userId: {
      name: string;
      image: string;
    };
    img: string;
    description: string;
    createdAt: Date;
  };
  changePic: Function;
};

const SinglePic = ({ pic, changePic }: Props) => {
  console.log('pic', pic);

  return (
    <div className="bg-white rounded-xl h-auto w-full sm:w-[35rem] border border-neutral-300">
      <div className="flex gap-2 my-4 p-2">
        <div className="relative h-12 w-12 rounded-xl overflow-hidden">
          <Image
            fill
            src={pic.userId.image}
            className="object-cover"
            alt="mini-profile"
          />
        </div>
        <div>
          <h2 className="font-bold">{pic.userId.name}</h2>
          <p className="text-neutral-600">
            <ReactTimeAgo date={pic.createdAt} locale="en-US" />
          </p>
        </div>
      </div>
      <p className="text-md px-4 pb-4 break-all">{pic.description}</p>
      <div className="h-[32rem] relative overflow-hidden sm:mx-2 sm:rounded-md">
        <Image
          src={pic.img}
          fill
          className="object-cover hover:scale-110 transition duration-150 ease-in-out cursor-pointer"
          alt="profile"
          onClick={() => changePic(pic.img, pic.description)}
        />
      </div>
      <div className="p-4 rounded-b-md">
        <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 mb-4" />
        <div className="flex items-center text-2xl">
          <div className="flex justify-start my-2 items-center space-x-5">
            <AiOutlineHeart className="z-2 relative" />
            <TbMessageCircle2 className="z-2 relative" />
            <BiShareAlt className="z-2 relative" />
          </div>
          <BsBookmark className="ml-auto text-xl" />
        </div>
      </div>
    </div>
  );
};

export default SinglePic;
