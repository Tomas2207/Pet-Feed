import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import EditProfile from './EditProfile';
import { ObjectId } from 'mongodb';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Profile = {
  profile: {
    _id: ObjectId;
    name: string;
    description: string;
    image: string;
    followers: string[];
    following: string[];
  };
};

const ProfileInfo = ({ profile }: Profile) => {
  const [myProfile, setMyProfile] = useState(false);
  const [following, setFollowing] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, update } = useSession();
  const router = useRouter();

  const [profileState, setProfileState] = useState({
    image: profile.image,
    name: profile.name,
    description: profile.description,
    followers: profile.followers,
    following: profile.following,
  });

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
  const addFollowing = async (id: ObjectId) => {
    if (session) {
      setLoading(true);
      const res = await fetch(`/api/follow`, {
        method: 'POST',
        body: JSON.stringify({
          otherId: id,
          hostId: session?.user.id,
        }),
        headers: { 'Content-type': 'application/json' },
      });

      const data = await res.json();

      setProfileState({
        ...profileState,
        followers: data.addNewFollower.followers,
        following: data.addNewFollower.following,
      });

      fetchUser();
    } else {
      router.push('/signin');
    }
  };

  const removeFollowing = async (id: ObjectId) => {
    setLoading(true);
    const res = await fetch(`/api/follow`, {
      method: 'PATCH',
      body: JSON.stringify({
        otherId: id,
        hostId: session?.user.id,
      }),
      headers: { 'Content-type': 'application/json' },
    });
    const data = await res.json();
    fetchUser();
    setProfileState({
      ...profileState,
      followers: data.removeFollower.followers,
      following: data.removeFollower.following,
    });
  };

  useEffect(() => {
    if (session) {
      if (session?.user.id === router.query.profileId) {
        setMyProfile(true);
        setProfileState({
          image: session?.user.image as string,
          name: session?.user.name as string,
          description: session!.user.description,
          followers: session!.user.followers,
          following: session!.user.following,
        });
      }
      if (profileState.followers.includes(session.user.id)) {
        setFollowing(true);
      } else if (!profileState.followers.includes(session.user.id)) {
        setFollowing(false);
      }
      setLoading(false);
    }
  }, [session, profile]);

  return (
    <div className="pt-6 border border-neutral-300 h-fit w-full lg:w-[23rem] bg-white rounded-md mt-2 lg:sticky top-20 z-[2]">
      {!openForm ? (
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div>
            <div className="border-4 border-teal-600 h-64 w-64 relative flex items-center justify-center rounded-full">
              <div className="h-60 w-60 relative rounded-full overflow-hidden">
                <Image
                  src={profileState.image}
                  fill
                  className="object-cover hover:scale-110 transition duration-150 ease-in-out"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          {/* ------------- */}
          {/* Profile Info */}
          <div className="w-[85%] text-center flex flex-col gap-2 my-4">
            <p className="text-2xl font-bold ">{profileState.name}</p>
            <p className="text-neutral-600">{profileState.description}</p>
            {/* Followers */}
            <div className="flex gap-5 text-center justify-center">
              <div>
                <p className="font-bold">Followers</p>
                <p className="text-teal-600 font-bold text-2xl">
                  {profileState.followers.length}
                </p>
              </div>
              <div>
                <p className="font-bold">Following</p>
                <p className="text-teal-600 font-bold text-2xl">
                  {profileState.following.length}
                </p>
              </div>
            </div>
            {/* ----------- */}
            <div className="bg-neutral-300 h-[1px] my-2" />
            {myProfile ? (
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 pr-2"
                onClick={(e) => setOpenForm(true)}
              >
                <p>Edit Profile</p>
                <MdModeEditOutline />
              </button>
            ) : (
              <div>
                {loading ? (
                  <button className="bg-teal-600 text-white px-4 py-3 rounded-lg w-full">
                    <AiOutlineLoading3Quarters className="mx-auto animate-spin text-xl" />
                  </button>
                ) : (
                  <div>
                    {following ? (
                      <button
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg w-full"
                        onClick={() => removeFollowing(profile._id)}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="border border-neutral-700 px-4 py-2 rounded-lg w-full
                  text-neutral-700 hover:bg-teal-600 transition duration-150 ease-in-out hover:text-white"
                        onClick={() => addFollowing(profile._id)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* ---------------------- */}
        </div>
      ) : (
        <EditProfile profile={profileState} setOpenForm={setOpenForm} />
      )}
    </div>
  );
};

export default ProfileInfo;
