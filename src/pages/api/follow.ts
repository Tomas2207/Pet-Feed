import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'POST':
      try {
        const addNewFollower = await User.findById(req.body.otherId);

        const addNewFollowing = await User.findById(req.body.hostId);

        addNewFollower.followers.push(req.body.hostId);
        addNewFollowing.following.push(req.body.otherId);

        addNewFollower.save();
        addNewFollowing.save();

        res.json({
          addNewFollower,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'PATCH':
      const removeFollower = await User.findById(req.body.otherId);
      const removeFollowing = await User.findById(req.body.hostId);

      removeFollower.followers = removeFollower.followers.filter(
        (item: ObjectId) => !item.equals(req.body.hostId)
      );
      removeFollowing.following = removeFollowing.following.filter(
        (item: ObjectId) => !item.equals(req.body.otherId)
      );

      removeFollower.save();
      removeFollowing.save();

      res.json({ removeFollower });
      break;
    default:
      break;
  }
}
