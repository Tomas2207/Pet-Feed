import TimeAgo from 'javascript-time-ago';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import ReactTimeAgo from 'react-time-ago';
import { Comment as CommentType } from '../../../utils/types';

import { BiDownArrow } from 'react-icons/bi';

type Props = {
  postId: ObjectId;
  comments: {
    author: {
      _id: ObjectId;
      name: string;
      image: string;
    };
    createdAt: Date;
    content: string;
  }[];
  fetchPosts: Function;
};

const Comment = ({ postId, comments, fetchPosts }: Props) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentComments, setCurrentComments] = useState<CommentType[]>([
    comments.slice(-1)[0],
  ]);
  const [moreComments, setMoreComments] = useState(false);

  const changeCurentComments = () => {
    let copyComments = [...comments];
    if (!moreComments) {
      console.log(moreComments);
      setCurrentComments([...comments].reverse());
    } else {
      setCurrentComments([copyComments.slice(-1)[0]]);
      console.log(moreComments);
    }
    setMoreComments(!moreComments);
  };

  const router = useRouter();

  const publishComment = async () => {
    setLoading(true);
    const res = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
        author: session?.user.id,
        content: comment,
      }),
      headers: { 'Content-type': 'application/json' },
    });

    const data = await res.json();
    if (moreComments) {
      setCurrentComments(data.newComment.reverse());
    } else {
      setCurrentComments([data.newComment.slice(-1)[0]]);
    }

    console.log(data);

    setComment('');
    setLoading(false);
    fetchPosts();
  };

  return (
    <div className="w-full px-2 pb-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="h-12 w-12 relative rounded-md overflow-hidden">
          <Image
            src={session?.user.image as string}
            fill
            className="object-cover"
            alt="comment"
          />
        </div>
        <input
          type="text"
          className="border border-neutral-300 flex-1 rounded-md px-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={
            !comment || loading
              ? 'bg-teal-600 text-white rounded-md bg-opacity-40 px-1 w-16 flex items-center justify-center'
              : 'bg-teal-600 text-white px-1 rounded-md w-16 flex items-center justify-center'
          }
          disabled={!comment || loading}
          onClick={() => publishComment()}
        >
          <BsFillSendFill className="text-xl rotate-45 mr-2" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {!moreComments ? (
          <button
            className="text-neutral-700 px-1 flex items-center"
            onClick={changeCurentComments}
          >
            Show All Comments
            <BiDownArrow />
          </button>
        ) : (
          <button
            className="text-neutral-700 px-1 flex items-center"
            onClick={changeCurentComments}
          >
            Show Last Comment
            <BiDownArrow className="rotate-180" />
          </button>
        )}
        {currentComments!.reverse().map((one, i) => (
          <div key={i} className="flex items-end gap-2">
            <Link
              href={`/profile/${one.author._id}`}
              className="relative h-8 w-8 rounded-md overflow-hidden"
            >
              <Image
                src={one.author.image}
                className="object-cover"
                fill
                alt="comment author"
              />
            </Link>
            <div className="w-full bg-neutral-200 rounded-md p-2 mt-2">
              <div className="flex justify-between">
                <p className="font-bold">{one.author.name}</p>
                <p className="text-sm text-neutral-700">
                  <ReactTimeAgo date={one.createdAt} locale="en-US" />
                </p>
              </div>

              <p className="text-neutral-700">{one.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
