import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'POST':
      const addNewLike = await Post.findById(req.body.postId);

      console.log(addNewLike);

      addNewLike.likes.push(req.body.likeId);

      addNewLike.save();

      res.json({ addNewLike });
      break;

    case 'PATCH':
      const removeLike = await Post.findById(req.body.postId);

      const id = new ObjectId(req.body.likeId);
      console.log('before', removeLike.likes[0]);
      console.log(id);
      console.log(removeLike.likes[0].equals(id));

      removeLike.likes = removeLike.likes.filter(
        (item: ObjectId) => !item.equals(id)
      );

      console.log('after', removeLike.likes);

      removeLike.save();

      res.json({ removeLike });
      break;
    default:
      break;
  }
}
