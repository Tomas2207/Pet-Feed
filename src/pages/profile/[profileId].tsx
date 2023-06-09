import ZoomPic from '../../components/ZoomPic';
import { useEffect, useState } from 'react';
import ProfileInfo from '../../components/ProfilePage/ProfileInfo';
import SinglePic from '@/components//Post/SinglePic';
import Navbar from '@/components/Navbar/Navbar';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import { ObjectId } from 'mongodb';
import Post from '../../../models/Post';
import { useSession } from 'next-auth/react';
import { Author, Comment } from '../../../utils/types';
import { useRouter } from 'next/router';

type Profile = {
  profile: {
    _id: ObjectId;
    name: string;
    description: string;
    image: string;
    followers: string[];
    following: string[];
    savedPosts: {
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

  serverPosts: {
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

export default function ProfilePage({ profile, serverPosts }: Profile) {
  const [currentPic, setCurrentPic] = useState({ src: '', desc: '' });
  const { data: session } = useSession();
  const [posts, setPosts] = useState(serverPosts);
  const router = useRouter();
  const [showSavedPosts, setShowSavedPosts] = useState(false);

  console.log(profile);

  const user = profile;
  const savedPosts = user.savedPosts.reverse();

  const fetchPosts = async () => {
    const res = await fetch(`/api/post/userPosts/${router.query.profileId}`);
    const fetchedPosts = await res.json();
    // console.log(fetchedPosts.userPosts);
    setPosts(fetchedPosts.userPosts.reverse());
  };

  return (
    <main className="flex flex-col items-center shadow-xl shadow-black relative bg-neutral-200 min-h-screen pb-20">
      <Navbar />

      <div className="w-full sm:w-auto flex flex-col lg:flex-row gap-6">
        <ProfileInfo profile={user} />

        <div className="mt-16">
          <div className="flex">
            <div
              className={
                !showSavedPosts
                  ? 'text-neutral-800 flex gap-2 border border-b-teal-600 w-fit pb-2 mx-1 cursor-pointer'
                  : 'text-neutral-800 flex gap-2  w-fit pb-2 mx-1 cursor-pointer'
              }
              onClick={() => setShowSavedPosts(false)}
            >
              <p>Posts</p>
              <p className="bg-teal-600 px-2 rounded-md text-white">
                {posts?.length}
              </p>
            </div>
            <div
              className={
                showSavedPosts
                  ? 'text-neutral-800 flex gap-2 border border-b-teal-600 w-fit pb-2 mx-1 cursor-pointer'
                  : 'text-neutral-800 flex gap-2  w-fit pb-2 mx-1 cursor-pointer'
              }
              onClick={() => setShowSavedPosts(true)}
            >
              <p>Saved Posts</p>
              <p className="bg-teal-600 px-2 rounded-md text-white">
                {user.savedPosts?.length}
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-500 bg-opacity-20 mb-6" />
          {!showSavedPosts ? (
            <>
              <div className="gap-1 2xl:columns-2 space-y-4 h-fit">
                {posts.map((pic, i) => (
                  <div key={i} className="break-inside-avoid-column">
                    <SinglePic pic={pic} fetchPosts={fetchPosts} />
                  </div>
                ))}
              </div>
              {posts.length === 0 ? (
                <div className="w-[50vw] px-6 text-neutral-600">
                  {user?.name} has no posts yet
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="gap-1 2xl:columns-2 space-y-4 h-fit">
                {savedPosts.map((pic, i) => (
                  <div key={i} className="break-inside-avoid-column">
                    <SinglePic pic={pic} fetchPosts={fetchPosts} />
                  </div>
                ))}
              </div>

              {savedPosts.length === 0 ? (
                <div className="w-[50vw] px-6 text-neutral-600">
                  No saved Posts
                </div>
              ) : null}
            </>
          )}
          {/* ---end of saved posts --- */}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  await connectMongo();

  let id = new ObjectId(query.profileId);

  const profile = JSON.parse(
    JSON.stringify(
      await User.findById(id).populate({
        path: 'savedPosts',
        populate: [
          { path: 'userId', model: 'User' },
          { path: 'comments.author', model: 'User' },
          { path: 'likes', model: 'User' },
        ],
      })
    )
  );

  console.log('a', profile);

  const posts = JSON.parse(
    JSON.stringify(
      await Post.find({ userId: id })
        .populate({ path: 'userId', model: 'User' })
        .populate({ path: 'comments.author', model: 'User' })
        .populate({ path: 'likes', model: 'User' })
    )
  ).reverse();

  return {
    props: {
      profile: profile,
      serverPosts: posts,
    },
  };
};
