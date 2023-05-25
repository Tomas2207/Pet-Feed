import Image from 'next/image';
import copitoPics from '../../utils/copitoPics.json';
import { CgMenuRound } from 'react-icons/cg';
import ZoomPic from '../components/ZoomPic';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ProfileInfo from '../components/ProfileInfo';
import SinglePic from '@/components/SinglePic';

export default function Home() {
  const [currentPic, setCurrentPic] = useState({ src: '', desc: '' });
  const [openZoom, setOpenZoom] = useState(false);

  const changePic = (src: string, desc: string) => {
    setOpenZoom(true);
    setCurrentPic({
      src,
      desc,
    });
  };

  return (
    <main className="mx-[24rem] flex flex-col items-center shadow-xl shadow-black relative bg-white">
      {/* Nav */}
      <div className="flex items-center border-2 border-black rounded-full p-1 mt-2 mr-2 self-end">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src="/copito.jpeg"
            fill
            className="object-cover"
            alt="nav-profile"
          />
        </div>
        <CgMenuRound className="text-4xl hover:rotate-90 transition duration-150 ease-out cursor-pointer" />
        <div className="absolute top-16 right-2 bg-black text-white flex flex-col w-60 rounded-md overflow-hidden">
          <button className="py-4 hover:bg-neutral-800 cursor-pointer">
            Home
          </button>
          <button className="py-4 hover:bg-neutral-800 cursor-pointer">
            Profile
          </button>
          <button className="py-4 hover:bg-neutral-800 cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>
      {/* -------- */}
      {/*  */}
      {openZoom ? (
        <ZoomPic
          src={currentPic.src}
          desc={currentPic.desc}
          open={setOpenZoom}
        />
      ) : null}
      {/*  */}
      <ProfileInfo />
      <div className="gap-2 grid grid-cols-2">
        {copitoPics.map((pic, i) => (
          <SinglePic key={i} pic={pic} changePic={changePic} />
        ))}
      </div>
    </main>
  );
}
