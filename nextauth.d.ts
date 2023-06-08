import mongoose, { mongo } from 'mongoose';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    description: string;
    following: Array;
    followers: Array;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    description: string;
    followers: Array;
    following: Array;
  }
}
