import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../../utils/cloudinary';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'GET':
      const posts = await Post.find({});
      res.json({ posts });
      break;
    default:
      break;
  }
}
