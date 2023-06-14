import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';
import { ObjectId } from 'mongodb';
import User from '../../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'POST':
      const userAddPost = await User.findById(req.body.userId);

      userAddPost.savedPosts.push(req.body.postId);

      userAddPost.save();
      console.log(userAddPost.savedPosts);

      res.json({ userAddPost });
      break;

    case 'PATCH':
      const userRemovePost = await User.findById(req.body.userId);

      const id = new ObjectId(req.body.postId);
      console.log('h', userRemovePost);

      userRemovePost.savedPosts = userRemovePost.savedPosts.filter(
        (item: ObjectId) => !item.equals(id)
      );

      userRemovePost.save();

      res.json({ userRemovePost });
      break;
    default:
      break;
  }
}
