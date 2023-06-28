import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  AiFillDelete,
  AiOutlineLink,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BsFillFlagFill } from 'react-icons/bs';

type Props = {
  id: string;
  setOpenDropdown: Function;
  userId: string;
};

const OptionDropdown = ({ id, setOpenDropdown, userId }: Props) => {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { data: session } = useSession();

  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXTAUTH_URL}/posturl/${id}`);
    setOpenDropdown(false);
    toast.success('Link copied');
  };

  const deletePost = async () => {
    setLoadingDelete(true);
    await fetch(`/api/post/deletePost/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success('Post Deleted');
    router.reload();
  };

  return (
    <div className="bg-neutral-800 flex flex-col text-white items-start text-lg rounded-md overflow-hidden w-48 absolute top-10 right-5 z-[99]">
      {loadingDelete ? (
        <button className="px-2 py-3 hover:bg-neutral-700 w-full text-start flex items-center gap-2">
          <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
        </button>
      ) : (
        <>
          <button
            className="p-2 hover:bg-neutral-700 flex items-center gap-2 w-full"
            onClick={copyLink}
          >
            <AiOutlineLink /> Copy Link
          </button>
          <button className="p-2 hover:bg-neutral-700 w-full text-start flex items-center gap-2">
            <BsFillFlagFill />
            Report
          </button>
          {userId === session.user.id ? (
            <button
              className="p-2 hover:bg-neutral-700 w-full text-start flex items-center gap-2"
              onClick={deletePost}
            >
              <AiFillDelete />
              Delete Post
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default OptionDropdown;
