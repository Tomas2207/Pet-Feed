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
  serverUsers: {
    _id: ObjectId;
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

const Search = ({ serverUsers, serverPosts }: Props) => {
  const router = useRouter();
  console.log(serverPosts);
  const [posts, setPosts] = useState(serverPosts);
  const [users, setUsers] = useState(serverUsers);
  const [loading, setLoading] = useState(false);

  const changePic = (src: string, desc: string) => {
    console.log('yes');
  };

  useEffect(() => {
    fetchPosts();
  }, [router.query.searchInput]);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/post/searchPosts/${router.query.searchInput}`
    );
    const usersAndPosts = await res.json();
    console.log(usersAndPosts);
    setPosts(usersAndPosts.results.posts);
    setUsers(usersAndPosts.results.users);
    setLoading(false);
  };

  if (loading) return <Loading />;

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
        <div className=" w-full sm:w-[35rem] mx-auto">
          <h2 className="text-xl font-bold mb-4 bg-white rounded-md p-2 border border-neutral-300 text-neutral-500">
            Users
          </h2>
          <section className="bg-white border border-neutral-300 px-4 py-6 rounded-md">
            {users.length > 0 ? (
              <div>
                {users.map((user, i) => (
                  <SingleUser key={i} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-neutral-700">No Users Found</div>
            )}
          </section>
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
      serverUsers: users,
      serverPosts: posts,
    },
  };
};
