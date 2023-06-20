import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Comment as CommentType } from '../../../utils/types';
import { BiDownArrow } from 'react-icons/bi';
import SingleComment from './SingleComment';

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

const Comment = ({ postId, comments }: Props) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentComments, setCurrentComments] = useState<CommentType[]>([]);
  const [moreComments, setMoreComments] = useState(false);

  useEffect(() => {
    if (comments.length > 0) setCurrentComments([...comments].reverse());
  }, []);

  const changeCurentComments = () => {
    setMoreComments(!moreComments);
  };

  const publishComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    console.log(data.newComment.slice(-1)[0]);
    setCurrentComments([...data.newComment].reverse());

    setComment('');
    setLoading(false);
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
        <form className="flex w-full gap-1" onSubmit={(e) => publishComment(e)}>
          <input
            type="text"
            className="border border-neutral-300 flex-1 rounded-md px-2 outline-none"
            placeholder="Add a comment..."
            value={comment}
            readOnly={loading}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={
              !comment || loading
                ? 'bg-teal-600 text-white rounded-md bg-opacity-40 px-1 w-16 flex items-center justify-center'
                : 'bg-teal-600 text-white px-1 rounded-md w-16 flex items-center justify-center'
            }
            disabled={!comment || loading}
            type="submit"
          >
            <BsFillSendFill className="text-xl rotate-45 mr-2" />
          </button>
        </form>
      </div>
      {currentComments.length > 0 ? (
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
          {moreComments ? (
            <div>
              {currentComments!.map((one, i) => (
                <SingleComment key={i} comment={one} />
              ))}
            </div>
          ) : (
            <SingleComment comment={currentComments[0]} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
