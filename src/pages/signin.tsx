import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import SideBanner from '@/components/Form/SideBanner';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

const Signin = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="flex shadow-xl shadow-black relative items-center min-h-screen bg-neutral-200 h-screen">
      <div className="w-screen absolute h-2 top-0 bg-teal-600 z-[99]" />
      <div className="h-60 w-screen absolute top-0 bg-gradient-to-t from-transparent via-teal-500 to-teal-600 lg:hidden" />
      <SideBanner />
      <div className="flex flex-col items-center mx-auto">
        <h2 className="text-4xl text-neutral-700 font-bold self-start">
          Welcome!
        </h2>
        <h2 className="text-lg mb-10 text-neutral-700 self-start">Sign In</h2>
        <div className="flex flex-col gap-4">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className="border border-neutral-300 p-2 rounded-md flex items-center gap-3 text-xl hover:bg-neutral-300 w-80 justify-center"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
                {provider.name === 'GitHub' ? (
                  <AiFillGithub className="text-4xl text-neutral-800" />
                ) : (
                  <FcGoogle className="text-4xl" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
    },
  };
}
