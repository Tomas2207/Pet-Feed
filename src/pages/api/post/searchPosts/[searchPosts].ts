import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../../utils/connectMongo';
import Post from '../../../../../models/Post';
import { ObjectId } from 'mongodb';
import User from '../../../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'GET':
      console.log(req.query);
      const searchParameter = req.query.searchPosts;

      const users = JSON.parse(
        JSON.stringify(
          await User.find({
            name: { $regex: searchParameter, $options: 'i' },
          })
        )
      );

      const posts = JSON.parse(
        JSON.stringify(
          await Post.find({
            description: { $regex: searchParameter, $options: 'i' },
          })
            .populate({ path: 'userId', model: 'users' })
            .populate({ path: 'comments.author', model: 'users' })
            .populate({ path: 'likes', model: 'users' })
        )
      ).reverse();
      res.json({
        results: {
          users: users,
          posts: posts,
        },
      });
      break;
    default:
      break;
  }
}
