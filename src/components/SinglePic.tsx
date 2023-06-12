import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import { TbMessageCircle2 } from 'react-icons/tb';
import { BsBookmark } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { Auth, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Comment from './Comment';

TimeAgo.addDefaultLocale(en);

type Author = {
  _id: ObjectId;
  name: string;
  image: string;
};

type Props = {
  pic: {
    _id: ObjectId;
    userId: {
      name: string;
      image: string;
      _id: ObjectId;
    };
    img?: string;
    video?: string;
    description: string;
    createdAt: Date;
    likes: Author[];
    comments: {
      author: Author;
      content: string;
      createdAt: Date;
    }[];
  };
  changePic: Function;
};

const SinglePic = ({ pic, changePic }: Props) => {
  const [liked, setLiked] = useState(false);
  const [imageDimensions, setImageDimensions] = useState();
  const [loading, setLoading] = useState(false);
  console.log(pic);

  const { data: session } = useSession();

  useEffect(() => {
    checkLiked();
  }, [session]);

  const checkLiked = () => {
    setLoading(true);
    if (session) {
      pic.likes.forEach((obj) => {
        if (Object.values(obj).includes(session.user.id)) {
          setLiked(true);
        }
      });
    }
    setLoading(false);
  };

  const likePost = async () => {
    setLoading(true);
    await fetch('/api/post/likes', {
      method: 'POST',
      body: JSON.stringify({
        postId: pic._id,
        likeId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });
    setLoading(false);
    setLiked(true);
  };

  const removeLike = async () => {
    setLoading(true);
    await fetch('/api/post/likes', {
      method: 'PATCH',
      body: JSON.stringify({
        postId: pic._id,
        likeId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });
    setLoading(false);
    setLiked(false);
  };

  return (
    <div className="bg-white rounded-xl w-full sm:w-[35rem] h-fit border border-neutral-300">
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
      {pic.img ? (
        <div className="relative overflow-hidden sm:mx-2 sm:rounded-md">
          <img
            src={pic.img}
            className="object-cover mx-auto"
            alt="post"
            onClick={() => changePic(pic.img, pic.description)}
          />
        </div>
      ) : (
        <div className="h-auto relative overflow-hidden sm:mx-2 sm:rounded-md">
          <video
            src={pic.video!}
            controls
            className="object-cover h-full w-full"
          ></video>
        </div>
      )}
      <div className="p-4 rounded-b-md">
        <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 mb-4" />
        <div className="flex items-center text-2xl">
          <div className="flex justify-start my-2 items-center space-x-5">
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-red-600" />
            ) : (
              <div>
                {liked ? (
                  <AiFillHeart
                    className="z-2 relative text-red-600"
                    onClick={() => removeLike()}
                  />
                ) : (
                  <AiOutlineHeart
                    className="z-2 relative hover:animate-pulse hover:text-red-600 transition-all duration-150"
                    onClick={() => likePost()}
                  />
                )}
              </div>
            )}
            <TbMessageCircle2 className="z-2 relative" />
            <BiShareAlt className="z-2 relative" />
          </div>
          <BsBookmark className="ml-auto text-xl" />
        </div>
      </div>
      <Comment postId={pic._id} comments={pic.comments} />
    </div>
  );
};

export default SinglePic;
