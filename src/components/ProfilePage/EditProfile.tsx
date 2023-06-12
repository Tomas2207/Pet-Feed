import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  setOpenForm: Function;
  profile: {
    name: string;
    description: string;
    image: string;
  };
};

const EditProfile = ({ profile, setOpenForm }: Props) => {
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const { data: session, update } = useSession();

  const [profileState, setProfileState] = useState({
    image: session?.user.image,
    name: session?.user.name,
    description: session?.user.description,
  });

  const handleFileInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      previewFile(file);
    }
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage: any) => {
    setDisableBtn(true);
    try {
      const updatedUser = await fetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({
          img: base64EncodedImage,
          petName: profileState.name,
          description: profileState.description,
          email: session?.user.email,
        }),
        headers: { 'Content-type': 'application/json' },
      });

      const res = await updatedUser.json();

      update({
        user: {
          id: res.updatedUser._id,
          name: res.updatedUser.name,
          description: res.updatedUser.description,
          image: res.updatedUser.image,
          following: res.updatedUser.following,
          followers: res.updatedUser.followers,
        },
      });

      setDisableBtn(false);
      setOpenForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 items-center"
      onSubmit={handleSubmitFile}
    >
      <div className="border-4 border-teal-600 h-64 w-64 relative flex items-center justify-center rounded-full">
        <label
          htmlFor="picture"
          className="h-60 w-60 relative rounded-full overflow-hidden"
        >
          <Image
            src={previewSource ? previewSource : profile.image}
            fill
            className="object-cover hover:scale-110 transition duration-150 ease-in-out"
            alt="profile"
          />
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          hidden
          onChange={handleFileInputChange}
          value={fileInputState}
        />
      </div>
      <div className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Name...."
          className="px-2 py-1 bg-transparent border border-neutral-400 rounded-md font-bold text-center"
          value={profileState.name as string}
          onChange={(e) =>
            setProfileState({
              ...profileState,
              name: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Description...."
          className="px-2 py-1 bg-transparent border border-neutral-400 rounded-md text-neutral-600 text-center"
          value={profileState.description}
          onChange={(e) =>
            setProfileState({
              ...profileState,
              description: e.target.value,
            })
          }
        />
        <div className="flex justify-around gap-2 mb-2">
          <button
            className="bg-neutral-300 flex-1 rounded-md"
            onClick={(e) => setOpenForm(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-600 flex-1 py-2 rounded-md text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
