import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FaComment, FaPollH, FaShareAlt } from 'react-icons/fa';
import { MdArticle, MdInsertPhoto } from 'react-icons/md';
import { RiVideoFill } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';

type Props = {
  open: Function;
};

const NewPost = ({ open }: Props) => {
  const [previewSource, setPreviewSource] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState();
  const [videoSrc, setVideoSrc] = useState('');

  const router = useRouter();

  const { data: session } = useSession();

  const handleFileInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ) => {
    const fileInput = e.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0 && type === 'image') {
      const file = files[0];
      previewFile(file);
    } else if (files && files.length && type === 'video') {
      const file = files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoSrc(reader.result as string);
      };
      // videoPreview(file);
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
    if (!previewSource && !videoSrc) return;

    if (previewSource) uploadImage(previewSource, 'image');
    else if (videoSrc) uploadImage(videoSrc, 'video');
  };

  const uploadImage = async (base64EncodedImage: any, type: string) => {
    setDisableBtn(true);
    try {
      await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          data: base64EncodedImage,
          description: description,
          userId: session?.user.id,
          type: type,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      open(false);
      setDisableBtn(false);
      router.replace(router.asPath);
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
              className="px-2 py-2 outline-none"
              placeholder="Something in mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex mb-2 items-center justify-between gap-2">
              {/* Image & Video buttons */}
              <div className="flex items-center justify-between my-1 gap-4">
                <label
                  htmlFor="image"
                  className="flex items-center w-28 h-10 justify-center rounded-xl gap-1 bg-neutral-200 px-2 text-neutral-800 cursor-pointer"
                >
                  <MdInsertPhoto className="text-4xl text-teal-500" />
                  Photo
                </label>
                <label
                  htmlFor="video"
                  className="flex items-center w-28 h-10 justify-center rounded-xl gap-1 bg-neutral-200 px-2 text-neutral-800 cursor-pointer"
                >
                  <RiVideoFill className="text-4xl text-blue-500" />
                  Video
                </label>
              </div>

              {/*  */}

              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => handleFileInputChange(e, 'image')}
                hidden
                accept="image/*"
              />
              <input
                type="file"
                name="video"
                id="video"
                onChange={(e) => handleFileInputChange(e, 'video')}
                hidden
                accept="video/*"
              />
              <button
                type="submit"
                className={
                  !disableBtn
                    ? 'bg-black text-white rounded-md px-2 h-10 flex-1'
                    : 'bg-black text-white rounded-md px-2 h-10 bg-opacity-30 flex-1'
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
          {videoSrc ? (
            <div className="h-[30rem] w-[28rem] relative rounded-md overflow-hidden flex j1ustify-center items-center text-4xl text-white font-bold">
              <video
                className="h-full w-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                controls
              ></video>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
