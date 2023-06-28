import React, { use, useEffect, useState } from 'react';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Post from '../../../models/Post';
import { Author, Comment } from '../../../utils/types';
import SinglePic from '@/components/Post/SinglePic';
import SideProfile from '@/components/SideProfile';
import SingleUser from '@/components/Search/User';
import Loading from '@/components/Loading';

type Props = {
  serverPost: {
    _id: ObjectId;
    userId: Author;
    img: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    likes: Author[];
    comments: Comment[];
  };
};

const Search = ({ serverPost }: Props) => {
  const fetchPosts = () => {
    console.log('-');
  };

  const changePic = () => {
    console.log('.');
  };

  return (
    <main className="flex flex-col shadow-xl shadow-black relative min-h-screen bg-neutral-200 pb-20">
      <Navbar />
      <div
        className="lg:mx-60 flex
      flex-col-reverse lg:flex-row my-12 justify-center gap-4"
      >
        <div className="h-fit hidden xl:block sticky top-20">
          <SideProfile />
        </div>
        <div className=" w-full sm:w-[35rem] mx-auto">
          <h2 className="text-xl font-bold mb-4 bg-white rounded-md p-2 border border-neutral-300 text-neutral-500">
            Posts
          </h2>
          <SinglePic
            key={serverPost._id.toString()}
            pic={serverPost}
            changePic={changePic}
            fetchPosts={fetchPosts}
          />
        </div>
      </div>
    </main>
  );
};

export default Search;

export const getServerSideProps = async ({ query }: any) => {
  await connectMongo();

  const post = JSON.parse(
    JSON.stringify(
      await Post.findById(query.posturl)
        .populate({ path: 'userId', model: User })
        .populate({ path: 'comments.author', model: 'User' })
        .populate({ path: 'likes', model: 'User' })
    )
  );

  return {
    props: {
      serverPost: post,
    },
  };
};
