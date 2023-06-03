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
    console.log('yo', session);
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
      console.log('res', res);
      update({
        user: {
          name: petName,
          description: description,
          image: res.update.image,
        },
      });
      setDisableBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-[2rem] flex shadow-xl shadow-black relative items-center min-h-screen bg-neutral-200 h-screen">
      {/* ---Side Banner------ */}
      <SideBanner />
      {/* ---------------------------- */}
      {/*----- Form ---------*/}
      <div className="flex-1 mx-48">
        <h2 className="text-4xl mb-16 text-neutral-700 font-bold">
          Complete Your Account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitFile}>
          <label
            htmlFor="picture"
            className="bg-emerald-600 w-56 h-56 rounded-full mx-auto flex items-center justify-center cursor-pointer relative overflow-hidden"
          >
            <p className="bg-emerald-700 px-1 py-1 rounded-md text-white">
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
                ? 'bg-emerald-600 py-4 rounded-md text-white text-lg my-4'
                : 'bg-emerald-600 bg-opacity-40 py-4 rounded-md text-white text-lg my-4'
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