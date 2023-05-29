import Navbar from '@/components/Navbar';
import SinglePic from '@/components/SinglePic';
import React, { useState } from 'react';
import copitoPics from '../../utils/copitoPics.json';
import Image from 'next/image';
import { CgMenuRound } from 'react-icons/cg';
import NewPost from '@/components/NewPost';

const Index = () => {
  const changePic = (src: string, desc: string) => {
    console.log('yes');
  };

  const [openNewPost, setOpenNewPost] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);

  return (
    <main className="mx-[12rem] flex flex-col items-center shadow-xl shadow-black relative bg-white min-h-screen">
      {openNewPost ? <NewPost open={setOpenNewPost} /> : null}
      <Navbar />
      {/*---Explore--- */}
      <h2 className="font-bold self-start ml-10 mt-6 mb-6 text-2xl">
        Explore Profiles
      </h2>
      <div className="flex justify-around w-full">
        {copitoPics.map((pic, i) => (
          <div
            key={i}
            className="w-28 h-28 border-2 border-black rounded-full flex items-center justify-center"
          >
            <div className="w-24 h-24 relative rounded-full overflow-hidden">
              <Image
                src={pic.picture}
                fill
                className="object-cover"
                alt="explore-profile"
              />
            </div>
          </div>
        ))}
      </div>
      {/* ------------- */}
      <div className="w-[80%] h-[0.1px] bg-gray-500 bg-opacity-20 my-6" />
      {/* Add Post */}
      <div className="w-[40rem] flex border gap-2 p-2 mb-12 rounded-md">
        <div className="relative w-14 h-14 rounded-md overflow-hidden">
          <Image
            src="/copito.jpeg"
            fill
            className="object-cover"
            alt="post-profile"
          />
        </div>
        <button
          className="p-2 border rounded-md flex-1 bg-emerald-500 text-white font-bold"
          onClick={() => setOpenNewPost(true)}
        >
          Create Post
        </button>
      </div>
      {/* -------- */}
      <div className="gap-5 grid ">
        {copitoPics.map((pic, i) => (
          <SinglePic key={i} pic={pic} changePic={changePic} />
        ))}
      </div>
    </main>
  );
};

export default Index;
