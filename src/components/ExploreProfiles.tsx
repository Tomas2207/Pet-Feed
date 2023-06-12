import Image from 'next/image';
import React, { useEffect } from 'react';
import copitoPics from '../../utils/copitoPics.json';
import { TbArrowForwardUp } from 'react-icons/tb';
import { SlOptions } from 'react-icons/sl';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  profiles: {
    _id: ObjectId;
    name: string;
    image: string;
  }[];
  fetchUser: Function;
};

const ExploreProfiles = ({ profiles, fetchUser }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.user);
  }, []);

  const addFollowing = async (id: ObjectId) => {
    await fetch(`/api/follow`, {
      method: 'PATCH',
      body: JSON.stringify({
        otherId: id,
        hostId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });

    fetchUser();
  };
  return (
    <div className="hidden xl:block h-fit min-w-[24rem] bg-white px-1 rounded-xl sticky top-20 pb-4 border border-neutral-300">
      <h2 className="font-bold self-start mt-6 mb-2 text-xl text-neutral-500 px-6">
        Explore Profiles
      </h2>
      <div className="flex flex-col justify-around w-full gap-2">
        {profiles.map((pic, i) => (
          <div
            key={i}
            className="flex gap-4 relative h-20 rounded-md overflow-hidden hover:h-80 transition-all duration-500 ease-in-out group"
          >
            <Image
              src={pic.image}
              fill
              className="object-cover absolute"
              alt="explore-profile"
            />
            <div className="z-[50] px-6 self-start pb-4 bg-white w-full group-hover:bg-opacity-80">
              <div className="flex gap-2 items-center mt-4">
                <Link
                  href={`/profile/${pic._id}`}
                  className="h-16 w-16 relative"
                >
                  <Image
                    src={pic.image}
                    fill
                    className="object-cover absolute rounded-full"
                    alt="explore-profile"
                  />
                </Link>
                <div>
                  <p className="text-lg font-bold text-neutral-600">
                    {pic.name}
                  </p>
                  <p className="text-neutral-500 text-sm">Active Recently</p>
                </div>

                {!session?.user?.following?.includes(pic._id.toString()) ? (
                  <button
                    className="border border-neutral-300 bg-white py-2 px-6 rounded-xl ml-auto mr-0 text-neutral-600"
                    onClick={() => addFollowing(pic._id)}
                  >
                    {session?.user.id === pic._id.toString() ? 'Me' : 'Follow'}
                  </button>
                ) : (
                  <button className="border border-neutral-300 bg-teal-600 py-2 px-6 rounded-xl ml-auto text-white">
                    Following
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProfiles;
