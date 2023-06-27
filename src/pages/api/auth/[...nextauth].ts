import clientPromise from '../../../../lib/mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';
import User from '../../../../models/User';
import connectMongo from '../../../../utils/connectMongo';
const bcrypt = require('bcrypt');

export const authOptions: NextAuthOptions = {
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
          following: [],
          followers: [],
          savedPosts: [],
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
          savedPosts: [],
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, trigger, session, user }) {
      if (trigger === 'update') {
        token.id = session.user.id;
        token.name = session.user.name;
        token.picture = session.user.image;
        token.description = session.user.description;
        token.followers = session.user.followers;
        token.following = session.user.following;
        token.savedPosts = session.user.savedPosts;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.description = token.description;
        session.user.id = token.id;
        session.user.followers = token.followers;
        session.user.following = token.following;
        session.user.savedPosts = token.savedPosts;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
