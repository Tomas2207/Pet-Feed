import copitoPics from '../../../utils/copitoPics.json';
import ZoomPic from '../../components/ZoomPic';
import { useState } from 'react';
import ProfileInfo from '../../components/ProfilePage/ProfileInfo';
import SinglePic from '@/components/SinglePic';
import Navbar from '@/components/Navbar/Navbar';
import { GetServerSideProps } from 'next';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import Post from '../../../models/Post';

type Profile = {
  profile: {
    _id: Number;
    name: string;
    description: string;
    image: string;
  };

  posts: {
    img: string;
    description: string;
    createdAt: Date;
  }[];
};

export default function ProfilePage({ profile, posts }: Profile) {
  const [currentPic, setCurrentPic] = useState({ src: '', desc: '' });
  const [openZoom, setOpenZoom] = useState(false);

  const user = profile;

  const changePic = (src: string, desc: string) => {
    setOpenZoom(true);
    setCurrentPic({
      src,
      desc,
    });
  };

  return (
    <main className="mx-[12rem] flex flex-col items-center shadow-xl shadow-black relative bg-neutral-200 min-h-screen ">
      <Navbar />
      {openZoom ? (
        <ZoomPic
          src={currentPic.src}
          desc={currentPic.desc}
          open={setOpenZoom}
        />
      ) : null}
      <ProfileInfo profile={user} />
      <div className="w-[40rem] h-[2px] bg-gray-500 bg-opacity-20 mb-12" />
      <div className="gap-2 grid grid-cols-2">
        {posts.reverse().map((pic, i) => (
          <SinglePic key={i} pic={pic} changePic={changePic} />
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  await connectMongo();
  console.log('query', query);

  let id = new ObjectId(query.profileId);

  const profile = JSON.parse(JSON.stringify(await User.findOne({ _id: id })));

  const posts = JSON.parse(JSON.stringify(await Post.find({ userId: id })));

  return {
    props: {
      profile: profile,
      posts: posts,
    },
  };
};
