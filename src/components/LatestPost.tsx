import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Author, Comment } from '../../utils/types';
import { AiFillHeart } from 'react-icons/ai';
import { SlOptions } from 'react-icons/sl';

type Post = {
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
  comments: Comment[];
};

type Posts = {
  posts: {
    _id: ObjectId;
    userId: Author;
    img: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    likes: Author[];

    comments: Comment[];
  }[];
};

const LatestPost = ({ posts }: Posts) => {
  const { data: session } = useSession();
  const [currentLastPost, setCurrentLastPost] = useState<Post | undefined>();

  useEffect(() => {
    const getLastPost = async () => {
      if (session) {
        const res = await fetch(`/api/post/latestPost/${session?.user.id}`);
        const data = await res.json();
        console.log(data.lastPost);
        setCurrentLastPost(data.lastPost);
      }
    };
    getLastPost();
  }, [session, posts]);

  return (
    <div className="h-fit w-[23rem] bg-white px-4 rounded-xl hidden lg:flex flex-col border border-neutral-300 mt-2">
      <div className="my-4 flex items-center">
        <h3 className="text-xl font-bold text-neutral-500">Latest Post</h3>
        <SlOptions className="ml-auto" />
      </div>
      {currentLastPost ? (
        <div>
          {currentLastPost.img ? (
            <div className="h-80 w-80 relative rounded-md overflow-hidden mx-auto">
              <Image
                src={currentLastPost.img as string}
                alt="post"
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          {currentLastPost.video ? (
            <div className="h-auto relative overflow-hidden sm:mx-2 sm:rounded-md">
              <video
                src={currentLastPost.video!}
                controls
                className="object-cover h-full w-full"
              ></video>
            </div>
          ) : null}
          <div className="flex items-center gap-2 my-2 mx-2">
            <div className="h-8 w-8 relative rounded-full overflow-hidden">
              <Image
                src={currentLastPost?.userId.image as string}
                fill
                className="object-cover"
                alt="author"
              />
            </div>
            <p className="text-lg font-bold">{currentLastPost?.userId.name}</p>
            <div className="ml-auto flex items-center">
              <AiFillHeart className="text-red-600 text-xl" />
              <p className="text-neutral-700">
                {currentLastPost?.likes.length}
              </p>
            </div>
          </div>
          <p className="text-neutral-700 mx-2 mb-2">
            {currentLastPost.description.length > 250 ? (
              <p>{currentLastPost?.description.substring(0, 100)} ...</p>
            ) : (
              <p>{currentLastPost?.description}</p>
            )}
          </p>
        </div>
      ) : (
        <div className="text-neutral-500 mt-12 mb-16 mx-auto">
          You haven&lsquo;t made any posts yet
        </div>
      )}
    </div>
  );
};

export default LatestPost;
