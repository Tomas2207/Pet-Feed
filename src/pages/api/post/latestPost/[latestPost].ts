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
      console.log(req.query);
      const id = new ObjectId(req.query.latestPost as string);

      let lastPost = await Post.findOne({ userId: id })
        .sort({ $natural: -1 })
        .populate({ path: 'userId', model: 'User' })
        .populate({ path: 'likes', model: 'User' });

      res.json({ lastPost });
      break;
    default:
      break;
  }
}
