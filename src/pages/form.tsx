import SideBanner from '@/components/Form/SideBanner';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Form = () => {
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');

  const { data: session, status, update } = useSession();
  const router = useRouter();

  if (session) {
    if (session.user?.name) {
      router.push('/');
    }
  }

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
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage: any) => {
    setDisableBtn(true);
    try {
      const updateUser = await fetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({
          img: base64EncodedImage,
          petName: petName,
          description: description,
          email: session?.user?.email,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const res = await updateUser.json();

      update({
        user: {
          id: res.updatedUser._id,
          name: petName,
          description: description,
          image: res.updatedUser.image,
          following: [],
          followers: [],
          savedPosts: [],
        },
      });
      // setDisableBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex shadow-xl shadow-black relative items-center min-h-screen bg-neutral-200 h-screen">
      <div className="w-screen absolute h-2 top-0 bg-teal-600 z-[99]" />
      <div className="h-28 w-screen absolute top-0 bg-gradient-to-t from-transparent via-teal-500 to-teal-600 lg:hidden" />
      {/* ---Side Banner------ */}
      <SideBanner />
      {/* ---------------------------- */}
      {/*----- Form ---------*/}
      <div className="px-2 flex-1 max-w-[30rem] mx-auto mt-12 lg:mt-0">
        <h2 className="text-4xl mb-16 text-neutral-700 font-bold">
          Complete Your Account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitFile}>
          <label
            htmlFor="picture"
            className="bg-teal-600 w-56 h-56 rounded-full mx-auto flex items-center justify-center cursor-pointer relative overflow-hidden"
          >
            <p className="bg-teal-700 px-1 py-1 rounded-md text-white">
              Profile Picture
            </p>
            {previewSource ? (
              <Image
                src={previewSource}
                alt="profile"
                fill
                className="object-cover"
              />
            ) : null}
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            hidden
            onChange={handleFileInputChange}
            value={fileInputState}
          />
          <label htmlFor="" className="text-neutral-600 text-2xl">
            Pet Name
          </label>
          <input
            type="text"
            className="h-12 rounded-md outline-none px-4"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <label htmlFor="" className="text-neutral-600 text-2xl">
            Description
          </label>
          <input
            type="text"
            className="h-12 rounded-md outline-none px-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className={
              !disableBtn
                ? 'bg-teal-600 py-4 rounded-md text-white text-lg my-4'
                : 'bg-teal-600 bg-opacity-40 py-4 rounded-md text-white text-lg my-4'
            }
            disabled={disableBtn}
          >
            Create Account
          </button>
        </form>
      </div>
      {/* --------------------- */}
    </main>
  );
};

export default Form;
