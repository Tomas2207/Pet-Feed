import { ObjectId } from 'mongodb';

type Author = {
  _id: ObjectId;
  name: string;
  image: string;
};

type Comment = {
  author: Author;
  content: string;
  createdAt: Date;
};

type Post = {
  _id: ObjectId;
  userId: Author;
  img: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Author[];
  comments: Comment[];
};

export type { Author, Post, Comment };
