import Image from 'next/image';
import React from 'react';

type Props = {
  setOpenNewPost: Function;
};

const AddPost = ({ setOpenNewPost }: Props) => {
  return (
    <div className="w-[34rem] flex border gap-2 p-2 mb-6 rounded-md bg-white shadow-lg">
      <div className="relative w-14 h-14 rounded-md overflow-hidden">
        <Image
          src="/copito.jpeg"
          fill
          className="object-cover"
          alt="post-profile"
        />
      </div>
      <button
        className="p-2 border rounded-md flex-1 bg-emerald-500 text-white font-bold"
        onClick={() => setOpenNewPost(true)}
      >
        Create Post
      </button>
    </div>
  );
};

export default AddPost;
