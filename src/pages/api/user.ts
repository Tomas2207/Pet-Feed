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
        const fileStr = req.body.img;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          folder: 'pet-media',
        });

        console.log(req.body);

        const updatedUser = await User.updateOne({ email: req.body.email }, [
          {
            $set: {
              description: req.body.description,
              name: req.body.petName,
              image: uploadedResponse.secure_url,
            },
          },
        ]);

        res.json({
          update: {
            description: req.body.description,
            name: req.body.petName,
            image: uploadedResponse.secure_url,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      const posts = await User.find();
      res.json({ posts });
      break;
    default:
      break;
  }
}
