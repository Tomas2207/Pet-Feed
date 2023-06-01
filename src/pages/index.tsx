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

const Index = () => {
  const changePic = (src: string, desc: string) => {
    console.log('yes');
  };

  const [openNewPost, setOpenNewPost] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);

  return (
    <main className="mx-[2rem] flex flex-col items-center shadow-xl shadow-black relative min-h-screen bg-neutral-200">
      {openNewPost ? <NewPost open={setOpenNewPost} /> : null}
      <Navbar />

      <div className="w-[80%] h-[0.1px] bg-gray-500 bg-opacity-20 my-6" />

      <div className="flex w-full justify-around">
        <SideProfile />
        <div className="flex flex-col items-center">
          {/* Add Post */}
          <AddPost setOpenNewPost={setOpenNewPost} />

          <div className="w-[80%] h-[0.1px] bg-gray-500 bg-opacity-20 mb-6" />

          <div className="gap-5 grid grid-cols-2">
            {copitoPics.map((pic, i) => (
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
