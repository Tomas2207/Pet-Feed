import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import EditProfile from './EditProfile';

type Profile = {
  profile: {
    _id: Number;
    name: string;
    description: string;
    image: string;
  };
};

const ProfileInfo = ({ profile }: Profile) => {
  const [myProfile, setMyProfile] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const [profileState, setProfileState] = useState({
    image: profile.image,
    name: profile.name,
    description: profile.description,
  });

  useEffect(() => {
    if (session?.user.id === router.query.profileId) {
      setMyProfile(true);
    }
    if (session) {
      console.log('WR', session.user);
      setProfileState({
        image: session.user.image as string,
        name: session.user.name as string,
        description: session.user.description,
      });
    }
  }, [session]);

  return (
    <div className="pt-6 border border-neutral-300 h-fit w-full lg:w-[23rem] bg-white rounded-md mt-2 lg:sticky top-20 z-[2]">
      {!openForm ? (
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="border-4 border-emerald-600 h-64 w-64 relative flex items-center justify-center rounded-full">
            <div className="h-60 w-60 relative rounded-full overflow-hidden">
              <Image
                src={profileState.image}
                fill
                className="object-cover hover:scale-110 transition duration-150 ease-in-out"
                alt="profile"
              />
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
                <p>5000</p>
              </div>
              <div>
                <p className="font-bold">Following</p>
                <p>1000</p>
              </div>
            </div>
            {/* ----------- */}
            <div className="bg-neutral-300 h-[1px] my-2" />
            {myProfile ? (
              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 pr-2"
                onClick={(e) => setOpenForm(true)}
              >
                <p>Edit Profile</p>
                <MdModeEditOutline />
              </button>
            ) : (
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                Follow
              </button>
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
