import EmojiPicker from 'emoji-picker-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { FaComment, FaPollH, FaShareAlt } from 'react-icons/fa';
import { MdArticle, MdInsertPhoto } from 'react-icons/md';
import { RiVideoFill } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';
import { resizeVideo } from '../../utils/compressFiles';

type Props = {
  open: Function;
  fetchPosts: Function;
};

const NewPost = ({ open, fetchPosts }: Props) => {
  const [previewSource, setPreviewSource] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [description, setDescription] = useState('');
  const [currentFile, setCurrentFile] = useState<File>();
  const [videoSrc, setVideoSrc] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

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
      setCurrentFile(file);
    } else if (files && files.length && type === 'video') {
      const file = files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoSrc(reader.result as string);
      };
      setCurrentFile(file);

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

  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!previewSource && !videoSrc) return;
    setDisableBtn(true);
    const formData = new FormData();
    formData.append('file', currentFile);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    if (previewSource) {
      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const res = await upload.json();
      console.log(res);
      uploadImage(res, 'image');
    } else if (videoSrc) {
      // uploadImage(videoSrc, 'video');
      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/video/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const res = await upload.json();
      console.log(res);
      uploadImage(res, 'video');
    }
  };

  const uploadImage = async (base64EncodedImage: any, type: string) => {
    try {
      await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          data: base64EncodedImage,
          description: description ? description : ' ',
          userId: session?.user.id,
          type: type,
        }),
        headers: { 'Content-type': 'application/json' },
      });

      fetchPosts();
      open(false);
      setDisableBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmoji = (e: any, emojiData: any) => {
    console.log(emojiData);
    setDescription(description + emojiData.emoji);
  };

  return (
    <div className="absolute top-0 bg-black bg-opacity-90 h-full w-full z-[99]">
      <div className="sm:w-[29rem] bg-gray-800 sticky right-0 left-0 mx-auto top-[15vh]">
        <div className="shadow-lg shadow-black bg-white p-2 rounded-md relative">
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
            <div className="flex items-center">
              <textarea
                className="px-2 py-2 outline-none flex-1 whitespace-pre-wrap"
                placeholder="Something in mind?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
              {/* <input
                type="text"
                autoFocus
                className="px-2 py-2 outline-none flex-1"
                placeholder="Something in mind?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              /> */}
            </div>
            <div className="flex mb-2 items-center justify-between gap-2">
              {/* Image & Video buttons */}
              <div className="flex items-center justify-between my-1 gap-4 relative">
                <BsFillEmojiLaughingFill
                  className="text-neutral-500 text-xl cursor-pointer ml-2"
                  onClick={() => setShowEmojis(!showEmojis)}
                />
                {showEmojis ? (
                  <div className="absolute top-10 left-0 z-[99]">
                    <EmojiPicker
                      onEmojiClick={(emojiData, e) => addEmoji(e, emojiData)}
                    />
                  </div>
                ) : null}
                <label
                  htmlFor="image"
                  className="flex items-center w-fit h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-800 cursor-pointer group"
                >
                  <MdInsertPhoto className="text-4xl text-teal-500 group-hover:scale-75 transition duration-150 ease-in-out" />
                  <p className="hidden sm:block">Photo</p>
                </label>
                <label
                  htmlFor="video"
                  className="flex items-center w-fit h-10 justify-center rounded-xl gap-1 border border-neutral-300 px-2 text-neutral-800 cursor-pointer group"
                >
                  <RiVideoFill className="text-4xl text-blue-500 group-hover:scale-75 transition duration-150 ease-in-out" />
                  <p className="hidden sm:block">Video</p>
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
                disabled={disableBtn}
              />
              <input
                type="file"
                name="video"
                id="video"
                onChange={(e) => handleFileInputChange(e, 'video')}
                hidden
                accept="video/*"
                disabled={disableBtn}
              />
              <button
                type="submit"
                className={
                  !disableBtn
                    ? 'bg-black text-white rounded-md px-2 h-10 flex-1 hover:bg-neutral-800 transition duration-150 ease-in-out'
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
            <div className="h-[30rem] sm:w-[28rem] relative rounded-md overflow-hidden flex j1ustify-center items-center text-4xl text-white font-bold">
              <Image
                src={previewSource}
                fill
                className="object-cover"
                alt="preview"
              />
            </div>
          ) : null}
          {videoSrc ? (
            <div className="h-[30rem] sm:w-[28rem] relative rounded-md overflow-hidden flex j1ustify-center items-center text-4xl text-white font-bold">
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
