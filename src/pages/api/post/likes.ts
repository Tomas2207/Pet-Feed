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

      res.json({ likes: addNewLike.likes });
      break;

    case 'PATCH':
      const removeLike = await Post.findById(req.body.postId);

      const id = new ObjectId(req.body.likeId);

      removeLike.likes = removeLike.likes.filter(
        (item: ObjectId) => !item.equals(id)
      );

      removeLike.save();

      res.json({ likes: removeLike.likes });
      break;
    default:
      break;
  }
}
