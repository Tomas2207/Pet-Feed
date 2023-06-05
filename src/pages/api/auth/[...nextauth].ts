import clientPromise from '../../../../lib/mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          description: '',
          //   stays: [],
          //   lists: [{ name: 'My Stays' }],
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: '',
          email: profile.email,
          image: '',
          description: '',
          //   stays: [],
          //   lists: [{ name: 'My Stays' }],
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, trigger, session, user }) {
      if (trigger === 'update') {
        console.log('y', session.user);
        token.id = session.user.id;
        token.name = session.user.name;
        token.picture = session.user.image;
        token.description = session.user.description;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        console.log('sesh', token.id);
        session.user.description = token.description;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
