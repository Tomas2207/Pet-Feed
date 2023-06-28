import { ObjectId } from 'mongodb';
import React from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFillFlagFill } from 'react-icons/bs';

type Props = {
  id: string;
  setOpenDropdown: Function;
};

const OptionDropdown = ({ id, setOpenDropdown }: Props) => {
  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXTAUTH_URL}/posturl/${id}`);
    setOpenDropdown(false);
    toast.success('Link copied');
  };

  return (
    <div className="bg-neutral-800 flex flex-col text-white items-start text-lg rounded-md overflow-hidden w-48 absolute top-10 right-5">
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
    </div>
  );
};

export default OptionDropdown;
