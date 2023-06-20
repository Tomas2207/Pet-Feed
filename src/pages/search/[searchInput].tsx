import React, { use, useState } from 'react';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Post from '../../../models/Post';
import { Author, Comment } from '../../../utils/types';
import SinglePic from '@/components/Post/SinglePic';

type Props = {
  users: {
    id: ObjectId;
    name: string;
    image: string;
    description: string;
    following: ObjectId[];
    followers: ObjectId[];
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

const Search = ({ users, serverPosts }: Props) => {
  const router = useRouter();
  console.log(serverPosts);
  const [posts, setPosts] = useState(serverPosts);

  const changePic = (src: string, desc: string) => {
    console.log('yes');
  };

  const fetchPosts = async () => {
    const res = await fetch('/api/post');
    const fetchedPosts = await res.json();
    // setPosts(fetchedPosts.posts);
  };

  return (
    <main className="flex flex-col shadow-xl shadow-black relative min-h-screen bg-neutral-200 pb-20">
      <Navbar />
      <div className="mx-60">
        <h1 className="text-4xl font-bold my-4 sticky top-0">
          Results for : {router.query.searchInput}
        </h1>
        <div className=" w-full sm:w-[35rem] mx-auto">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <section className="bg-white border border-neutral-300 px-4 py-6 rounded-md">
            {users.length > 0 ? (
              <div>
                {users.map((user, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={user.image}
                        fill
                        className="object-cover"
                        alt="profile"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{user.name}</p>
                      <p className="text-neutral-700">{user.description}</p>
                    </div>
                    <button className="rounded-md border border-neutral-700 w-36 h-10 my-auto ml-auto">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-neutral-700">No Users Found</div>
            )}
          </section>
          <h2 className="text-xl font-bold mb-4 mt-6">Posts</h2>
          {posts.length > 0 ? (
            <div className="flex flex-col w-full items-center gap-4">
              {posts.map((pic, i) => (
                <SinglePic
                  key={i}
                  pic={pic}
                  changePic={changePic}
                  fetchPosts={fetchPosts}
                />
              ))}
            </div>
          ) : (
            <div>No Posts Found</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;

export const getServerSideProps = async ({ query }: any) => {
  await connectMongo();

  console.log(query.searchInput);

  const users = JSON.parse(
    JSON.stringify(
      await User.find({ name: { $regex: query.searchInput, $options: 'i' } })
    )
  );

  const posts = JSON.parse(
    JSON.stringify(
      await Post.find({
        description: { $regex: query.searchInput, $options: 'i' },
      })
        .populate({ path: 'userId', model: User })
        .populate({ path: 'comments.author', model: 'User' })
        .populate({ path: 'likes', model: 'User' })
    )
  ).reverse();

  return {
    props: {
      users: users,
      serverPosts: posts,
    },
  };
};
