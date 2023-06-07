import Navbar from '@/components/Navbar/Navbar';
import SinglePic from '@/components/SinglePic';
import React, { useState } from 'react';
import copitoPics from '../../utils/copitoPics.json';
import Image from 'next/image';
import { CgMenuRound } from 'react-icons/cg';
import NewPost from '@/components/NewPost';
import ExploreProfiles from '@/components/ExploreProfiles';
import AddPost from '@/components/AddPost';
import SideProfile from '@/components/SideProfile';
import { HiArrowCircleUp } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import connectMongo from '../../utils/connectMongo';
import Post from '../../models/Post';

type Posts = {
  posts: {
    img: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const Index = ({ posts }: Posts) => {
  const { data: session, status, update } = useSession();

  const router = useRouter();

  posts = posts.reverse();

  const fetchUser = async () => {
    const response = await fetch(`/api/user?id=${session!.user.email}`);
    const data = await response.json();

    update({
      user: {
        id: data.currentUser._id,
        name: data.currentUser.name,
        description: data.currentUser.description,
        image: data.currentUser.image,
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

  return (
    <main className="flex flex-col items-center shadow-xl shadow-black relative min-h-screen bg-neutral-200">
      {openNewPost ? <NewPost open={setOpenNewPost} /> : null}
      <Navbar />

      <div className="w-[70%] h-[0.1px] bg-gray-500 bg-opacity-20 my-6" />

      <div className="w-full sm:w-auto flex justify-center gap-6">
        <SideProfile />
        <div className="flex flex-col items-center w-full">
          {/* Add Post */}
          <AddPost setOpenNewPost={setOpenNewPost} />

          <div className="w-[80%] h-[0.1px] bg-gray-500 bg-opacity-20 mb-6" />

          <div className="flex flex-col w-full items-center gap-6">
            {posts.map((pic, i) => (
              <SinglePic key={i} pic={pic} changePic={changePic} />
            ))}
          </div>
          {/* -------- */}
        </div>
        {/*---Explore--- */}
        <ExploreProfiles />
        {/* ------------- */}
      </div>
    </main>
  );
};

export default Index;

export const getStaticProps = async () => {
  await connectMongo();

  const posts = JSON.parse(JSON.stringify(await Post.find()));

  console.log(posts);

  return {
    props: {
      posts: posts,
    },
  };
};
