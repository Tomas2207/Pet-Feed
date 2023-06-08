import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'PATCH':
      try {
        const addNewFollower = await User.findById(req.body.otherId);

        const addNewFollowing = await User.findById(req.body.hostId);

        addNewFollower.followers.push(req.body.hostId);
        addNewFollowing.following.push(req.body.otherId);

        addNewFollower.save();
        addNewFollowing.save();

        console.log(addNewFollower);

        res.json({
          addNewFollowing,
          addNewFollower,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      break;
    default:
      break;
  }
}
