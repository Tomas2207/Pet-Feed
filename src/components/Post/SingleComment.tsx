import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { Comment } from '../../../utils/types';

type Props = {
  comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
  return (
    <div className="flex items-end gap-2">
      <Link
        href={`/profile/${comment.author._id}`}
        className="relative h-8 w-8 rounded-md overflow-hidden"
      >
        <Image
          src={comment.author.image}
          className="object-cover"
          fill
          alt="comment author"
        />
      </Link>
      <div className="w-full bg-neutral-200 rounded-md p-2 mt-2">
        <div className="flex justify-between">
          <p className="font-bold">{comment.author.name}</p>
          <p className="text-sm text-neutral-700">
            <ReactTimeAgo date={comment.createdAt} locale="en-US" />
          </p>
        </div>

        <p className="text-neutral-700">{comment.content}</p>
      </div>
    </div>
  );
};

export default SingleComment;
