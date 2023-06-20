import Navbar from '@/components/Navbar/Navbar';
import SinglePic from '@/components/Post/SinglePic';
import React, { useEffect, useState } from 'react';
import NewPost from '@/components/NewPost';
import ExploreProfiles from '@/components/ExploreProfiles';
import AddPost from '@/components/AddPost';
import SideProfile from '@/components/SideProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import connectMongo from '../../utils/connectMongo';
import Post from '../../models/Post';
import User from '../../models/User';
import { ObjectId } from 'mongodb';
import { Author, Comment } from '../../utils/types';
import LatestPost from '@/components/LatestPost';

type Props = {
  users: {
    _id: ObjectId;
    name: string;
    image: string;
  }[];

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

const Index = ({ serverPosts, users }: Props) => {
  const { data: session, update } = useSession();
  const [posts, setPosts] = useState(serverPosts);

  const router = useRouter();

  useEffect(() => {
    console.log(session?.user.savedPosts);
  }, [session?.user.savedPosts]);

  const fetchPosts = async () => {
    const res = await fetch('/api/post');
    const fetchedPosts = await res.json();
    setPosts(fetchedPosts.posts);
  };

  const fetchUser = async () => {
    const response = await fetch(`/api/user?id=${session!.user.email}`);
    const data = await response.json();

    update({
      user: {
        id: data.currentUser._id,
        name: data.currentUser.name,
        description: data.currentUser.description,
        image: data.currentUser.image,
        followers: data.currentUser.followers,
        following: data.currentUser.following,
        savedPosts: data.currentUser.savedPosts,
      },
    });
  };

  if (session) {
    if (!session.user?.name) {
      router.push('/form');
    }
    if (!session.user.id) {
      fetchUser();
    }
  }

  const changePic = (src: string, desc: string) => {
    console.log('yes');
  };

  const [openNewPost, setOpenNewPost] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);

  if (session && !session?.user.followers) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center shadow-xl shadow-black relative min-h-screen bg-neutral-200 pb-20">
      <Navbar />
      {openNewPost ? (
        <NewPost open={setOpenNewPost} fetchPosts={fetchPosts} />
      ) : null}

      <div className="w-[70%] h-[0.1px] bg-gray-500 bg-opacity-20 my-6" />

      <div className="w-full sm:w-auto flex justify-center md:gap-6">
        <div className="h-fit sticky top-20">
          <SideProfile />
          <LatestPost posts={posts} />
        </div>
        <div className="flex flex-col items-center w-full">
          {/* Add Post */}
          <AddPost setOpenNewPost={setOpenNewPost} />

          <div className="w-[80%] h-[0.1px] bg-gray-500 bg-opacity-20 mb-6" />

          <div className="flex flex-col w-full items-center gap-6">
            {posts.map((pic, i) => (
              <SinglePic
                key={i}
                pic={pic}
                changePic={changePic}
                fetchPosts={fetchPosts}
              />
            ))}
          </div>
          {/* -------- */}
        </div>
        {/*---Explore--- */}
        <ExploreProfiles profiles={users} fetchUser={fetchUser} />
        {/* ------------- */}
      </div>
    </main>
  );
};

export default Index;

export const getServerSideProps = async () => {
  await connectMongo();

  const posts = JSON.parse(
    JSON.stringify(
      await Post.find()
        .populate({ path: 'userId', model: User })
        .populate({ path: 'comments.author', model: 'User' })
        .populate({ path: 'likes', model: 'User' })
    )
  ).reverse();

  const users = JSON.parse(JSON.stringify(await User.find()));

  return {
    props: {
      serverPosts: posts,
      users: users,
    },
  };
};
