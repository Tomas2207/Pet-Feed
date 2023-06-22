import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  user: {
    _id: ObjectId;
    name: string;
    image: string;
    description: string;
    following: ObjectId[];
    followers: ObjectId[];
  };
};

const SingleUser = ({ user }: Props) => {
  return (
    <div className="flex gap-2 w-80 mb-4">
      <div className="relative h-14 w-14 rounded-full overflow-hidden">
        <Image src={user.image} fill className="object-cover" alt="profile" />
      </div>
      <div>
        <p className="text-lg font-bold">{user.name}</p>
        <p className="text-neutral-700 mb-2">{user.description}</p>

        <Link href={`/profile/${user._id}`} className="my-auto">
          <button className="rounded-md border border-neutral-700 w-32 h-fi py-2 t my-auto ml-auto">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleUser;
