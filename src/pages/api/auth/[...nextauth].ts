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
          following: 0,
          followers: 0,
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
          following: [],
          followers: [],
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
        token.followers = session.user.followers;
        token.following = session.user.following;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        console.log('sesh', token);
        session.user.description = token.description;
        session.user.id = token.id;
        session.user.followers = token.followers;
        session.user.following = token.following;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
