import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Auth, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLink,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { TbMessageCircle2, TbMessageCircle2Filled } from 'react-icons/tb';
import {
  BsBookmark,
  BsBookmarkFill,
  BsFillBookmarkFill,
  BsFillFlagFill,
} from 'react-icons/bs';
import Image from 'next/image';
import CommentSection from './CommentSection';
import { Comment } from '../../../utils/types';
import { SlOptions } from 'react-icons/sl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OptionDropdown from './OptionDropdown';
import { toast } from 'react-hot-toast';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import ShareSection from './ShareSection';
import { Comment as CommentType } from '../../../utils/types';
import Description from './Description';

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
    comments: Comment[];
  };
  fetchPosts: Function;
  changePic: Function;
};

const SinglePic = ({ pic, changePic, fetchPosts }: Props) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [postLikes, setPostLikes] = useState([...pic.likes]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [currentComments, setCurrentComments] = useState<CommentType[]>([]);

  const [displayComments, setDisplayComments] = useState(false);

  const { data: session, update } = useSession();

  const router = useRouter();

  useEffect(() => {
    checkLiked();
  }, [session, pic, fetchPosts]);

  useEffect(() => {
    checkSaved();
  }, [session, pic]);

  useEffect(() => {
    setPostLikes([...pic.likes]);
  }, [pic]);

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

  const checkSaved = () => {
    setLoadingSave(true);
    if (session) {
      if (session.user.savedPosts.includes(pic._id.toString())) {
        setSaved(true);
        console.log('it does');
      } else {
        setSaved(false);
      }
    }
    setLoadingSave(false);
  };

  const savePost = async () => {
    if (session) {
      setLoadingSave(true);
      const res = await fetch('/api/post/save', {
        method: 'POST',
        body: JSON.stringify({
          postId: pic._id,
          userId: session?.user.id,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const data = await res.json();
      console.log(data);
      update({
        user: {
          ...session?.user,
          savedPosts: data.userAddPost.savedPosts,
        },
      });

      setLoadingSave(false);
      setSaved(true);
      toast.success('Post Saved');
    } else {
      router.push('/signin');
    }
  };

  const likePost = async () => {
    if (session) {
      setLoading(true);
      const res = await fetch('/api/post/likes', {
        method: 'POST',
        body: JSON.stringify({
          postId: pic._id,
          likeId: session?.user.id,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const data = await res.json();
      setPostLikes(data.likes);
      setLoading(false);
      setLiked(true);
    } else {
      router.push('/signin');
    }
  };

  const removeSavedPost = async () => {
    setLoadingSave(true);
    const res = await fetch('/api/post/save', {
      method: 'PATCH',
      body: JSON.stringify({
        postId: pic._id,
        userId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });

    const data = await res.json();
    console.log(data);
    update({
      user: {
        ...session?.user,
        savedPosts: data.userRemovePost.savedPosts,
      },
    });
    // update({ ['user.savedPosts']: data.userRemovePost.savedPosts });
    setLoadingSave(false);
    setSaved(false);
    toast.success('Post Removed');
  };

  const removeLike = async () => {
    setLoading(true);
    const res = await fetch('/api/post/likes', {
      method: 'PATCH',
      body: JSON.stringify({
        postId: pic._id,
        likeId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });
    const data = await res.json();
    setPostLikes(data.likes);
    setLoading(false);
    setLiked(false);
  };

  return (
    <div className="bg-white rounded-xl w-full sm:w-[35rem] h-fit border border-neutral-300 relative">
      <div className="flex gap-2 my-4 p-2">
        <Link
          href={`/profile/${pic.userId._id}`}
          className="relative h-12 w-12 rounded-xl overflow-hidden"
        >
          <Image
            fill
            src={pic.userId.image}
            className="object-cover"
            alt="mini-profile"
          />
        </Link>
        <div>
          <h2 className="font-bold">{pic.userId.name}</h2>
          <p className="text-neutral-600">
            <ReactTimeAgo date={pic.createdAt} locale="en-US" />
          </p>
        </div>
        <SlOptions
          className="ml-auto text-xl mr-2 cursor-pointer"
          onClick={() => setOpenDropdown(!openDropdown)}
        />
        {openDropdown ? (
          <OptionDropdown
            id={pic._id.toString()}
            setOpenDropdown={setOpenDropdown}
            userId={pic.userId._id.toString()}
          />
        ) : null}
      </div>
      {/* <p className="text-md px-4 pb-4 break-all">{pic.description}</p> */}
      <Description description={pic.description} />
      {pic.img ? (
        <div className="relative overflow-hidden sm:mx-2 sm:rounded-md">
          <img
            src={pic.img}
            className="object-cover mx-auto"
            alt="post"
            onClick={() => changePic(pic.img, pic.description)}
          />
        </div>
      ) : null}
      {pic.video ? (
        <div className="h-auto relative overflow-hidden sm:mx-2 sm:rounded-md">
          <video
            src={pic.video!}
            controls
            className="object-cover h-full w-full"
          ></video>
        </div>
      ) : null}
      <div className="p-4 rounded-b-md">
        <div className="w-full h-[0.1px] bg-gray-500 bg-opacity-20 mb-4" />
        <div className="flex items-center text-2xl">
          <div className="flex justify-start my-2 items-center space-x-5">
            <div>
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-red-600" />
              ) : (
                <div>
                  {liked ? (
                    <AiFillHeart
                      className="z-2 relative text-red-600 cursor-pointer"
                      onClick={() => removeLike()}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="z-2 relative hover:animate-pulse hover:text-red-600 transition-all duration-150 cursor-pointer"
                      onClick={() => likePost()}
                    />
                  )}
                </div>
              )}

              {postLikes.length > 0 && !loading ? (
                <div className="text-sm bg-red-600 flex items-center justify-center rounded-full text-white">
                  {postLikes.length}
                </div>
              ) : null}
            </div>
            <div>
              {displayComments ? (
                <TbMessageCircle2Filled
                  className="z-2 relative text-teal-600 transition duration-150 hover:text-teal-500 ease-in-out cursor-pointer"
                  onClick={() => setDisplayComments(!displayComments)}
                />
              ) : (
                <TbMessageCircle2
                  className="z-2 relative hover:text-teal-600 transition duration-150 ease-in-out cursor-pointer"
                  onClick={() => setDisplayComments(!displayComments)}
                />
              )}
            </div>

            <div className="flex gap-2 items-center group h-full relative">
              <BiShareAlt className="z-2 relative cursor-pointer hover:text-teal-600 transition duration-150" />
              <div className="overflow-hidden w-0 group-hover:w-80 transition-all duration-500">
                <ShareSection id={pic._id.toString()} picUrl={pic.img} />
              </div>
            </div>
          </div>
          {loadingSave ? (
            <AiOutlineLoading3Quarters className="animate-spin text-teal-600 ml-auto" />
          ) : (
            <div className="ml-auto">
              {saved ? (
                <BsBookmarkFill
                  className="ml-auto text-xl text-teal-600"
                  onClick={removeSavedPost}
                />
              ) : (
                <BsBookmark
                  className="ml-auto text-xl hover:text-teal-600 transition duration-150"
                  onClick={savePost}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {displayComments ? (
        <CommentSection
          postId={pic._id}
          comments={pic.comments}
          fetchPosts={fetchPosts}
          currentComments={currentComments}
          setCurrentComments={setCurrentComments}
        />
      ) : null}
    </div>
  );
};

export default SinglePic;
