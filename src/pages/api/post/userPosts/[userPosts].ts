import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../../utils/connectMongo';
import Post from '../../../../../models/Post';
import User from '../../../../../models/User';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'GET':
      const id = new ObjectId(req.query.userPosts as string);

      let userPosts = await Post.find({ userId: id })
        .populate({ path: 'userId', model: User })
        .populate({ path: 'comments.author', model: User })
        .populate({ path: 'likes', model: User });

      res.json({ userPosts });
      break;
    default:
      break;
  }
}
