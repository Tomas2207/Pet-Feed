import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FaComment, FaShareAlt } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

type Props = {
  open: Function;
};

const NewPost = ({ open }: Props) => {
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [description, setDescription] = useState('');

  const { data: session } = useSession();

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
      await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          data: base64EncodedImage,
          description: description,
          userId: session?.user.id,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      open(false);
      setDisableBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute top-0 bg-black bg-opacity-90 h-full w-full z-[99]">
      <div className="w-[29rem] bg-gray-800 sticky right-0 left-0 mx-auto top-[20vh]">
        <div className="shadow-lg shadow-black bg-white p-2 rounded-md">
          <div className="flex gap-2 my-4">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden">
              <Image
                fill
                src={session?.user.image as string}
                className="object-cover"
                alt="mini-profile"
              />
            </div>
            <div>
              <h2 className="font-bold">{session?.user.name}</h2>
            </div>
            <RxCrossCircled
              className="bg-white text-4xl rounded-full cursor-pointer transition duration-1000 hover:rotate-180 mr-0 ml-auto"
              onClick={() => open(false)}
            />
          </div>

          {/* Upload file */}
          <form onSubmit={handleSubmitFile} className="flex flex-col gap-5">
            <input
              type="text"
              autoFocus
              className="px-2 py-2"
              placeholder="Something in mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2 mb-2">
              <label
                htmlFor="image"
                className="bg-teal-600 rounded-md px-4 py-2 text-white text-center flex-1 cursor-pointer"
              >
                Choose File
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                hidden
              />
              <button
                type="submit"
                className={
                  !disableBtn
                    ? 'bg-black text-white rounded-md px-2'
                    : 'bg-black text-white rounded-md px-2 bg-opacity-30'
                }
                disabled={disableBtn}
              >
                Post
              </button>
            </div>
          </form>
          {/* ----------- */}
          {previewSource ? (
            <div className="h-[30rem] w-[28rem] relative rounded-md overflow-hidden flex j1ustify-center items-center text-4xl text-white font-bold">
              <Image
                src={previewSource}
                fill
                className="object-cover"
                alt="preview"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
