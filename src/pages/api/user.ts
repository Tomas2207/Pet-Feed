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
        let uploadedResponse;

        const user = await User.findOne({ email: req.body.email });

        if (req.body.img) {
          const fileStr = req.body.img;
          uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'pet-media',
          });

          if (user.image_public_id) {
            cloudinary.uploader.destroy(user.image_public_id);
          }

          await User.updateOne({ email: req.body.email }, [
            {
              $set: {
                description: req.body.description,
                name: req.body.petName,
                image: uploadedResponse.secure_url,
                image_public_id: uploadedResponse.public_id,
              },
            },
          ]);
        }

        await User.updateOne({ email: req.body.email }, [
          {
            $set: {
              description: req.body.description,
              name: req.body.petName,
            },
          },
        ]);

        const updatedUser = await User.findOne({ email: req.body.email });

        res.json({
          updatedUser,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      const currentUser = await User.findOne({ email: req.query.id });
      res.json({ currentUser });
      break;
    default:
      break;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
