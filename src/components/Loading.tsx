import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

const Loading = () => {
  return (
    <main className="flex flex-col shadow-xl shadow-black relative min-h-screen bg-neutral-200 pb-20">
      <Navbar />
      <div
        className="md:mx-2 flex
        flex-col lg:flex-row my-12 justify-center items-center lg:items-start gap-4"
      >
        <div className="h-80 w-full md:w-[35rem] lg:w-[23rem] bg-neutral-400 animate-pulse rounded-md" />
        <div className="h-[40rem] md:w-[35rem] w-full bg-neutral-400 animate-pulse rounded-md" />
        <div className="h-80 w-[23rem] bg-neutral-400 animate-pulse rounded-md hidden lg:block" />
      </div>
    </main>
  );
};

export default Loading;
