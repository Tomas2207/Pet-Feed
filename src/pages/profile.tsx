import copitoPics from '../../utils/copitoPics.json';
import ZoomPic from '../components/ZoomPic';
import { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import SinglePic from '@/components/SinglePic';
import Navbar from '@/components/Navbar';

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
    <main className="mx-[12rem] flex flex-col items-center shadow-xl shadow-black relative bg-white min-h-screen">
      <Navbar />
      {openZoom ? (
        <ZoomPic
          src={currentPic.src}
          desc={currentPic.desc}
          open={setOpenZoom}
        />
      ) : null}
      <ProfileInfo />
      <div className="w-[40rem] h-[2px] bg-gray-500 bg-opacity-20 mb-12" />
      <div className="gap-2 grid grid-cols-2">
        {copitoPics.map((pic, i) => (
          <SinglePic key={i} pic={pic} changePic={changePic} />
        ))}
      </div>
    </main>
  );
}
