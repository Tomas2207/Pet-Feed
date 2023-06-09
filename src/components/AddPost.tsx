import Image from 'next/image';
import React from 'react';
import { MdArticle, MdInsertPhoto } from 'react-icons/md';
import { RiVideoFill } from 'react-icons/ri';
import { FaPollH } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  setOpenNewPost: Function;
};

const AddPost = ({ setOpenNewPost }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreatePostBtn = () => {
    if (session) {
      setOpenNewPost(true);
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className="w-full sm:w-[35rem] flex border gap-2 p-2 mb-6 rounded-md bg-white border-neutral-300">
      <div className="hidden sm:block relative w-16 h-14 rounded-full overflow-hidden">
        <Image
          src={session ? (session.user.image as string) : '/petIcon.png'}
          fill
          className="object-cover"
          alt="post-profile"
        />
      </div>
      <div className="w-full">
        <button
          className="px-2 h-12 border rounded-xl flex-1 bg-teal-600 text-white w-full mt-1 hover:brightness-110 transition duration-150"
          onClick={handleCreatePostBtn}
        >
          Create Post
        </button>
        <div className="flex items-center justify-between my-1 gap-2">
          <div
            onClick={handleCreatePostBtn}
            className="flex items-center mt-2 w-28 h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-700 cursor-pointer hover:bg-opacity-70 group"
          >
            <MdInsertPhoto className="text-4xl text-teal-500 group-hover:scale-75 transition duration-150 ease-in-out" />
            <p className="hidden sm:block ">Photo</p>
          </div>
          <div
            onClick={handleCreatePostBtn}
            className="flex items-center mt-2 w-28 h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-700 cursor-pointer hover:bg-opacity-70 group"
          >
            <RiVideoFill className="text-4xl text-blue-500 group-hover:scale-75 transition duration-150 ease-in-out" />
            <p className="hidden sm:block">Video</p>
          </div>
          <div className="flex items-center mt-2 w-28 h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-700 cursor-pointer hover:bg-opacity-70 group">
            <FaPollH className="text-3xl text-orange-500 group-hover:scale-75 transition duration-150 ease-in-out" />
            <p className="hidden sm:block">Poll</p>
          </div>
          <div className="flex items-center mt-2 w-28 h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-700 cursor-pointer hover:bg-opacity-70 group">
            <MdArticle className="text-4xl text-pink-400 group-hover:scale-75 transition duration-150 ease-in-out" />
            <p className="hidden sm:block">Article</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
